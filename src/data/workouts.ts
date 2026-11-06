import type { Workout } from '../types';

export const workouts: Workout[] = [
  { id: '1', title: 'Push Day', category: 'Push', date: '2026-11-06', durationMinutes: 60, photoUrl: 'https://picsum.photos/seed/fitlog-push/600/300' },
  { id: '2', title: 'Pull Day', category: 'Pull', date: '2026-11-05', durationMinutes: 55, photoUrl: 'https://picsum.photos/seed/fitlog-pull/600/300' },
  { id: '3', title: 'Leg Day', category: 'Legs', date: '2026-11-03', durationMinutes: 65, photoUrl: 'https://picsum.photos/seed/fitlog-legs/600/300' },
  { id: '4', title: 'Upper Body', category: 'Other', date: '2026-11-01', durationMinutes: 45, photoUrl: 'https://picsum.photos/seed/fitlog-upper/600/300' },
  { id: '5', title: 'Treadmill Session', category: 'Other', date: '2026-10-30', durationMinutes: 30, photoUrl: 'https://picsum.photos/seed/fitlog-cardio/600/300' },
];