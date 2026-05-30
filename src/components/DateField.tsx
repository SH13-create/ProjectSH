/**
 * Sélecteur de date personnalisé et multi-plateforme (web + mobile) :
 * un champ qui ouvre une fenêtre avec trois colonnes (jour / mois / année).
 * On évite ainsi une dépendance native et ça marche pareil partout.
 */
import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { radius, softShadow, spacing } from '@/theme';
import { useLocale } from '@/context/LocaleContext';
import { AppText } from './AppText';
import { Button } from './Button';

type Props = {
  value?: string; // ISO
  onChange: (iso: string) => void;
};

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

const CURRENT_YEAR = new Date().getFullYear();
const DAYS = range(1, 31);
const MONTHS = range(1, 12);
const YEARS = range(1950, CURRENT_YEAR - 5).reverse();

function Column({
  data,
  selected,
  onSelect,
}: {
  data: number[];
  selected: number;
  onSelect: (n: number) => void;
}) {
  const { colors } = useTheme();
  return (
    <FlatList
      data={data}
      keyExtractor={(n) => String(n)}
      style={styles.column}
      showsVerticalScrollIndicator={false}
      initialNumToRender={20}
      renderItem={({ item }) => {
        const active = item === selected;
        return (
          <Pressable
            onPress={() => onSelect(item)}
            style={[styles.cell, active && { backgroundColor: colors.primary }]}
          >
            <AppText
              center
              weight={active ? '800' : '500'}
              color={active ? colors.primaryText : colors.text}
            >
              {item}
            </AppText>
          </Pressable>
        );
      }}
    />
  );
}

export function DateField({ value, onChange }: Props) {
  const { colors } = useTheme();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  const initial = value ? new Date(value) : new Date(2000, 0, 1);
  const [d, setD] = useState(initial.getDate());
  const [m, setM] = useState(initial.getMonth() + 1);
  const [y, setY] = useState(initial.getFullYear());

  const label = useMemo(() => {
    if (!value) return t.quiz.pickDate;
    const dt = new Date(value);
    return `${dt.getDate()} / ${dt.getMonth() + 1} / ${dt.getFullYear()}`;
  }, [value, t]);

  const confirm = () => {
    // On borne le jour pour éviter une date invalide (ex. 31 février).
    const maxDay = new Date(y, m, 0).getDate();
    const day = Math.min(d, maxDay);
    onChange(new Date(y, m - 1, day).toISOString());
    setOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[styles.field, { backgroundColor: colors.surface, borderColor: colors.border }, softShadow(colors.shadow)]}
      >
        <AppText variant="subtitle" color={value ? colors.text : colors.textMuted}>
          📅  {label}
        </AppText>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            style={[styles.sheet, { backgroundColor: colors.surface }]}
            onPress={(e) => e.stopPropagation()}
          >
            <AppText variant="subtitle" center weight="800" style={{ marginBottom: spacing.md }}>
              {t.quiz.pickDate}
            </AppText>
            <View style={styles.columns}>
              <Column data={DAYS} selected={d} onSelect={setD} />
              <Column data={MONTHS} selected={m} onSelect={setM} />
              <Column data={YEARS} selected={y} onSelect={setY} />
            </View>
            <Button label={t.common.next} onPress={confirm} style={{ marginTop: spacing.md }} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: 64,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  columns: {
    flexDirection: 'row',
    gap: spacing.sm,
    height: 220,
  },
  column: { flex: 1 },
  cell: {
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    marginVertical: 2,
  },
});
