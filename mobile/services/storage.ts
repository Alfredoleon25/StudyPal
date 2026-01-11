import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  async getUser(): Promise<any | null> {
    const userStr = await this.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async setUser(user: any): Promise<void> {
    await this.setItem('user', JSON.stringify(user));
  },

  async getTempUser(): Promise<any | null> {
    const tempUserStr = await this.getItem('tempuser');
    return tempUserStr ? JSON.parse(tempUserStr) : null;
  },

  async setTempUser(tempUser: any): Promise<void> {
    await this.setItem('tempuser', JSON.stringify(tempUser));
  },

  async getPendingChat(): Promise<any | null> {
    const pendingChatStr = await this.getItem('pendingChat');
    return pendingChatStr ? JSON.parse(pendingChatStr) : null;
  },

  async setPendingChat(pendingChat: any): Promise<void> {
    await this.setItem('pendingChat', JSON.stringify(pendingChat));
  },
};
