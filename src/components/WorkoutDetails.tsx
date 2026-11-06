import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import type { Workout } from '../types';

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image source={{ uri: workout.photoUrl }} style={styles.photo} />
      <Text style={styles.title}>{workout.title}</Text>
      <Text style={styles.text}>Category: {workout.category}</Text>
      <Text style={styles.text}>Date: {workout.date}</Text>
      <Text style={styles.text}>Duration: {workout.durationMinutes} min</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EEF5F7' },
  content: { padding: 16, gap: 12 },
  photo: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    backgroundColor: '#D8E8EB',
  },
  title: { fontSize: 28, fontWeight: '700', color: '#152D40' },
  text: { fontSize: 16, color: '#152D40' },
});