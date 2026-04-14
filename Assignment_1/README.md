# Campus Companion

A React Native mobile application built with Expo for new students at the College of Science and Technology (CST), Rinchending, Phuentsholing. The app provides quick access to important campus information including contacts, weekly class schedules, college announcements, campus map links, and a student profile.

**Module:** SWE201 – Cross Platform Development
**Assignment:** Programming Assignment 1
**Programme:** BE Software Engineering, Year 2 Semester 2

---

## App Overview

Campus Companion is a multi-screen mobile app designed to help new CST students navigate college life. It features a clean, responsive UI that works across different Android and iOS screen sizes.

The app consists of six screens accessible through a Bottom Tab Navigator, with a nested Stack Navigator inside the Contacts tab for drill-down navigation to contact details.

---

## Main Features

- **Home** — College banner with logo, responsive quick access grid, inline campus map links that open in Google Maps, and a platform detector badge
- **Contacts** — Full list of important college contacts rendered with FlatList, tap any contact to view full details on a separate screen
- **Contact Detail** — Displays phone, email, office location, and role for the selected contact, with a back button provided by the Stack Navigator
- **Schedule** — Weekly timetable with a fixed five-day tab selector, event type badges (Lecture, Practical, Exam, Tutorial), and a scrollable class list
- **Notice Board** — College announcements with color-coded type badges (Exam, Info, Warning, Event) and full announcement body text
- **Profile** — Student profile displaying name, student ID, programme, year, email, phone, and hometown

---

## Project Structure

```
CampusCompanion/
├── App.js
├── README.md
├── package.json
├── .gitignore
├── assets/
│   ├── logo.png
│   ├── icon.png
│   └── splash.png
└── src/
    ├── navigation/
    │   └── AppNavigator.js
    ├── screens/
    │   ├── HomeScreen.js
    │   ├── ContactsScreen.js
    │   ├── ContactDetailScreen.js
    │   ├── ScheduleScreen.js
    │   ├── NoticeBoardScreen.js
    │   └── ProfileScreen.js
    ├── components/
    │   └── ContactCard.js
    └── styles/
        └── theme.js
```

---

## Prerequisites

Before running the app, ensure the following are installed on your machine:

- [Node.js](https://nodejs.org/) version 18 or later
- npm version 9 or later (comes with Node.js)
- [Expo Go](https://expo.dev/client) app installed on your Android or iOS device, or an Android emulator / iOS simulator configured on your machine

---

## Install Dependencies and Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CampusCompanion.git
cd CampusCompanion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

### 4. Open the app

| Method | Steps |
|---|---|
| Physical device | Scan the QR code in the terminal using the Expo Go app |
| Android emulator | Press `a` in the terminal after the server starts |
| iOS simulator (macOS only) | Press `i` in the terminal after the server starts |
| Web browser (preview only) | Press `w` in the terminal |

---

## Navigation Structure

```
Bottom Tab Navigator
├── Home
├── Contacts (Stack Navigator)
│   ├── Contacts List
│   └── Contact Detail
├── Schedule
├── Notice Board
└── Profile
```

---

## Technologies Used

| Technology | Purpose |
|---|---|
| React Native | Core mobile UI framework |
| Expo SDK 51 | Project tooling and build system |
| React Navigation  | Stack and Bottom Tab navigation |
| @expo/vector-icons (Ionicons) | Icon set used throughout the app |
| React Native Gesture Handler | Required peer dependency for Stack Navigator |
| React Native Reanimated | Required peer dependency for animations |
| React Native Screens | Required peer dependency for native screen optimization |
| React Native Safe Area Context | Handles safe area insets on notched devices |

---

## Known Issues and Limitations

- All contact details, timetable data, and notices are static and hardcoded. No backend or API is connected.
- Campus map links use placeholder Google Maps URLs. Replace the `url` values in the `MAP_LINKS` array in `HomeScreen.js` with real share links from Google Maps.
- The dark mode toggle defined in `src/styles/theme.js` is not yet wired to a UI control. It is available for extension in future assignments.
- The student profile data in `ProfileScreen.js` is hardcoded. Replace the `PROFILE` object with real student data or connect to an authentication system in future iterations.
- Web preview (`w` key) may have limited styling accuracy as the app is optimized for mobile.

---

## License

This project is submitted as an academic assignment for SWE201 at the College of Science and Technology, Royal University of Bhutan. Not intended for commercial use.