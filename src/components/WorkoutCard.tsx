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

type WorkoutCardProps = {
  workout: Workout;
  style?: StyleProp<ViewStyle>;
  onLongPress?: () => void;
};

export default function WorkoutCard({
  workout,
  style,
  onLongPress,
}: WorkoutCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        `${workout.title}, ${workout.category}, ` +
        `${workout.date}, ${workout.durationMinutes} minutes`
      }
      accessibilityHint="Long press to delete"
      onPress={() => console.log('Open workout:', workout.id)}
      onLongPress={onLongPress}
      android_ripple={{ color: theme.border }}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View>
        <Image
          source={{ uri: workout.photoUrl }}
          style={[styles.image, { backgroundColor: theme.border }]}
          accessible={false}
        />

        <View
          style={[styles.badge, { backgroundColor: theme.primary }]}
        >
          <Text
            style={[styles.badgeText, { color: theme.onPrimary }]}
          >
            {workout.category}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]}>
          {workout.title}
        </Text>

        <Text style={[styles.description, { color: theme.muted }]}>
          {workout.date} · {workout.durationMinutes} min
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.65,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  badgeText: {
    fontSize: FontSize.small,
    fontWeight: '700',
  },
  body: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
  },
  description: {
    fontSize: FontSize.small,
  },
});