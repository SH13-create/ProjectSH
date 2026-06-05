/**
 * 📸🔮 Rapport « Analyse par photo » de Moulat Niya (fictif & divertissant).
 * Présente : analyse visuelle, scores (amour/amitié/mariage), histoire,
 * famille future + apparence des enfants + prompts d'images, et destin.
 */
import React, { useMemo, useRef } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Gauge } from '@/components/Gauge';
import { Confetti } from '@/components/Confetti';
import { SeerAvatar } from '@/components/SeerAvatar';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { usePhoto } from '@/context/PhotoContext';
import { radius, spacing } from '@/theme';
import { buildPhotoReport, type ChildPrediction } from '@/utils/photoReport';
import { shareResult } from '@/utils/share';

export default function PhotoReportScreen() {
  const { t } = useLocale();
  const { colors } = useTheme();
  const { data, clear } = usePhoto();
  const router = useRouter();
  const shotRef = useRef<View>(null);

  // Si on arrive ici sans données (rechargement web), on renvoie à l'écran photo.
  if (!data) {
    return (
      <Screen center>
        <AppText variant="subtitle" center>
          {t.photo.needTwo}
        </AppText>
        <Button label={t.photo.title} onPress={() => router.replace('/photo')} />
      </Screen>
    );
  }

  const report = useMemo(
    () => buildPhotoReport(data.photo1, data.photo2, data.name1, data.name2, t),
    [t],
  );

  const onShare = () => {
    const txt = `${t.photo.title} — ${t.photo.loveLabel}: ${report.love}% 💞 | ${t.photo.marriageLabel}: ${report.marriage}% 💍\n${report.verdict}\n— ${t.common.appName}`;
    shareResult(shotRef, txt);
  };

  const onRestart = () => {
    clear();
    router.replace('/photo');
  };

  const elementLabel = t.elements[report.element];

  return (
    <>
      <Screen scroll>
        <View ref={shotRef} collapsable={false} style={{ backgroundColor: colors.background, borderRadius: radius.lg, gap: spacing.md }}>
          {/* En-tête : 2 photos + parole de la voyante */}
          <View style={styles.photos}>
            <PhotoThumb uri={data.photo1.uri} name={data.name1 || t.photo.defaultName1} />
            <AppText style={styles.heart}>💞</AppText>
            <PhotoThumb uri={data.photo2.uri} name={data.name2 || t.photo.defaultName2} />
          </View>

          <Card alt style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
            <SeerAvatar size={60} />
            <AppText variant="body" weight="600" style={{ flex: 1 }}>
              {report.intro}
            </AppText>
          </Card>

          {/* 1. Analyse visuelle */}
          <Section icon="👁️" title={t.photo.visualLabel}>
            <AppText variant="body">{report.visual1}</AppText>
            <AppText variant="body" style={{ marginTop: spacing.xs }}>
              {report.visual2}
            </AppText>
            <AppText variant="body" style={{ marginTop: spacing.sm }} color={colors.textMuted}>
              {report.resemblance}
            </AppText>
          </Section>

          {/* 2. Scores */}
          <View style={styles.scores}>
            <ScoreGauge value={report.love} label={t.photo.loveLabel} color={colors.primary} />
            <ScoreGauge value={report.friendship} label={t.photo.friendshipLabel} color={colors.secondary} />
            <ScoreGauge value={report.marriage} label={t.photo.marriageLabel} color={colors.success} />
          </View>

          {/* 3. Histoire */}
          <Section icon="📖" title={t.photo.storyLabel}>
            <Line label={t.photo.meetingLabel} text={report.meeting} />
            <Line label={t.photo.bondLabel} text={report.bond} />
            <Line label={t.photo.challengeLabel} text={report.challenge} />
            <Line label={t.photo.futureLabel} text={report.futureDream} />
          </Section>

          {/* 4-6. Famille + apparence + prompts */}
          <Section icon="👶" title={t.photo.familyLabel}>
            <AppText variant="body" weight="700">
              {report.familyIntro}
            </AppText>
          </Section>
          {report.children.map((c, i) => (
            <ChildCard key={i} child={c} index={i + 1} />
          ))}

          {/* 💍 Mariage */}
          <Section icon="💍" title={t.photo.marriageLabel}>
            <Line label={t.photo.marriageWhenLabel} text={report.marriageWhen} />
            <Line label={t.photo.marriagePlaceLabel} text={report.marriagePlace} />
            <Line label={t.photo.marriageVibeLabel} text={report.marriageVibe} />
          </Section>

          {/* 🏡 Maison de rêve */}
          <Section icon="🏡" title={t.photo.houseLabel}>
            <AppText variant="body" weight="700">
              {report.houseType}
            </AppText>
            <AppText variant="body" color={colors.textMuted}>
              {report.housePlace} — {report.houseDetail}
            </AppText>
            <PromptBox prompt={report.houseImagePrompt} hint={t.photo.imageHint} />
          </Section>

          {/* 🐶 Animaux */}
          <Section icon="🐾" title={t.photo.petsLabel}>
            {report.pets.length === 0 ? (
              <AppText variant="body">{t.photo.noPets}</AppText>
            ) : (
              report.pets.map((p, i) => (
                <AppText key={i} variant="body" style={{ marginBottom: 2 }}>
                  {p.emoji} {p.text}
                </AppText>
              ))
            )}
          </Section>

          {/* 🌍 Frise chronologique */}
          <Section icon="🌍" title={t.photo.timelineLabel}>
            {report.timeline.map((s, i) => (
              <TimelineRow key={i} stage={s} last={i === report.timeline.length - 1} hint={t.photo.imageHint} />
            ))}
          </Section>

          {/* 📸 Album famille futur */}
          <Section icon="📸" title={t.photo.albumLabel}>
            {report.album.map((a, i) => (
              <View key={i} style={{ marginBottom: spacing.sm }}>
                <AppText variant="body" weight="700">
                  {a.emoji} {a.caption}
                </AppText>
                <PromptBox prompt={a.imagePrompt} hint={t.photo.imageHint} />
              </View>
            ))}
          </Section>

          {/* 🎬 Film de vie */}
          <Section icon="🎬" title={t.photo.movieLabel}>
            <AppText variant="subtitle" weight="800" center color={colors.primary} style={{ marginBottom: spacing.sm }}>
              {report.movieTitle}
            </AppText>
            {report.movieActs.map((a, i) => (
              <View key={i} style={{ marginBottom: spacing.sm }}>
                <AppText variant="caption" weight="800" color={colors.secondary}>
                  {a.label}
                </AppText>
                <AppText variant="body">{a.text}</AppText>
              </View>
            ))}
            <PromptBox prompt={report.moviePoster} hint={t.photo.imageHint} />
          </Section>

          {/* 7. Destin */}
          <Section icon="✨" title={t.photo.destinyLabel}>
            <DestinyRow label={t.photo.auraLabel} value={report.auraColor} swatch={report.auraHex} />
            <DestinyRow label={t.photo.luckyNumLabel} value={String(report.luckyNumber)} />
            <DestinyRow label={t.photo.luckyDateLabel} value={report.luckyDate} />
            <DestinyRow label={t.photo.elementLabel} value={elementLabel} />
            <AppText variant="body" style={{ marginTop: spacing.sm }} weight="600">
              🔮 {report.destinyReading}
            </AppText>
            <AppText variant="body" style={{ marginTop: spacing.sm }} color={colors.secondary} weight="600">
              💫 {report.romanticPrediction}
            </AppText>
            <AppText variant="body" style={{ marginTop: spacing.sm }} color={colors.textMuted}>
              {report.songLine}
            </AppText>
          </Section>

          {/* 8. Verdict */}
          <Card style={{ borderColor: colors.primary, borderWidth: 2 }}>
            <AppText variant="subtitle" weight="800" center color={colors.primary}>
              🏆 {t.photo.verdictLabel}
            </AppText>
            <AppText variant="body" center style={{ marginTop: spacing.xs }}>
              {report.verdict}
            </AppText>
          </Card>
        </View>

        {/* Actions */}
        <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
          <Button label={t.result.share} emoji="📤" onPress={onShare} />
          <Button label={t.result.restart} emoji="🔄" variant="secondary" onPress={onRestart} />
        </View>

        {/* Disclaimer */}
        <Card alt style={{ marginTop: spacing.sm }}>
          <AppText variant="caption" center color={colors.textMuted}>
            ⚠️ {t.result.disclaimer}
          </AppText>
        </Card>
      </Screen>

      {report.overall >= 80 && <Confetti />}
    </>
  );
}

