import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WorkoutCard from '../components/WorkoutCard';
import { FontSize, Radius, Spacing } from '../constants/theme';
import { workouts } from '../data/workouts';
import { useTheme } from '../hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [gridWidth, setGridWidth] = useState(0);

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor((gridWidth - (columns - 1) * Spacing.md) / columns);
  const totalMinutes = workouts.reduce((total, workout) => total + workout.durationMinutes, 0);

  const summary = [
    { label: 'Workouts', value: workouts.length },
    { label: 'Total minutes', value: totalMinutes },
  ];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingLeft: Spacing.md + insets.left,
          paddingRight: Spacing.md + insets.right,
          paddingBottom: Spacing.md + insets.bottom,
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>My Workouts</Text>

      <View style={styles.summary}>
        {summary.map(({ label, value }) => (
          <View
            key={label}
            style={[styles.box, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Text style={[styles.number, { color: theme.primary }]}>{value}</Text>
            <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.grid} onLayout={(event) => setGridWidth(event.nativeEvent.layout.width)}>
        {cardWidth > 0 &&
          workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} style={{ width: cardWidth }} />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingTop: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.hero, fontWeight: '700' },
  summary: { flexDirection: 'row', gap: Spacing.sm },
  box: {
    flex: 1,
    minWidth: 0,
    padding: Spacing.md,
    gap: Spacing.xs,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  number: { fontSize: FontSize.hero, fontWeight: '700', textAlign: 'center' },
  label: { fontSize: FontSize.small, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
});