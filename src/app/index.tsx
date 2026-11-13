import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EmptyState from '../components/EmptyState';
import FilterChip from '../components/FilterChip';
import WorkoutCard from '../components/WorkoutCard';
import { FontSize, Radius, Spacing } from '../constants/theme';
import { fetchWorkouts } from '../data/api';
import { useTheme } from '../hooks/use-theme';
import type { Workout } from '../types';

type Status = 'loading' | 'error' | 'ready';
type Filter = 'All' | Workout['category'];
type SortOrder = 'Newest' | 'Longest';

const filters: Filter[] = ['All', 'Push', 'Pull', 'Legs', 'Other'];
const sortOrders: SortOrder[] = ['Newest', 'Longest'];

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('Newest');

  useEffect(() => {
    let ignore = false;

    fetchWorkouts()
      .then((data) => {
        if (!ignore) {
          setWorkouts(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error');
        }
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setAttempt((previous) => previous + 1);
  }

  async function refresh() {
    if (refreshing) return;

    setRefreshing(true);

    try {
      const data = await fetchWorkouts();
      setWorkouts(data);
    } catch {
      Alert.alert(
        'Refresh failed',
        'Your current workouts are still available. Try again.',
      );
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(workout: Workout) {
    Alert.alert(
      'Delete workout?',
      `"${workout.title}" will be removed.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setWorkouts((list) =>
              list.filter((item) => item.id !== workout.id),
            );
          },
        },
      ],
    );
  }

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const paddingLeft = Spacing.md + insets.left;
  const paddingRight = Spacing.md + insets.right;

  const cardWidth =
    (width -
      paddingLeft -
      paddingRight -
      (columns - 1) * Spacing.md) /
    columns;

  const visible =
    filter === 'All'
      ? workouts
      : workouts.filter((workout) => workout.category === filter);

  const sortedWorkouts = [...visible].sort((a, b) =>
    sortOrder === 'Longest'
      ? b.durationMinutes - a.durationMinutes
      : b.date.localeCompare(a.date),
  );

  const totalMinutes = workouts.reduce(
    (total, workout) => total + workout.durationMinutes,
    0,
  );

  const summary = [
    { label: 'Workouts', value: workouts.length },
    { label: 'Total minutes', value: totalMinutes },
  ];

  if (status === 'loading') {
    return (
      <View
        style={[
          styles.state,
          {
            backgroundColor: theme.background,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text style={[styles.bodyText, { color: theme.muted }]}>
          Loading workouts…
        </Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View
        style={[
          styles.state,
          {
            backgroundColor: theme.background,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Text style={[styles.errorTitle, { color: theme.text }]}>
          Could not load workouts
        </Text>

        <Text style={[styles.bodyText, { color: theme.muted }]}>
          Please try again.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={retry}
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[styles.retryLabel, { color: theme.onPrimary }]}
          >
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      key={columns}
      style={[styles.screen, { backgroundColor: theme.background }]}
      data={sortedWorkouts}
      extraData={theme}
      numColumns={columns}
      keyExtractor={(workout) => workout.id}
      columnWrapperStyle={
        columns > 1 ? styles.columnWrapper : undefined
      }
      contentContainerStyle={[
        styles.content,
        {
          paddingLeft,
          paddingRight,
          paddingBottom: Spacing.md + insets.bottom,
        },
      ]}
      renderItem={({ item }) => (
        <WorkoutCard
          workout={item}
          style={{ width: cardWidth }}
          onLongPress={() => confirmDelete(item)}
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            My Workouts
          </Text>

          <View style={styles.summary}>
            {summary.map(({ label, value }) => (
              <View
                key={label}
                style={[
                  styles.summaryBox,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text
                  style={[styles.number, { color: theme.primary }]}
                >
                  {value}
                </Text>

                <Text
                  style={[styles.summaryLabel, { color: theme.muted }]}
                >
                  {label}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.chips}>
            {filters.map((category) => (
              <FilterChip
                key={category}
                label={category}
                selected={filter === category}
                onPress={() => setFilter(category)}
              />
            ))}
          </View>

          <View style={styles.chips}>
            {sortOrders.map((order) => (
              <FilterChip
                key={order}
                label={order}
                selected={sortOrder === order}
                onPress={() => setSortOrder(order)}
              />
            ))}
          </View>

          <Text style={[styles.hint, { color: theme.muted }]}>
            Long press a workout to delete it.
          </Text>
        </View>
      }
      ListHeaderComponentStyle={styles.headerSpacing}
      ListEmptyComponent={
        <EmptyState
          title={
            filter === 'All'
              ? 'No workouts yet'
              : `No ${filter} workouts`
          }
          message={
            filter === 'All'
              ? 'Your workouts will appear here.'
              : 'Choose another category.'
          }
        />
      }
      refreshing={refreshing}
      onRefresh={refresh}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: Spacing.md,
  },
  columnWrapper: {
    gap: Spacing.md,
  },
  separator: {
    height: Spacing.md,
  },
  header: {
    gap: Spacing.md,
  },
  headerSpacing: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: '700',
  },
  summary: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  summaryBox: {
    flex: 1,
    minWidth: 0,
    padding: Spacing.md,
    gap: Spacing.xs,
    borderWidth: 1,
    borderRadius: Radius.md,
  },
  number: {
    fontSize: FontSize.hero,
    fontWeight: '700',
    textAlign: 'center',
  },
  summaryLabel: {
    fontSize: FontSize.small,
    textAlign: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  hint: {
    fontSize: FontSize.small,
  },
  state: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  bodyText: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: FontSize.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  retryButton: {
    minHeight: 44,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    justifyContent: 'center',
  },
  retryLabel: {
    fontSize: FontSize.body,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});