// --- Petits composants -----------------------------------------------------

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      <Card>
        <AppText variant="subtitle" weight="800" color={colors.secondary}>
          {icon} {title}
        </AppText>
        <View style={{ marginTop: spacing.sm }}>{children}</View>
      </Card>
    </Animated.View>
  );
}

function Line({ label, text }: { label: string; text: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ marginBottom: spacing.sm }}>
      <AppText variant="caption" weight="800" color={colors.primary}>
        {label}
      </AppText>
      <AppText variant="body">{text}</AppText>
    </View>
  );
}

function PhotoThumb({ uri, name }: { uri: string; name: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: 'center', gap: 4, flex: 1 }}>
      <Image source={{ uri }} style={styles.thumb} resizeMode="cover" />
      <AppText variant="caption" weight="700" center>
        {name}
      </AppText>
    </View>
  );
}

function ScoreGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Gauge value={value} color={color} size={104} />
      <AppText variant="caption" weight="700" center color={colors.textMuted} style={{ marginTop: 4 }}>
        {label}
      </AppText>
    </View>
  );
}

function DestinyRow({ label, value, swatch }: { label: string; value: string; swatch?: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.destinyRow}>
      <AppText variant="body" color={colors.textMuted}>
        {label}
      </AppText>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
        {swatch ? <View style={[styles.swatch, { backgroundColor: swatch }]} /> : null}
        <AppText variant="body" weight="800">
          {value}
        </AppText>
      </View>
    </View>
  );
}

