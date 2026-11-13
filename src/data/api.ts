import type { Workout } from '../types';
import { workouts } from './workouts';

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchWorkouts(
  options: { fail?: boolean } = {},
): Promise<Workout[]> {
  await wait(800);

  if (options.fail) {
    throw new Error('Could not load workouts');
  }

  return workouts.map((workout) => ({ ...workout }));
}