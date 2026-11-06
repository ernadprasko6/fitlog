import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Workout } from '../types';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Pressable
      onPress={() => console.log('Open workout:', workout.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: workout.photoUrl }} style={styles.photo} />
      <View style={styles.content}>
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.details}>
          {workout.category} · {workout.date} · {workout.durationMinutes} min
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden' },
  pressed: { opacity: 0.65 },
  photo: { width: '100%', height: 130, backgroundColor: '#D8E8EB' },
  content: { padding: 14 },
  title: { fontSize: 18, fontWeight: '700', color: '#152D40' },
  details: { marginTop: 4, color: '#526473' },
});