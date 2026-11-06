import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import { workouts } from '../data/workouts';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'FitLog' }} />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Workouts</Text>
        <Text style={styles.count}>{workouts.length} workouts</Text>
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EEF5F7' },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 28, fontWeight: '700', color: '#152D40' },
  count: { color: '#526473' },
});