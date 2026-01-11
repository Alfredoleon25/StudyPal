import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

const SUBJECTS = [
  { name: 'Calculus', icon: '∫' },
  { name: 'Physics', icon: '⚛️' },
  { name: 'Code', icon: '💻' },
  { name: 'Chemistry', icon: '🧪' },
  { name: 'Biology', icon: '🧬' },
  { name: 'Statistics', icon: '📊' },
  { name: 'Algebra', icon: '📐' },
  { name: 'Engineering', icon: '🏗️' },
  { name: 'Economics', icon: '📈' },
  { name: 'Psychology', icon: '🧠' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOX_WIDTH = (SCREEN_WIDTH - 100) / 2; // Two columns with gap
const BOX_HEIGHT = 60;

export default function Subjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [tempUser, setTempUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadTempUser = async () => {
      const temp = await storage.getTempUser();
      if (!temp) {
        router.push('/landing-page');
        return;
      }
      setTempUser(temp);
    };
    loadTempUser();
  }, []);

  const toggleLearnSubject = (subject: string) => {
    setLearnSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setTeachSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const toggleTeachSubject = (subject: string) => {
    setTeachSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
    setLearnSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const createUser = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      Alert.alert('Error', 'Select at least one subject to learn or teach');
      return;
    }
    if (!tempUser) return;

    setLoading(true);
    try {
      const user = await api('/users', {
        method: 'POST',
        body: {
          name: tempUser.name,
          learnSubjects,
          teachSubjects,
        },
      });

      await storage.setUser(user);
      await storage.removeItem('tempuser');

      setTimeout(() => {
        router.replace('/dashboard');
      }, 100);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  if (!tempUser) return null;

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Hi {tempUser.name}</Text>
        <Text style={styles.subtitle}>Pick what you want to learn or teach</Text>

        <View style={styles.grid}>
          {/* LEARN */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>📚 Learn</Text>
            <View style={styles.rowWrap}>
              {SUBJECTS.map((s) => {
                const active = learnSubjects.includes(s.name);
                return (
                  <TouchableOpacity
                    key={`learn-${s.name}`}
                    onPress={() => toggleLearnSubject(s.name)}
                    style={[
                      styles.subjectCard,
                      active && styles.subjectCardActive,
                    ]}
                  >
                    <Text style={styles.subjectIcon}>{s.icon}</Text>
                    <Text style={styles.subjectName}>{s.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* TEACH */}
          <View style={styles.column}>
            <Text style={[styles.columnTitle, styles.columnTitleTeach]}>👨‍🏫 Teach</Text>
            <View style={styles.rowWrap}>
              {SUBJECTS.map((s) => {
                const active = teachSubjects.includes(s.name);
                return (
                  <TouchableOpacity
                    key={`teach-${s.name}`}
                    onPress={() => toggleTeachSubject(s.name)}
                    style={[
                      styles.subjectCard,
                      styles.subjectCardTeach,
                      active && styles.subjectCardTeachActive,
                    ]}
                  >
                    <Text style={styles.subjectIcon}>{s.icon}</Text>
                    <Text style={styles.subjectName}>{s.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={createUser}
            style={[styles.continueButton, loading && styles.buttonDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 30, paddingBottom: 80 },
  heading: { textAlign: 'center', fontSize: 36, fontWeight: '800', color: 'white', marginBottom: 10 },
  subtitle: { textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: 18, marginBottom: 30 },
  grid: { flexDirection: 'row', gap: 20 },
  column: { flex: 1 },
  columnTitle: { marginBottom: 15, fontSize: 18, fontWeight: '700', color: '#3341a9' },
  columnTitleTeach: { color: '#4CAF50' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  subjectCard: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    padding: 10,
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  subjectCardActive: { backgroundColor: '#e3f2fd', borderWidth: 2, borderColor: '#2196F3' },
  subjectCardTeach: { backgroundColor: '#ffffff' },
  subjectCardTeachActive: { backgroundColor: '#e8f5e9', borderWidth: 2, borderColor: '#4CAF50' },
  subjectIcon: { fontSize: 24 },
  subjectName: { fontSize: 16, fontWeight: '600', textAlign: 'center', flex: 1, flexWrap: 'wrap' },
  actions: { marginTop: 20, flexDirection: 'row', gap: 12, justifyContent: 'center' },
  backButton: { paddingVertical: 14, paddingHorizontal: 32, borderRadius: 10, borderWidth: 2, borderColor: '#ddd', backgroundColor: '#fff', minWidth: 100 },
  backButtonText: { fontWeight: '600', fontSize: 16, color: 'black', textAlign: 'center' },
  continueButton: { paddingVertical: 14, paddingHorizontal: 48, borderRadius: 10, backgroundColor: '#fff', minWidth: 150, shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
  continueButtonText: { color: 'black', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  buttonDisabled: { opacity: 0.6 },
});
