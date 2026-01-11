import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function LandingPage() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Navigation */}
          <View style={styles.nav}>
            <View style={styles.navLeft}>
              <Text style={styles.logo}>📚 StudyPal</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/registration')}
              style={styles.getStartedBtn}
            >
              <Text style={styles.getStartedBtnText}>Get Started</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Section */}
          <View style={styles.hero}>
            {/* Badge */}
            <View style={styles.badge}>
              <View style={styles.badgeNew}>
                <Text style={styles.badgeNewText}>New</Text>
              </View>
              <Text style={styles.badgeText}>
                Peer-to-peer learning platform for students
              </Text>
              <Text style={styles.badgeArrow}>→</Text>
            </View>

            {/* Main Heading */}
            <Text style={styles.heading}>
              Learn from peers,{'\n'}
              <Text style={styles.headingHighlight}>teach what you know</Text>
            </Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Connect with students who need help in subjects you excel at,
              and find tutors for topics you're learning
            </Text>

            {/* CTA Button */}
            <View style={styles.ctaContainer}>
              <TouchableOpacity
                onPress={() => router.push('/registration')}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>Start Learning</Text>
              </TouchableOpacity>
            </View>

            {/* Stats Section */}
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1000+</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Tutors</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>10K+</Text>
                <Text style={styles.statLabel}>Sessions</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  navLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  getStartedBtn: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  getStartedBtnText: { color: '#667eea', fontSize: 16, fontWeight: 'bold' },

  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    minHeight: 600,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 40,
    gap: 10,
  },
  badgeNew: { backgroundColor: '#FF6B6B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },
  badgeNewText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  badgeText: { color: 'white', fontSize: 14 },
  badgeArrow: { color: 'white', fontSize: 18 },

  heading: { fontSize: 48, fontWeight: '800', color: 'white', textAlign: 'center', marginBottom: 20, lineHeight: 58 },
  headingHighlight: { color: '#FFD93D' },
  subtitle: { fontSize: 18, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 50, lineHeight: 26, maxWidth: 600 },

  ctaContainer: { flexDirection: 'row', gap: 20, marginBottom: 80 },
  primaryBtn: { paddingHorizontal: 45, paddingVertical: 18, backgroundColor: 'white', borderRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 10 },
  primaryBtnText: { color: '#667eea', fontSize: 18, fontWeight: 'bold' },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around', // <-- evenly distribute items
    alignItems: 'center',
    paddingVertical: 30,
    width: '100%', // <-- ensures stats fit screen width
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 36, fontWeight: 'bold', color: 'white' },
  statLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
});

