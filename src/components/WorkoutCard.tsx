import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { FontSize, Radius, Spacing } from '../constants/theme';
import { useTheme } from '../hooks/use-theme';
import type { Workout } from '../types';

type Props = {
  workout: Workout;
  style?: StyleProp<ViewStyle>;
};

export default function WorkoutCard({ workout, style }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => console.log('Open workout:', workout.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View>
        <Image
          source={{ uri: workout.photoUrl }}
          style={[styles.photo, { backgroundColor: theme.border }]}
        />
        <Text style={[styles.badge, { backgroundColor: theme.primary, color: theme.onPrimary }]}>
          {workout.category}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{workout.title}</Text>
        <Text style={[styles.details, { color: theme.muted }]}>
          {workout.date} · {workout.durationMinutes} min
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: Radius.md, overflow: 'hidden' },
  pressed: { opacity: 0.65 },
  photo: { width: '100%', aspectRatio: 16 / 9 },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    fontSize: FontSize.small,
    fontWeight: '700',
  },
  content: { padding: Spacing.md, gap: Spacing.xs },
  title: { fontSize: FontSize.title, fontWeight: '700' },
  details: { fontSize: FontSize.small },
});