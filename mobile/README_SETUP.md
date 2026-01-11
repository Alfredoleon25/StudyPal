# StudyPal Mobile App Setup

This is the mobile version of StudyPal, built with React Native and Expo. It matches the web app functionality exactly.

## Prerequisites

- Node.js installed
- Expo CLI installed globally: `npm install -g expo-cli`
- iOS Simulator (for Mac) or Android Emulator
- Physical device with Expo Go app (optional)

## Installation

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## API Configuration

**Important:** For the mobile app to connect to your backend, you need to configure the API URL:

### For iOS Simulator:
The default `localhost:8000` should work.

### For Android Emulator:
Update `/mobile/services/api.ts` to use `10.0.2.2:8000` instead of `localhost:8000`.

### For Physical Devices:
1. Find your computer's local IP address:
   - Mac/Linux: Run `ifconfig` or `ipconfig getifaddr en0`
   - Windows: Run `ipconfig` and find your IPv4 address

2. Update `/mobile/services/api.ts` with your IP:
   ```typescript
   const API_URL = "http://YOUR_IP_ADDRESS:8000";
   ```

   Example: `const API_URL = "http://192.168.1.100:8000";`

3. Make sure your backend server is running and accessible from your network (firewall may need configuration).

## Running the App

### Start the development server:
```bash
npm start
```

### Run on iOS:
```bash
npm run ios
```

### Run on Android:
```bash
npm run android
```

### Run on Web:
```bash
npm run web
```

## Pages

The mobile app includes all pages from the web app:

- **Landing Page** (`/`) - Homepage
- **Registration** (`/registration`) - User registration
- **Subjects** (`/subjects`) - Select learning/teaching subjects
- **Dashboard** (`/dashboard`) - Main dashboard
- **Edit Subjects** (`/edit-subjects`) - Edit your subjects
- **Tutors** (`/tutors`) - Browse available tutors
- **My Requests** (`/my-requests`) - View sent requests
- **Tutor Requests** (`/tutor-requests`) - View received requests
- **Chats** (`/chats`) - Chat list
- **Chat Window** (`/chat/[chatId]`) - Individual chat

## Features

- ✅ All web app features ported to mobile
- ✅ React Native components with native styling
- ✅ AsyncStorage for data persistence (replaces localStorage)
- ✅ Expo Router for navigation (replaces React Router)
- ✅ Axios for API calls
- ✅ Gradient backgrounds matching web design
- ✅ Mobile-responsive layouts

## Differences from Web App

- Uses `AsyncStorage` instead of `localStorage`
- Uses Expo Router navigation instead of `window.location`
- Uses React Native components (`View`, `Text`, `TouchableOpacity`, etc.) instead of HTML elements
- Styling uses `StyleSheet` API instead of inline styles with CSS properties
- Some web-specific features (like hover states) are replaced with `activeOpacity` on TouchableOpacity

## Troubleshooting

### Can't connect to backend:
- Make sure the backend server is running on port 8000
- Check your API URL configuration
- For physical devices, ensure your phone and computer are on the same WiFi network
- Check firewall settings on your computer

### Build errors:
- Clear Expo cache: `expo start -c`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### TypeScript errors:
- Some StyleSheet type warnings are expected and don't prevent the app from running
- The app will compile and run despite these warnings
