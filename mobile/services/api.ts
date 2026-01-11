import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// For mobile devices, use your computer's local IP address instead of localhost
// On iOS simulator: use 'localhost' or '127.0.0.1'
// On Android emulator: use '10.0.2.2'
// On physical device: use your computer's local IP (e.g., '192.168.1.100')
// 
// TO FIX NETWORK ERRORS ON PHYSICAL DEVICES:
// 1. Find your computer's IP: run `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)
// 2. Replace YOUR_IP_HERE below with your actual IP address
// 3. Example: const PHYSICAL_DEVICE_IP = '192.168.1.100';

// Your computer's IP address (found automatically: 192.168.1.98)
// Update this if your IP changes or if you're on a different network
const PHYSICAL_DEVICE_IP = '10.109.216.86'; // Change this to your computer's IP for physical devices

// Auto-detect the correct API URL based on platform
function getApiUrl() {
  // Check if custom URL is configured in app.json
  const customUrl = Constants.expoConfig?.extra?.apiUrl;
  if (customUrl) {
    return customUrl;
  }

  // Check if running on physical device (not simulator/emulator)
  // Constants.isDevice is unreliable in Expo Go, so we detect Expo Go separately
  const isPhysicalDevice = Constants.isDevice;
  // Expo Go detection: appOwnership === 'expo' means Expo Go app
  const isExpoGo = Constants.appOwnership === 'expo' || Constants.executionEnvironment === 'storeClient';
  
  // Debug logging to help diagnose
  console.log('🔍 Device Detection Debug:', {
    isDevice: Constants.isDevice,
    executionEnvironment: Constants.executionEnvironment,
    appOwnership: Constants.appOwnership,
    platform: Platform.OS,
    isExpoGo: isExpoGo,
  });
  
  // Check platform first, then device type
  // For Expo Go, always use IP address (works for physical devices)
  if (isExpoGo || isPhysicalDevice) {
    // Expo Go or physical device - use IP address
    console.log('📱 Android (Expo Go/Physical) - Using IP:', PHYSICAL_DEVICE_IP);
    return `http://${PHYSICAL_DEVICE_IP}:8000`;
  }
  else if (Platform.OS === 'android') {
    // If Expo Go OR physical device, use IP address
     // Only use 10.0.2.2 if we're SURE it's an emulator (not Expo Go AND isDevice is false)

      // Android emulator (not Expo Go) - use special IP 10.0.2.2
      console.log('🤖 Android emulator - Using IP: 10.0.2.2');
      return 'http://10.0.2.2:8000';
    }
   else if (Platform.OS === 'ios') {
    if (isExpoGo || isPhysicalDevice) {
      // Expo Go or physical device - use IP address
      console.log('📱 iOS (Expo Go/Physical) - Using IP:', PHYSICAL_DEVICE_IP);
      return `http://${PHYSICAL_DEVICE_IP}:8000`;
    } else {
      // iOS simulator (not Expo Go) - use localhost
      console.log('🍎 iOS simulator - Using localhost');
      return 'http://localhost:8000';
    }
  } else {
    // Web or other platforms
    console.log('🌐 Web/Other platform - Using localhost');
    return 'http://localhost:8000';
  }
}

const API_URL = getApiUrl();

console.log('🔗 API URL configured:', API_URL);
console.log('📱 Platform:', Platform.OS);
console.log('🖥️  Is Physical Device:', Constants.isDevice);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function api(path: string, options?: { method?: string; headers?: any; body?: any }) {
  try {
    const response = await apiClient({
      method: options?.method || 'GET',
      url: path,
      headers: options?.headers,
      data: options?.body,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ API Error:', error);
    
    // Provide helpful error messages
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️  Request timeout - check if backend is running');
      throw new Error('Request timeout. Please check if the backend server is running on port 8000.');
    } else if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      console.error('🌐 Network error - cannot reach backend');
      console.error('📍 Current API URL:', API_URL);
      console.error('📱 Platform:', Platform.OS);
      console.error('🖥️  Is Physical Device:', Constants.isDevice);
      
      let errorMsg = `Cannot connect to backend at ${API_URL}.\n\n`;
      
      if (Constants.isDevice) {
        // Physical device
        errorMsg += 'You are on a PHYSICAL DEVICE. You need to:\n\n';
        errorMsg += '1. Find your computer IP:\n';
        errorMsg += '   Mac: ipconfig getifaddr en0\n';
        errorMsg += '   Windows: ipconfig (look for IPv4 Address)\n\n';
        errorMsg += '2. Update services/api.ts line 15:\n';
        errorMsg += '   Change: const PHYSICAL_DEVICE_IP = "YOUR_IP_HERE";\n';
        errorMsg += `   To: const PHYSICAL_DEVICE_IP = "YOUR_ACTUAL_IP";\n\n`;
        errorMsg += '3. Make sure:\n';
        errorMsg += '   - Phone and computer are on same WiFi\n';
        errorMsg += '   - Backend is running: cd backend && node index.js\n';
        errorMsg += '   - Firewall allows connections on port 8000\n';
      } else if (Platform.OS === 'android') {
        // Android emulator
        errorMsg += 'You are on ANDROID EMULATOR. Make sure:\n';
        errorMsg += '1. Backend server is running: cd backend && node index.js\n';
        errorMsg += '2. Backend is accessible on port 8000\n';
        errorMsg += '3. Using API URL: http://10.0.2.2:8000\n';
      } else if (Platform.OS === 'ios') {
        // iOS simulator
        errorMsg += 'You are on iOS SIMULATOR. Make sure:\n';
        errorMsg += '1. Backend server is running: cd backend && node index.js\n';
        errorMsg += '2. Backend is accessible on port 8000\n';
        errorMsg += '3. Using API URL: http://localhost:8000\n';
      }
      
      throw new Error(errorMsg);
    } else if (error.response) {
      console.error('📄 Response data:', error.response.data);
      console.error('📊 Response status:', error.response.status);
      throw error;
    } else {
      throw error;
    }
  }
}
