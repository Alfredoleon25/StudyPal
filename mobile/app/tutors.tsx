import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

export default function Tutors() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const storedUser = await storage.getUser();
      if (!storedUser || !storedUser.learnSubjects?.length) return;
      setUser(storedUser);

      try {
        const subjectsParam = storedUser.learnSubjects.join(',');
        const response = await api(`/tutors?subjects=${subjectsParam}`);
        setTutors(response);
      } catch (err) {
        console.error('Error fetching tutors:', err);
      }
    };
    loadData();
  }, []);

  const requestHelp = async (tutorId: string, tutorName: string) => {
    if (!user) return;

    try {
      const allChats = await api(`/chats/${user.id}`);
      const existingChat = allChats.find(
        (chat: any) =>
          ((chat.learnerId === user.id && chat.tutorId === tutorId) ||
            (chat.tutorId === user.id && chat.learnerId === tutorId)) &&
          chat.subject === user.learnSubjects[0]
      );

      if (existingChat) {
        router.push(`/chat/${existingChat.id}`);
      } else {
        const pendingChat = {
          learnerId: user.id,
          tutorId,
          tutorName,
          subject: user.learnSubjects[0],
        };
        await storage.setPendingChat(pendingChat);
        router.push('/chat/new');
      }
    } catch {
      Alert.alert('Error', 'Failed to start chat');
    }
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
            <Text style={styles.title}>Tutors for your subjects</Text>
            <TouchableOpacity
              onPress={() => router.push('/dashboard')}
              style={styles.dashboardButton}
            >
              <Text style={styles.dashboardButtonText}>← Dashboard</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subjectsRow}>
            {user.learnSubjects?.map((subject: string) => (
              <View key={subject} style={styles.subjectTag}>
                <Text style={styles.subjectTagText}>{subject}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => router.push('/edit-subjects')}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Edit subjects</Text>
            </TouchableOpacity>
          </View>

          {tutors.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No tutors available right now</Text>
              <Text style={styles.emptyText}>
                Try checking back later or editing your subjects.
              </Text>
            </View>
          ) : (
            <View style={styles.tutorsList}>
              {tutors.map((tutor) => (
                <View key={tutor.id} style={styles.tutorCard}>
                  {/* Tutor info at top */}
                  <View style={styles.tutorInfo}>
                    <Text style={styles.tutorName}>{tutor.name}</Text>
                    <View style={styles.subjectsContainer}>
                      {tutor.teachSubjects?.map((subject: string) => (
                        <View key={subject} style={styles.teachTag}>
                          <Text style={styles.teachTagText}>{subject}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Button pinned at bottom */}
                  <TouchableOpacity
                    onPress={() => requestHelp(tutor.id, tutor.name)}
                    style={styles.startChatButton}
                  >
                    <Text style={styles.startChatButtonText}>Start Chat</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { fontSize: 18, color: '#666' },
  scrollContent: { padding: 20, alignItems: 'center' },
  card: {
    width: '100%',
    maxWidth: 700,
    padding: 20,
    backgroundColor: '#47494dff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 5,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#fff', flex: 1 },
  dashboardButton: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#fff', borderWidth: 2, borderColor: '#4CAF50', borderRadius: 8 },
  dashboardButtonText: { color: '#4CAF50', fontWeight: 'bold', fontSize: 14 },
  subjectsRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  subjectTag: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#e3f2fd', borderWidth: 1, borderColor: '#bbdefb' },
  subjectTagText: { color: '#1565c0', fontSize: 14, fontWeight: '500' },
  editButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  editButtonText: { color: '#333', fontSize: 13 },
  emptyContainer: { padding: 30, alignItems: 'center', borderWidth: 1, borderStyle: 'dashed', borderColor: '#ccc', borderRadius: 12 },
  emptyTitle: { fontSize: 18, marginBottom: 8, color: '#fff', textAlign: 'center' },
  emptyText: { color: '#ccc', fontSize: 14, textAlign: 'center' },
  tutorsList: { flexDirection: 'column', gap: 16, width: '100%' },
  tutorCard: {
    flexDirection: 'column',
    justifyContent: 'space-between', // button at bottom
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  tutorInfo: { width: '100%', marginBottom: 12 },
  tutorName: { fontSize: 18, fontWeight: '600', color: '#222', marginBottom: 8 },
  subjectsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  teachTag: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#e8f5e9', borderWidth: 1, borderColor: '#c8e6c9' },
  teachTagText: { color: '#2e7d32', fontSize: 13 },
  startChatButton: {
    alignSelf: 'stretch', // full width
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  startChatButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
