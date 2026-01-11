import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { storage } from '@/services/storage';

export default function Registration() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleContinue = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setError('');
    await storage.setTempUser({ name });
    router.push('/subjects');
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button moves naturally with content */}
          <TouchableOpacity
            onPress={() => router.push('/landing-page')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>

          <View style={styles.centerWrapper}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📚</Text>
              </View>

              <Text style={styles.heading}>Welcome to StudyPal</Text>
              <Text style={styles.subtitle}>
                Connect with peers to learn and teach together
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>What's your name?</Text>

                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (error) setError('');
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleContinue}
                />

                {error ? (
                  <Text style={styles.errorText}>⚠️ {error}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                onPress={handleContinue}
                style={styles.continueButton}
              >
                <Text style={styles.continueButtonText}>
                  Continue to Subject Selection
                </Text>
              </TouchableOpacity>

              <Text style={styles.infoText}>
                By continuing, you'll be able to select subjects you want to
                learn or teach
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },

  backButton: {
    marginBottom: 20, // space above the card
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    width: '100%',
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 8,
  },

  iconContainer: {
    width: 72,
    height: 72,
    marginBottom: 24,
    alignSelf: 'center',
    backgroundColor: '#667eea',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },

  icon: {
    fontSize: 36,
  },

  heading: {
    fontSize: 30,
    marginBottom: 8,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1a1a1a',
  },

  subtitle: {
    color: '#666',
    marginBottom: 28,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 10,
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },

  input: {
    width: '100%',
    padding: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
    color: '#1a1a1a',
  },

  inputError: {
    borderColor: '#e53935',
  },

  errorText: {
    marginTop: 6,
    color: '#e53935',
    fontSize: 13,
  },

  continueButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#667eea',
    borderRadius: 12,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    marginTop: 10,
  },

  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  infoText: {
    marginTop: 18,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});