function ChildCard({ child, index }: { child: ChildPrediction; index: number }) {
  const { t } = useLocale();
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      <Card alt>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <AppText style={{ fontSize: 34 }}>{child.emoji}</AppText>
          <View style={{ flex: 1 }}>
            <AppText variant="subtitle" weight="800" color={colors.primary}>
              {index}. {child.name}
            </AppText>
            <AppText variant="caption" color={colors.textMuted}>
              {child.trait}
            </AppText>
          </View>
        </View>

        <View style={{ marginTop: spacing.sm, gap: 2 }}>
          <Mini label={t.photo.faceLabel} value={child.face} />
          <Mini label={t.photo.eyesLabel} value={child.eyes} />
          <Mini label={t.photo.hairLabel} value={child.hair} />
          <Mini label={t.photo.smileLabel} value={child.smile} />
          <Mini label={t.photo.skinLabel} value={child.skin} />
          <Mini label={t.photo.resemblesLabel} value={child.resembles} />
        </View>

        <PromptBox prompt={child.imagePrompt} hint={t.photo.imageHint} />
      </Card>
    </Animated.View>
  );
}

/** Encadré « prompt d'image » réutilisable, avec copie (mobile). */
function PromptBox({ prompt, hint }: { prompt: string; hint: string }) {
  const { colors } = useTheme();
  const copy = () => {
    Clipboard.setStringAsync(prompt).catch(() => {});
  };
  return (
    <View style={[styles.promptBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <AppText variant="caption" weight="800" color={colors.secondary}>
        {hint}
      </AppText>
      <AppText variant="caption" color={colors.textMuted} style={{ marginTop: 2 }} selectable>
        {prompt}
      </AppText>
      {Platform.OS !== 'web' && (
        <Button label="📋" variant="ghost" onPress={copy} style={{ marginTop: spacing.xs }} />
      )}
    </View>
  );
}

/** Une étape de la frise chronologique, avec puce et trait vertical. */
function TimelineRow({
  stage,
  last,
  hint,
}: {
  stage: { year: string; emoji: string; title: string; text: string; imagePrompt: string };
  last: boolean;
  hint: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      {/* Colonne puce + ligne */}
      <View style={{ alignItems: 'center', width: 30 }}>
        <View style={[styles.dot, { backgroundColor: colors.primary }]}>
          <AppText style={{ fontSize: 14 }}>{stage.emoji}</AppText>
        </View>
        {!last && <View style={[styles.tline, { backgroundColor: colors.border }]} />}
      </View>
      {/* Contenu */}
      <View style={{ flex: 1, paddingBottom: spacing.md }}>
        <AppText variant="caption" weight="800" color={colors.primary}>
          {stage.year} · {stage.title}
        </AppText>
        <AppText variant="body" style={{ marginTop: 2 }}>
          {stage.text}
        </AppText>
        <PromptBox prompt={stage.imagePrompt} hint={hint} />
      </View>
    </View>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap' }}>
      <AppText variant="caption" weight="800" color={colors.primary}>
        {label}:
      </AppText>
      <AppText variant="caption">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  photos: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  thumb: { width: '100%', aspectRatio: 1, borderRadius: radius.md },
  heart: { fontSize: 28 },
  scores: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.xs },
  destinyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  swatch: { width: 18, height: 18, borderRadius: 9 },
  promptBox: { marginTop: spacing.sm, padding: spacing.sm, borderRadius: radius.sm, borderWidth: 1 },
  dot: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  tline: { width: 2, flex: 1, marginTop: 2 },
});
