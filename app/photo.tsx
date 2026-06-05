/**
 * 📸 Écran « Analyse par photo » : on importe 2 photos + 2 prénoms, puis
 * Moulat Niya génère un rapport ludique (écran /photoReport).
 *
 * ⚠️ Les photos restent EN LOCAL (jamais envoyées). On ne fait aucune
 * reconnaissance faciale : le rapport est un divertissement déterministe.
 */
import React, { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Screen } from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SeerAvatar } from '@/components/SeerAvatar';
import { useLocale } from '@/context/LocaleContext';
import { useTheme } from '@/context/ThemeContext';
import { usePhoto } from '@/context/PhotoContext';
import { radius, softShadow, spacing } from '@/theme';
import type { PhotoInput } from '@/utils/photoReport';

export default function PhotoScreen() {
  const { t, isRTL } = useLocale();
  const { colors } = useTheme();
  const { setData } = usePhoto();
  const router = useRouter();

  const [p1, setP1] = useState<PhotoInput | null>(null);
  const [p2, setP2] = useState<PhotoInput | null>(null);
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
  const [err, setErr] = useState('');

  const pick = async (which: 1 | 2, source: 'library' | 'camera') => {
    // Demande la permission adaptée (galerie ou caméra) sur mobile.
    if (Platform.OS !== 'web') {
      const perm =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        setErr(t.photo.permission);
        return;
      }
    }
    const opts: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    };
    const res =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync(opts)
        : await ImagePicker.launchImageLibraryAsync(opts);
    if (res.canceled || !res.assets?.[0]) return;
    const a = res.assets[0];
    const photo: PhotoInput = { uri: a.uri, width: a.width, height: a.height, fileSize: a.fileSize };
    setErr('');
    if (which === 1) setP1(photo);
    else setP2(photo);
  };

  const analyze = () => {
    if (!p1 || !p2) {
      setErr(t.photo.needTwo);
      return;
    }
    setData({ photo1: p1, photo2: p2, name1: n1, name2: n2 });
    router.push('/photoReport');
  };

  return (
    <Screen scroll>
      <View style={{ alignItems: 'center', gap: spacing.xs }}>
        <SeerAvatar size={96} />
        <AppText variant="title" weight="800" center color={colors.primary}>
          {t.photo.title}
        </AppText>
        <AppText variant="body" center color={colors.textMuted}>
          {t.photo.modeDesc}
        </AppText>
      </View>

      <Animated.View entering={FadeInDown.duration(400)} style={styles.row}>
        <PhotoSlot
          uri={p1?.uri}
          label={t.photo.pick1}
          cameraLabel={t.photo.takePhoto}
          onPick={() => pick(1, 'library')}
          onCamera={() => pick(1, 'camera')}
        />
        <PhotoSlot
          uri={p2?.uri}
          label={t.photo.pick2}
          cameraLabel={t.photo.takePhoto}
          onPick={() => pick(2, 'library')}
          onCamera={() => pick(2, 'camera')}
        />
      </Animated.View>

      <Card style={{ gap: spacing.sm }}>
        <Field value={n1} onChange={setN1} placeholder={t.photo.name1Ph} rtl={isRTL} colors={colors} />
        <Field value={n2} onChange={setN2} placeholder={t.photo.name2Ph} rtl={isRTL} colors={colors} />
      </Card>

      {err ? (
        <AppText variant="caption" center color={colors.primary}>
          ⚠️ {err}
        </AppText>
      ) : null}

      <Button label={t.photo.analyze} onPress={analyze} disabled={!p1 || !p2} />
      <Button label={t.common.back} variant="ghost" emoji="🏠" onPress={() => router.back()} />
    </Screen>
  );
}

function PhotoSlot({
  uri,
  label,
  cameraLabel,
  onPick,
  onCamera,
}: {
  uri?: string;
  label: string;
  cameraLabel: string;
  onPick: () => void;
  onCamera: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, gap: spacing.xs }}>
      <Pressable
        onPress={onPick}
        style={[
          styles.slot,
          { backgroundColor: colors.surface, borderColor: uri ? colors.primary : colors.border },
          softShadow(colors.shadow),
        ]}
      >
        {uri ? (
          <Image source={{ uri }} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <AppText style={{ fontSize: 40 }}>🖼️</AppText>
            <AppText variant="caption" center color={colors.textMuted}>
              {label}
            </AppText>
          </View>
        )}
      </Pressable>
      {/* Option caméra/selfie (cachée sur le web où la galerie suffit). */}
      {Platform.OS !== 'web' && (
        <Pressable onPress={onCamera} style={[styles.camBtn, { borderColor: colors.border }]}>
          <AppText variant="caption" center weight="700" color={colors.secondary}>
            📸 {cameraLabel}
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

function Field({
  value,
  onChange,
  placeholder,
  rtl,
  colors,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  rtl: boolean;
  colors: ReturnType<typeof useTheme>['colors'];
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      maxLength={20}
      style={[
        styles.input,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          color: colors.text,
          textAlign: rtl ? 'right' : 'left',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, justifyContent: 'center' },
  slot: {
    aspectRatio: 1,
    borderRadius: radius.lg,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camBtn: {
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  img: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center', gap: spacing.xs, padding: spacing.sm },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.md,
    fontSize: 17,
    fontWeight: '600',
  },
});
