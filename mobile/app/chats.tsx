import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

interface Chat {
  id: string;
  subject: string;
  learner: { id: string; name: string };
  tutor: { id: string; name: string };
  messages: Array<{ content: string; createdAt: string }>;
  createdAt: string;
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const storedUser = await storage.getUser();
      if (!storedUser) {
        router.replace('/landing-page');
        return;
      }
      setUser(storedUser);
      fetchChats();
    };
    loadData();
  }, []);

  const fetchChats = async () => {
    try {
      const storedUser = await storage.getUser();
      if (!storedUser) return;
      const response = await api(`/chats/${storedUser.id}`);
      setChats(response);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const openChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>My Chats</Text>
            <TouchableOpacity
              onPress={() => router.push('/dashboard')}
              style={styles.dashboardButton}
            >
              <Text style={styles.dashboardButtonText}>← Dashboard</Text>
            </TouchableOpacity>
          </View>

          {chats.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No chats yet</Text>
              <Text style={styles.emptyText}>
                Request help from a tutor or wait for someone to reach out
              </Text>
            </View>
          ) : (
            <View style={styles.chatsList}>
              {chats.map((chat) => {
                const isLearner = chat.learner.id === user.id;
                const otherUser = isLearner ? chat.tutor : chat.learner;
                const lastMessage = chat.messages[0];
                const borderColor = isLearner ? '#2196F3' : '#4CAF50';
                const backgroundColor = isLearner
                  ? 'rgba(227,242,253,0.9)'
                  : 'rgba(241,248,244,0.9)';

                return (
                  <TouchableOpacity
                    key={chat.id}
                    onPress={() => openChat(chat.id)}
                    style={[
                      styles.chatCard,
                      { backgroundColor, borderColor, borderWidth: 2 },
                    ]}
                    activeOpacity={0.8}
                  >
                    <View style={styles.chatInfo}>
                      <Text style={styles.chatName}>{otherUser.name}</Text>
                      <View style={styles.chatTags}>
                        <View style={[styles.roleTag, { backgroundColor: borderColor }]}>
                          <Text style={styles.roleTagText}>
                            {isLearner ? '🎓 Learning' : '👨‍🏫 Teaching'}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.subjectTag,
                            { backgroundColor: isLearner ? '#1976D2' : '#388E3C' },
                          ]}
                        >
                          <Text style={styles.subjectTagText}>{chat.subject}</Text>
                        </View>
                      </View>
                      {lastMessage && (
                        <Text style={styles.lastMessage} numberOfLines={1}>
                          {lastMessage.content}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.chatDate}>
                      {new Date(chat.createdAt).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  scrollContent: {
    padding: 40,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 700,
    padding: 40,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  dashboardButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4c99afff',
    borderRadius: 8,
  },
  dashboardButtonText: {
    color: '#4c63afff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  emptyTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  emptyText: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'center',
  },
  chatsList: {
    gap: 20,
  },
  chatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  chatInfo: {
    flex: 1,
    minWidth: 0,
  },
  chatName: {
    fontSize: 18,
    color: '#222',
    marginBottom: 10,
    fontWeight: '600',
  },
  chatTags: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  roleTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  roleTagText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  subjectTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  subjectTagText: {
    fontSize: 12,
    color: '#fff',
  },
  lastMessage: {
    marginTop: 8,
    color: '#555',
    fontSize: 14,
  },
  chatDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
});
