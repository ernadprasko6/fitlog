export type Workout = {
  id: string;
  title: string;
  category: 'Push' | 'Pull' | 'Legs' | 'Other';
  date: string;
  durationMinutes: number;
  photoUrl: string;
};