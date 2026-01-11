import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { storage } from '@/services/storage';
import { Href } from 'expo-router';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  bg: string;
  href: Href
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SMALL_SCREEN_BREAKPOINT = 480;

function FeatureCard({ icon, title, description, bg, href }: FeatureCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(href)}
      style={[styles.featureCard, { backgroundColor: bg }]}
      activeOpacity={0.8}
    >
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await storage.getUser();
      if (!storedUser) {
        router.replace('/landing-page');
        return;
      }
      setUser(storedUser);
    };
    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Determine layout: 1 card per row if small screen, else 2 per row
  const isSmallScreen = SCREEN_WIDTH < SMALL_SCREEN_BREAKPOINT;
  const cardWidth = isSmallScreen ? '100%' : '48%'; // 48% + gap ~ 2 per row
  const cardHeight = 180;

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
            <Text style={styles.subtitle}>Find tutors. Help students. Chat instantly.</Text>
            <TouchableOpacity
              onPress={() => router.push('/edit-subjects')}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Edit Subjects</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subjectsContainer}>
            {user.learnSubjects?.map((subject: string) => (
              <View key={`learn-${subject}`} style={[styles.subjectTag, styles.learnTag]}>
                <Text style={styles.learnTagText}>{subject}</Text>
              </View>
            ))}
            {user.teachSubjects?.map((subject: string) => (
              <View key={`teach-${subject}`} style={[styles.subjectTag, styles.teachTag]}>
                <Text style={styles.teachTagText}>{subject}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.featuresGrid, { flexDirection: isSmallScreen ? 'column' : 'row', flexWrap: isSmallScreen ? 'nowrap' : 'wrap' }]}>
            <FeatureCard
              icon="🎓"
              title="Find Tutors"
              description="Browse tutors available for your learning subjects."
              bg="#e0ecff"
              href="/tutors"
            />
            <FeatureCard
              icon="📝"
              title="My Requests"
              description="Track the help requests you've sent."
              bg="#e6f6ff"
              href="/my-requests"
            />
            <FeatureCard
              icon="🤝"
              title="Help Requests"
              description="See students who need help in your subjects."
              bg="#dcfce7"
              href="/tutor-requests"
            />
            <FeatureCard
              icon="💬"
              title="My Chats"
              description="Continue conversations with tutors and students."
              bg="#f0fdf4"
              href="/chats"
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  loadingText: { fontSize: 18, color: '#666' },
  scrollContent: { flexGrow: 1, padding: 30, paddingBottom: 80 },
  content: {},
  header: { marginBottom: 30 },
  welcomeText: { fontSize: 40, fontWeight: '800', marginBottom: 12,marginTop:30, color: '#fff', letterSpacing: -0.5 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#f9fafb', marginBottom: 16 },
  editButton: { marginTop: 12, paddingVertical: 10, paddingHorizontal: 18, backgroundColor: '#f9fafb', borderRadius: 10, alignSelf: 'flex-start' },
  editButtonText: { color: '#111827', fontSize: 15, fontWeight: '600' },
  subjectsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  subjectTag: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 9999 },
  learnTag: { backgroundColor: '#eef2ff' },
  learnTagText: { color: '#0a3ea7ff', fontWeight: '600', fontSize: 14 },
  teachTag: { backgroundColor: '#ecfdf5' },
  teachTagText: { color: '#065f46', fontWeight: '600', fontSize: 14 },
  featuresGrid: { justifyContent: 'space-between', gap: 20 },
  featureCard: {
    padding: 20,
    borderRadius: 20,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
  featureIcon: { fontSize: 36, marginBottom: 12 },
  featureTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6, color: '#525458', flexWrap: 'wrap' },
  featureDescription: { fontSize: 14, color: '#374151', lineHeight: 20 },
});
