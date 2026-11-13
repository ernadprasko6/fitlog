# FitLog

FitLog is a personal workout journal for people who want to keep their gym sessions organised. Users will be able to create, view, edit and delete workouts with exercises, duration, notes and an optional photo.

## Run locally

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go compatible with SDK 58.

## Features

- [x] Workout list with five sample workouts
- [x] Reusable workout cards and details component
- [ ] Navigation from the list to workout details
- [ ] Add, edit and delete workouts
- [ ] Search and category filters
- [ ] Workout photos from the phone gallery
- [ ] Supabase sign-in and private workout storage
- [x] Light and dark themes

## Lab 5 screenshots

![FitLog in light mode](docs/home-light.jpg)

![FitLog in dark mode](docs/home-dark.jpg)

## Lab 6 – Main List Screen

- Virtualized FlatList with stable workout IDs.
- Responsive grid: one column below 600, two from 600, three from 900.
- Scrolling header with workout count and total duration.
- Loading indicator and error state with retry.
- Pull-to-refresh while keeping existing workouts visible.
- Category filters with highlighted accessible chips.
- Specific empty messages for an empty list or category.
- Sorting by newest date or longest duration without mutating state.
- Long-press deletion with confirmation.
- Accessible workout labels and Android touch feedback.

Data currently comes from a simulated API. Deletions are stored only in
memory; refreshing or restarting restores the mock workouts.