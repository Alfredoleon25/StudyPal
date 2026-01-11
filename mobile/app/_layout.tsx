import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="landing-page" />
        <Stack.Screen name="registration" />
        <Stack.Screen name="subjects" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="edit-subjects" />
        <Stack.Screen name="tutors" />
        <Stack.Screen name="tutor-requests" />
        <Stack.Screen name="my-requests" />
        <Stack.Screen name="chats" />
        <Stack.Screen name="chat/[chatId]" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
