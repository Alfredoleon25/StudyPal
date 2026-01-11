import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

interface Request {
  id: string;
  learnerId: string;
  tutorId: string;
  subject: string;
  messages: Array<{ id: string; content: string; createdAt: string }>;
  createdAt: string;
  tutor?: {
    id: string;
    name: string;
  };
}

export default function LearnerRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
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
      fetchRequests(storedUser);
    };
    loadData();
  }, []);

  const fetchRequests = async (storedUser: any) => {
    try {
      const response = await api(`/requests/learner/${storedUser.id}`);
      setRequests(response);
    } catch (error) {
      console.error('Error fetching requests:', error);
      Alert.alert('Error', 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const openChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading requests...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>My Sent Requests</Text>
            <TouchableOpacity
              onPress={() => router.push('/dashboard')}
              style={styles.dashboardButton}
            >
              <Text style={styles.dashboardButtonText}>← Dashboard</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.greeting}>
            Hello, <Text style={styles.boldText}>{user.name}</Text>! Here are the help requests
            you've sent.
          </Text>

          {requests.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>📝 No requests sent yet</Text>
              <Text style={styles.emptyText}>
                Go to <Text style={styles.linkText}>Find Tutors</Text> to request help
              </Text>
            </View>
          ) : (
            <View style={styles.requestsList}>
              {requests.map((request) => {
                const lastMessage = request.messages[0];
                return (
                  <TouchableOpacity
                    key={request.id}
                    onPress={() => openChat(request.id)}
                    style={styles.requestCard}
                    activeOpacity={0.8}
                  >
                    <View style={styles.subjectBadge}>
                      <Text style={styles.subjectBadgeText}>{request.subject}</Text>
                    </View>
                    <View style={styles.messageContainer}>
                      <Text style={styles.messageText} numberOfLines={1}>
                        {lastMessage?.content || 'No message yet'}
                      </Text>
                    </View>
                    <View style={styles.requestFooter}>
                      <Text style={styles.requestFooterText}>
                        Sent to:{' '}
                        <Text style={styles.boldText}>
                          {request.tutor?.name || 'Unknown Tutor'}
                        </Text>
                      </Text>
                      <Text style={styles.requestFooterText}>
                        {new Date(request.createdAt).toLocaleString()}
                      </Text>
                    </View>
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
    fontSize: 32,
    marginBottom: 10,
    color: '#fff',
    fontWeight: '700',
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
  greeting: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  emptyTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  emptyText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    color: '#4CAF50',
  },
  requestsList: {
    gap: 20,
  },
  requestCard: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 2,
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  subjectBadge: {
    backgroundColor: '#2196F3',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  subjectBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  messageContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  requestFooterText: {
    fontSize: 13,
    color: '#555',
  },
});
