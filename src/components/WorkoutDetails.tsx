import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontSize, Radius, Spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';
import type { Workout } from '../types';

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const fields = [
    { label: 'Category', value: workout.category },
    { label: 'Date', value: workout.date },
    { label: 'Duration', value: `${workout.durationMinutes} min` },
  ];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.outer, { paddingBottom: Spacing.md + insets.bottom }]}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: workout.photoUrl }}
          style={[styles.photo, { backgroundColor: theme.border }]}
        />
        <Text style={[styles.title, { color: theme.text }]}>{workout.title}</Text>

        {fields.map(({ label, value }) => (
          <View key={label} style={[styles.row, { borderBottomColor: theme.border }]}>
            <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
            <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  outer: { padding: Spacing.md },
  content: { width: '100%', maxWidth: 600, alignSelf: 'center', gap: Spacing.md },
  photo: { width: '100%', aspectRatio: 16 / 9, borderRadius: Radius.md },
  title: { fontSize: FontSize.hero, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  label: { flexShrink: 1, fontSize: FontSize.body },
  value: { flexShrink: 1, fontSize: FontSize.body, textAlign: 'right' },
});