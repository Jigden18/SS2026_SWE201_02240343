# Lumina — Student Productivity App

React Native · Expo SDK 54 · TypeScript · SWE201 Assignment 2

---

## Setup

**Requirements**
- Node.js v20 LTS → https://nodejs.org
- Expo Go on your phone → App Store / Play Store

**Clone and run**

```bash
git clone https://github.com/Jigden18/SS2026_SWE201_02240343.git
cd Lumina
npm install --legacy-peer-deps
npx expo start --clear
```

Scan the QR code with Expo Go. Done.

**Full reset if something breaks**

```bash
rm -rf node_modules
npm install --legacy-peer-deps
npx expo start --clear
```

> Node v22 causes a Babel crash with Expo SDK 54. Use v20 LTS.

---

## App Idea

University students tend to lose track of deadlines and progress when they are spread across multiple subjects with no single place to check everything. Lumina puts it all in one screen — subject progress, task priorities, weekly study hours, and a daily streak counter — with no login or internet needed. Everything runs off local mock data.

The design uses deep blacks with teal, violet, and emerald accents to give it a real product feel rather than a prototype look.

---

## Features

- Dashboard with animated bar chart, progress rings, and today's task list
- Subject grid showing per-module completion and progress bars
- Subject detail screen with tasks filtered by subject
- Task priority system — high (rose), medium (violet), low (teal)
- Five interactive animation demos with trigger buttons
- Profile screen with streak stats and settings toggles
- Custom animated bottom tab bar that bounces on tab press
- Day streak counter tracking current and best streaks

---

## Navigation Flow

```
RootNavigator (Stack)
├── Main
│   ├── Home
│   ├── Subjects → tap any card → SubjectDetail (stack push, slides up)
│   ├── Animations
│   └── Profile
└── SubjectDetail
```

The root is a stack navigator. The tab navigator lives inside it as the main screen. When a subject card is tapped, `SubjectDetailScreen` pushes on top of the tabs using a custom `cardStyleInterpolator` that slides it up from the bottom. Tab switches use the default cross-fade. The tab bar itself is a fully custom component, not the Expo default.

---

## Animations

| # | Animation | Function Used | Location |
|---|-----------|--------------|----------|
| 1 | Fade in on screen mount | `Animated.timing` | `HomeScreen.tsx`, `ProfileScreen.tsx` |
| 2 | Slide up on screen mount | `Animated.parallel` | `HomeScreen.tsx` |
| 3 | Staggered subject card entry | `Animated.timing` + `delay` per index | `SubjectScreen.tsx` |
| 4 | Bar chart bars grow on load | `Animated.spring` | `HomeScreen.tsx` |
| 5 | SVG progress ring fill | `Animated.timing` + `interpolate` | `ProgressRing.tsx` |
| 6 | Tab icon bounce on focus | `Animated.sequence` + `spring` | `TabButton.tsx` |
| 7 | SubjectDetail slide-up transition | `cardStyleInterpolator` | `RootNavigator.tsx` |
| 8 | Scale and bounce demo | `Animated.sequence` | `AnimationDemoScreen.tsx` |
| 9 | Slide chip left/right demo | `Animated.spring` + `interpolate` | `AnimationDemoScreen.tsx` |
| 10 | Drag with snap-back gesture | `PanResponder` + `Animated.ValueXY` | `AnimationDemoScreen.tsx` |
| 11 | Pulse ring loop | `Animated.loop` + `Animated.parallel` | `AnimationDemoScreen.tsx` |

---

## Project Structure

```
lumina/
├── App.tsx                    # gesture handler import goes first
├── app.json
├── babel.config.js            # reanimated plugin last
└── src/
    ├── data/
    │   ├── theme.js           # colours, fonts, spacing — plain JS
    │   └── mockData.js        # all static data — plain JS
    ├── components/
    │   ├── GlowCard.tsx       # reusable glow card — GlowCardProps
    │   ├── ProgressRing.tsx   # animated SVG ring — ProgressRingProps
    │   └── TabButton.tsx      # animated tab button — TabButtonProps
    ├── navigation/
    │   ├── RootNavigator.tsx  # stack — RootStackParamList
    │   └── TabNavigator.tsx   # bottom tabs + CustomTabBar
    └── screens/
        ├── HomeScreen.tsx
        ├── SubjectScreen.tsx
        ├── SubjectDetailScreen.tsx
        ├── AnimationDemoScreen.tsx
        └── ProfileScreen.tsx
```

---

## Reusable Components

| Component | Props | Used In |
|-----------|-------|---------|
| `GlowCard.tsx` | `children`, `style?`, `glowColor?` | All screens |
| `ProgressRing.tsx` | `size`, `strokeWidth`, `progress`, `color`, `label` | Home, SubjectDetail, Profile |
| `TabButton.tsx` | `children`, `onPress`, `focused` | TabNavigator |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Babel crash on start | Wrong Node version — use v20 LTS |
| npm peer dep error | Use `npm install --legacy-peer-deps` |
| Drag gesture not working | `import 'react-native-gesture-handler'` must be first line of `App.tsx` |
| Screen not updating | Press `r` in terminal or run `npx expo start --clear` |
| SVG ring not showing | Run `npm install --legacy-peer-deps react-native-svg` |
| Babel preset not found / transform errors | Run `npm install --save-dev babel-preset-expo @babel/core` |

---

*SWE201 — Cross Platform Development · BE Software Engineering*