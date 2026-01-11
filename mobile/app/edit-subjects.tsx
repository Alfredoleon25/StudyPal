// import { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import { api } from '@/services/api';
// import { storage } from '@/services/storage';

// const SUBJECTS = [
//   { name: 'Calculus', icon: '∫' },
//   { name: 'Physics', icon: '⚛️' },
//   { name: 'Programming', icon: '💻' },
//   { name: 'Chemistry', icon: '🧪' },
//   { name: 'Biology', icon: '🧬' },
//   { name: 'Statistics', icon: '📊' },
//   { name: 'Linear Algebra', icon: '📐' },
//   { name: 'Engineering', icon: '🏗️' },
//   { name: 'Economics', icon: '📈' },
//   { name: 'Psychology', icon: '🧠' },
// ];

// export default function EditSubjects() {
//   const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
//   const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const loadUser = async () => {
//       const storedUser = await storage.getUser();
//       if (!storedUser) {
//         router.replace('/landing-page');
//         return;
//       }
//       setUser(storedUser);
//       setLearnSubjects(storedUser.learnSubjects || []);
//       setTeachSubjects(storedUser.teachSubjects || []);
//     };
//     loadUser();
//   }, []);

//   const toggleLearnSubject = (subject: string) => {
//     setLearnSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//     setTeachSubjects((prev) => prev.filter((s) => s !== subject));
//   };

//   const toggleTeachSubject = (subject: string) => {
//     setTeachSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((s) => s !== subject)
//         : [...prev, subject]
//     );
//     setLearnSubjects((prev) => prev.filter((s) => s !== subject));
//   };

//   const updateSubjects = async () => {
//     if (learnSubjects.length === 0 && teachSubjects.length === 0) {
//       Alert.alert('Error', 'Select at least one subject to learn or teach');
//       return;
//     }

//     setLoading(true);

//     try {
//       const updatedUser = await api(`/users/${user.id}`, {
//         method: 'PATCH',
//         body: { learnSubjects, teachSubjects },
//       });

//       await storage.setUser(updatedUser);
//       router.replace('/dashboard');
//     } catch (error: any) {
//       console.error('Error updating subjects:', error);
//       Alert.alert('Error', error.message || 'Failed to update subjects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <Text style={styles.heading}>Edit Your Subjects</Text>

//         {/* Column Headers */}
//         <View style={styles.headerRow}>
//           <Text style={styles.columnHeader}>Learn</Text>
//           <Text style={styles.columnHeader}>Subject</Text>
//           <Text style={styles.columnHeader}>Teach</Text>
//         </View>

//         {/* Subject Rows */}
//         {SUBJECTS.map((s) => {
//           const learnActive = learnSubjects.includes(s.name);
//           const teachActive = teachSubjects.includes(s.name);

//           return (
//             <View key={s.name} style={styles.compareRow}>
//               {/* Learn Column */}
//               <TouchableOpacity
//                 onPress={() => toggleLearnSubject(s.name)}
//                 style={[styles.choiceBox, learnActive && styles.learnActive]}
//                 activeOpacity={0.8}
//               >
//                 <Text style={styles.choiceText}>{learnActive ? '✓' : ''}</Text>
//               </TouchableOpacity>

//               {/* Subject Name */}
//               <View style={styles.subjectCenter}>
//                 <Text style={styles.subjectIcon}>{s.icon}</Text>
//                 <Text style={styles.subjectName}>{s.name}</Text>
//               </View>

//               {/* Teach Column */}
//               <TouchableOpacity
//                 onPress={() => toggleTeachSubject(s.name)}
//                 style={[styles.choiceBox, teachActive && styles.teachActive]}
//                 activeOpacity={0.8}
//               >
//                 <Text style={styles.choiceText}>{teachActive ? '✓' : ''}</Text>
//               </TouchableOpacity>
//             </View>
//           );
//         })}

//         {/* Action Buttons */}
//         <View style={styles.actions}>
//           <TouchableOpacity
//             onPress={() => router.back()}
//             disabled={loading}
//             style={[styles.backButton, loading && styles.buttonDisabled]}
//           >
//             <Text style={styles.backButtonText}>Back</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={updateSubjects}
//             disabled={loading}
//             style={[styles.saveButton, loading && styles.buttonDisabled]}
//           >
//             {loading ? (
//               <ActivityIndicator color="black" />
//             ) : (
//               <Text style={styles.saveButtonText}>Save Changes</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   loadingText: { fontSize: 18, color: '#666' },
//   scrollContent: { padding: 30, paddingBottom: 60 },
//   heading: { marginBottom: 30, color: 'white', textAlign: 'center', fontSize: 32, fontWeight: 'bold' },

