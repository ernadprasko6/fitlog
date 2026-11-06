export const Colors = {
  light: {
    text: '#152D40',
    muted: '#526473',
    background: '#EEF5F7',
    card: '#FFFFFF',
    border: '#CEDCE2',
    primary: '#086B76',
    onPrimary: '#FFFFFF',
  },
  dark: {
    text: '#F2F7F9',
    muted: '#A9BAC7',
    background: '#101C28',
    card: '#1A2A39',
    border: '#334959',
    primary: '#72D9D5',
    onPrimary: '#10252C',
  },
} as const;

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const FontSize = { small: 13, body: 16, title: 20, hero: 28 } as const;
export const Radius = { sm: 8, md: 12, pill: 999 } as const;