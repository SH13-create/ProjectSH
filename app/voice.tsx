/**
 * 🎙️ Mode « Parler avec Moulat Niya » — conversation vocale + écrite.
 *
 * L'utilisateur pose une question (par la VOIX sur le web, ou en l'ÉCRIVANT),
 * et Moulat Niya répond par un texte élégant + une voix chaleureuse (TTS), avec
 * une animation d'onde quand elle « parle ». Tout est local & fictif.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ZelligeBackground } from '@/components/ZelligeBackground';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { LiveSeer } from '@/components/LiveSeer';
import { SpeakingWave } from '@/components/SpeakingWave';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { LOCALES } from '@/locales';
import { radius, softShadow, spacing } from '@/theme';
import { askOracle } from '@/utils/oracle';
import { isListeningSupported, listen, speak, stopSpeaking, unlockAudio, warmUpVoices } from '@/utils/speech';

// La voix lit TOUJOURS la darija en lettres arabes (peu importe l'affichage).
const AR = LOCALES.ar;

type Msg = { id: string; from: 'user' | 'seer'; text: string };

export default function VoiceScreen() {
  const { t, isRTL } = useLocale();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const v = t.voice;

  const [messages, setMessages] = useState<Msg[]>([{ id: 'g', from: 'seer', text: v.greeting }]);
  const [typing, setTyping] = useState(false); // saisie écrite affichée
  const [draft, setDraft] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [seerThinking, setSeerThinking] = useState(false);
  // On garde la version ARABE du dernier message (pour le bouton « réécouter »).
  const [lastSeerAr, setLastSeerAr] = useState(AR.voice.greeting);

  const scrollRef = useRef<ScrollView>(null);
  const listenHandle = useRef<ReturnType<typeof listen>>(null);
  const micSupported = isListeningSupported();
  // Sur le web, la voix d'accueil ne peut démarrer qu'APRÈS un geste utilisateur
  // (politique autoplay). On affiche alors un petit bouton « ابدأ » pour l'amorcer.
  const [needTapToStart, setNeedTapToStart] = useState(Platform.OS === 'web');

  // Au démarrage : on précharge les voix. Sur mobile, on parle tout de suite ;
  // sur le web on attend le 1er tap (greetNow).
  useEffect(() => {
    warmUpVoices();
    if (Platform.OS !== 'web') {
      sayAsSeer(v.greeting, AR.voice.greeting, false);
    }
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Débloque l'audio (1er geste) puis fait dire le message d'accueil. */
  function greetNow() {
    unlockAudio();
    setNeedTapToStart(false);
    sayAsSeer(v.greeting, AR.voice.greeting, false);
  }

  const scrollDown = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);

  /**
   * Ajoute un message de la voyante (affiché dans l'écriture choisie) et le fait
   * parler EN ARABE (darija). `displayText` = ce qu'on montre, `arText` = ce
   * qu'on prononce (toujours en lettres arabes).
   */
  function sayAsSeer(displayText: string, arText: string, push = true) {
    if (push) setMessages((m) => [...m, { id: String(Date.now()) + 's', from: 'seer', text: displayText }]);
    setLastSeerAr(arText);
    scrollDown();

    let gotAudio = false;
    speak(arText, {
      onStart: () => {
        gotAudio = true;
        setSpeaking(true);
      },
      onDone: () => setSpeaking(false),
    });

    // Repli « bouche qui bouge » si aucune voix audio ne démarre (ex. pas de
    // voix arabe installée) : on anime quand même la mascotte le temps d'une
    // lecture estimée d'après la longueur du texte, pour garder l'illusion.
    setTimeout(() => {
      if (gotAudio) return;
      setSpeaking(true);
      const durationMs = Math.min(9000, Math.max(2200, arText.length * 80));
      setTimeout(() => setSpeaking(false), durationMs);
    }, 350);
  }

  /** Traite une question (texte ou voix) et déclenche la réponse. */
  function submitQuestion(q: string) {
    const question = q.trim();
    if (!question) return;
    unlockAudio(); // 1er geste éventuel → autorise la voix sur le web
    setNeedTapToStart(false);
    stopSpeaking();
    setMessages((m) => [...m, { id: String(Date.now()) + 'u', from: 'user', text: question }]);
    setDraft('');
    scrollDown();
    // Petit suspense « كانقلب فالنجوم... » avant la réponse.
    setTyping(false);
    setSeerThinking(true);
    setTimeout(() => {
      setSeerThinking(false);
      // Réponse affichée dans l'écriture choisie, et version arabe pour la voix.
      const display = askOracle(question, t).text;
      const arabic = askOracle(question, AR).text;
      sayAsSeer(display, arabic);
    }, 1400);
  }

  // --- Micro (web) ---
  function toggleMic() {
    unlockAudio(); // geste utilisateur → autorise la voix sur le web
    setNeedTapToStart(false);
    if (listening) {
      listenHandle.current?.stop();
      setListening(false);
      return;
    }
    if (!micSupported) return;
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    stopSpeaking();
    let finalText = '';
    setListening(true);
    listenHandle.current = listen(
      (text, isFinal) => {
        finalText = text;
        setDraft(text); // aperçu en direct de ce qui est entendu
        if (isFinal) {
          setListening(false);
          submitQuestion(text);
        }
      },
      {
        onEnd: () => {
          setListening(false);
          if (finalText.trim()) submitQuestion(finalText);
        },
        onError: () => setListening(false),
      },
    );
    if (!listenHandle.current) setListening(false);
  }

  const statusText = listening ? v.listening : seerThinking ? v.thinking : speaking ? v.speaking : '';

  return (
    <ZelligeBackground>
      <View style={{ flex: 1, paddingTop: insets.top + spacing.sm }}>
        {/* En-tête : avatar + onde quand elle parle */}
        <View style={styles.header}>
          <LiveSeer size={104} speaking={speaking} />
          <AppText variant="subtitle" weight="800" color={colors.primary} style={{ marginTop: spacing.xs }}>
            {t.common.seerName}
          </AppText>
          <View style={{ height: 30, justifyContent: 'center' }}>
            {speaking || listening ? (
              <SpeakingWave active color={listening ? colors.secondary : colors.primary} />
            ) : statusText ? (
              <AppText variant="caption" color={colors.textMuted}>
                {statusText}
              </AppText>
            ) : null}
          </View>
        </View>

        {/* Conversation */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: spacing.lg, gap: spacing.sm }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} isRTL={isRTL} />
          ))}
          {seerThinking ? (
            <Animated.View entering={FadeIn}>
              <Bubble msg={{ id: 'tk', from: 'seer', text: '…' }} isRTL={isRTL} />
            </Animated.View>
          ) : null}

          {/* Questions suggérées (au tout début, pour amorcer la conversation) */}
          {messages.length <= 1 && !seerThinking ? (
            <Animated.View entering={FadeIn.delay(300)} style={styles.suggestions}>
              {v.suggestions.map((s, i) => (
                <Pressable
                  key={i}
                  onPress={() => submitQuestion(s)}
                  style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.border }]}
                >
                  <AppText variant="caption" weight="600" color={colors.secondary}>
                    {s}
                  </AppText>
                </Pressable>
              ))}
            </Animated.View>
          ) : null}
        </ScrollView>

        {/* Web : 1er tap requis pour autoriser la voix (politique autoplay) */}
        {needTapToStart ? (
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xs }}>
            <Button label={v.tapToStart} emoji="🔊" onPress={greetNow} />
          </View>
        ) : null}

        {/* Barre d'action */}
        <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.md, borderTopColor: colors.border }]}>
          {typing ? (
            <View style={styles.inputRow}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder={v.placeholder}
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.input,
                  { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text, textAlign: isRTL ? 'right' : 'left' },
                ]}
                onSubmitEditing={() => submitQuestion(draft)}
                returnKeyType="send"
              />
              <Pressable onPress={() => submitQuestion(draft)} style={[styles.send, { backgroundColor: colors.primary }]}>
                <AppText weight="800" color={colors.primaryText}>➤</AppText>
              </Pressable>
            </View>
          ) : (
            <>
              {/* Gros bouton micro/parole */}
              <Pressable
                onPress={micSupported ? toggleMic : () => setTyping(true)}
                style={[
                  styles.micBtn,
                  { backgroundColor: listening ? colors.secondary : colors.primary },
                  softShadow(colors.shadow),
                ]}
              >
                <AppText style={{ fontSize: 28 }}>{listening ? '⏹️' : '🎙️'}</AppText>
                <AppText variant="subtitle" weight="800" color={colors.primaryText}>
                  {listening ? v.stop : micSupported ? v.askVoice : v.talk}
                </AppText>
              </Pressable>
              {!micSupported ? (
                <AppText variant="caption" center color={colors.textMuted} style={{ marginTop: spacing.xs }}>
                  {v.notSupported}
                </AppText>
              ) : (
                <AppText variant="caption" center color={colors.textMuted} style={{ marginTop: spacing.xs }}>
                  {v.tapToSpeak}
                </AppText>
              )}
            </>
          )}

          {/* Liens secondaires : basculer écrit/vocal + réécouter + retour */}
          <View style={styles.linksRow}>
            <Pressable onPress={() => setTyping((x) => !x)}>
              <AppText variant="caption" weight="700" color={colors.secondary}>
                {typing ? `🎙️ ${v.askVoice}` : `⌨️ ${v.typeInstead}`}
              </AppText>
            </Pressable>
            <Pressable
              onPress={() => speak(lastSeerAr, { onStart: () => setSpeaking(true), onDone: () => setSpeaking(false) })}
            >
              <AppText variant="caption" weight="700" color={colors.secondary}>
                🔁 {v.replay}
              </AppText>
            </Pressable>
            <Pressable onPress={() => { stopSpeaking(); router.back(); }}>
              <AppText variant="caption" weight="700" color={colors.textMuted}>
                🏠 {t.common.back}
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </ZelligeBackground>
  );
}

function Bubble({ msg, isRTL }: { msg: Msg; isRTL: boolean }) {
  const { colors } = useTheme();
  const seer = msg.from === 'seer';
  // La voyante à l'opposé de l'utilisateur selon le sens de lecture.
  const alignEnd = seer ? false : true;
  return (
    <Animated.View
      entering={FadeInUp.duration(250)}
      style={{ alignSelf: alignEnd ? (isRTL ? 'flex-start' : 'flex-end') : isRTL ? 'flex-end' : 'flex-start', maxWidth: '85%' }}
    >
      <Card alt={seer} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md, backgroundColor: seer ? undefined : colors.primary }}>
        <AppText variant="body" color={seer ? colors.text : colors.primaryText}>
          {seer ? `🔮 ${msg.text}` : msg.text}
        </AppText>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center' },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm, justifyContent: 'center' },
  chip: { borderWidth: 1, borderRadius: radius.pill, paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  actions: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1 },
  micBtn: {
    minHeight: 64,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  inputRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  input: { flex: 1, minHeight: 56, borderRadius: radius.md, borderWidth: 1.5, paddingHorizontal: spacing.md, fontSize: 17 },
  send: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md, flexWrap: 'wrap', gap: spacing.sm },
});