//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     paddingHorizontal: 10,
//   },
//   columnHeader: {
//     width: 80,
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },

//   compareRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     paddingVertical: 14,
//     paddingHorizontal: 10,
//     borderRadius: 14,
//     marginBottom: 10,
//   },

//   choiceBox: {
//     width: 60,
//     height: 40,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   learnActive: {
//     backgroundColor: '#e3f2fd',
//     borderColor: '#2196F3',
//   },
//   teachActive: {
//     backgroundColor: '#e8f5e9',
//     borderColor: '#4CAF50',
//   },
//   choiceText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//   },

//   subjectCenter: {
//     flex: 1,
//     alignItems: 'center',
//     gap: 4,
//   },
//   subjectIcon: { fontSize: 22 },
//   subjectName: { fontSize: 16, fontWeight: '600', color: '#000', textAlign: 'center' },

//   actions: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 20 },
//   backButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//     minWidth: 100,
//   },
//   backButtonText: { fontWeight: '600', fontSize: 16, color: 'black', textAlign: 'center' },
//   saveButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 48,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     minWidth: 200,
//     shadowColor: '#4CAF50',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   saveButtonText: { color: 'black', fontWeight: 'bold', fontSize: 16 },
//   buttonDisabled: { opacity: 0.6 },
// });


import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

const SUBJECTS = [
  { name: 'Calculus', icon: '∫' },
  { name: 'Physics', icon: '⚛️' },
  { name: 'Programming', icon: '💻' },
  { name: 'Chemistry', icon: '🧪' },
  { name: 'Biology', icon: '🧬' },
  { name: 'Statistics', icon: '📊' },
  { name: 'Linear Algebra', icon: '📐' },
  { name: 'Engineering', icon: '🏗️' },
  { name: 'Economics', icon: '📈' },
  { name: 'Psychology', icon: '🧠' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOX_WIDTH = (SCREEN_WIDTH - 100) / 2; // Two columns with gap
const BOX_HEIGHT = 60;

export default function EditSubjects() {
  const [learnSubjects, setLearnSubjects] = useState<string[]>([]);
  const [teachSubjects, setTeachSubjects] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await storage.getUser();
      if (!storedUser) {
        router.replace('/landing-page');
        return;
      }
      setUser(storedUser);
      setLearnSubjects(storedUser.learnSubjects || []);
      setTeachSubjects(storedUser.teachSubjects || []);
    };
    loadUser();
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

  const updateSubjects = async () => {
    if (learnSubjects.length === 0 && teachSubjects.length === 0) {
      Alert.alert('Error', 'Select at least one subject to learn or teach');
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await api(`/users/${user.id}`, {
        method: 'PATCH',
        body: { learnSubjects, teachSubjects },
      });
      await storage.setUser(updatedUser);
      router.replace('/dashboard');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update subjects');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Edit your subjects</Text>

        <View style={styles.grid}>
          {/* LEARN COLUMN */}
          <View style={styles.column}>
            <Text style={styles.columnTitle}>📚 Learn</Text>
            <View style={styles.rowWrap}>
              {SUBJECTS.map((s) => {
                const active = learnSubjects.includes(s.name);
                return (
                  <TouchableOpacity
                    key={`learn-${s.name}`}
                    onPress={() => toggleLearnSubject(s.name)}
                    style={[styles.subjectCard, active && styles.subjectCardActive]}
                  >
                    <Text style={styles.subjectIcon}>{s.icon}</Text>
                    <Text style={styles.subjectName}>{s.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* TEACH COLUMN */}
          <View style={styles.column}>
            <Text style={[styles.columnTitle, styles.columnTitleTeach]}>👨‍🏫 Teach</Text>
            <View style={styles.rowWrap}>
              {SUBJECTS.map((s) => {
                const active = teachSubjects.includes(s.name);
                return (
                  <TouchableOpacity
                    key={`teach-${s.name}`}
                    onPress={() => toggleTeachSubject(s.name)}
                    style={[styles.subjectCard, styles.subjectCardTeach, active && styles.subjectCardTeachActive]}
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
            onPress={updateSubjects}
            style={[styles.continueButton, loading && styles.buttonDisabled]}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="black" /> : <Text style={styles.continueButtonText}>Save Changes</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 30, paddingBottom: 80 },
  heading: { textAlign: 'center', fontSize: 36, fontWeight: '800', color: 'white', marginBottom: 40,marginTop:20, },
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
