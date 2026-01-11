import { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; name: string };
}

export default function ChatWindow() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [otherUserName, setOtherUserName] = useState('');
  const [isNewChat, setIsNewChat] = useState(false);
  const [pendingChat, setPendingChat] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const storedUser = await storage.getUser();
      if (!storedUser) {
        router.replace('/landing-page');
        return;
      }
      setUser(storedUser);

      if (chatId === 'new') {
        const pending = await storage.getPendingChat();
        if (!pending) {
          router.push('/tutors');
          return;
        }
        setPendingChat(pending);
        setOtherUserName(pending.tutorName);
        setIsNewChat(true);
        setLoading(false);
      } else {
        fetchMessages();
        fetchChatDetails(storedUser);
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
      }
    };
    loadData();
  }, [chatId]);

  useEffect(() => {
    if (messages.length > 0 && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const fetchChatDetails = async (storedUser: any) => {
    try {
      const allChats = await api(`/chats/${storedUser.id}`);
      const currentChat = allChats.find((c: any) => c.id === chatId);

      if (currentChat) {
        const otherUser =
          storedUser.id === currentChat.learner.id
            ? currentChat.tutor
            : currentChat.learner;
        setOtherUserName(otherUser.name);
      }
    } catch (error) {
      console.error('Error fetching chat details:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await api(`/chats/${chatId}/messages`);
      setMessages(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      if (isNewChat && pendingChat) {
        const newChat = await api('/chats', {
          method: 'POST',
          body: {
            learnerId: pendingChat.learnerId,
            tutorId: pendingChat.tutorId,
            subject: pendingChat.subject,
          },
        });

        await api(`/chats/${newChat.id}/messages`, {
          method: 'POST',
          body: {
            senderId: user.id,
            content: newMessage,
          },
        });

        await storage.removeItem('pendingChat');
        router.replace(`/chat/${newChat.id}`);
      } else {
        const message = await api(`/chats/${chatId}/messages`, {
          method: 'POST',
          body: {
            senderId: user.id,
            content: newMessage,
          },
        });
        setMessages([...messages, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading chat...</Text>
      </View>
    );
  }

  return (
    // 🔵 OUTSIDE BACKGROUND
    <View style={[styles.container, { backgroundColor: '#667eea' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.chatContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.push('/dashboard')}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Dashboard</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {otherUserName || 'Chat'}
            </Text>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((message) => {
              const isMe = message.sender.id === user.id;
              return (
                <View
                  key={message.id}
                  style={[
                    styles.messageWrapper,
                    isMe && styles.messageWrapperMe,
                  ]}
                >
                  <View
                    style={[
                      styles.messageBubble,
                      isMe
                        ? styles.messageBubbleMe
                        : styles.messageBubbleOther,
                    ]}
                  >
                    {!isMe && (
                      <Text style={styles.messageSender}>
                        {message.sender.name}
                      </Text>
                    )}
                    <Text style={styles.messageText}>
                      {message.content}
                    </Text>
                    <Text style={styles.messageTime}>
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              multiline
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.sendButton}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
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
  },

  loadingText: {
    fontSize: 16,
    color: '#fff',
  },

  keyboardAvoid: {
    flex: 1,
  },

  // ⚪ CHAT BOX
  chatContainer: {
    flex: 1,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 20,
    marginTop: 40,
    marginBottom:40,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#667eea',
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  backButtonText: {
    color: '#667eea',
    fontWeight: 'bold',
    fontSize: 14,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },

  messagesContainer: {
    flex: 1,
  },

  messagesContent: {
    padding: 20,
    gap: 12,
  },

  messageWrapper: {
    alignItems: 'flex-start',
  },

  messageWrapperMe: {
    alignItems: 'flex-end',
  },

  messageBubble: {
    maxWidth: '70%',
    padding: 14,
    borderRadius: 20,
  },

  messageBubbleMe: {
    backgroundColor: '#667eea',
  },

  messageBubbleOther: {
    backgroundColor: '#f3f4f6',
  },

  messageSender: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },

  messageText: {
    fontSize: 18,
    color: '#e7e5e5ff',
    marginBottom: 5,
  },

  messageTime: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'right',
    color:'#d7ceceff'
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 10,
    alignItems: 'flex-end',
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#000',
    maxHeight: 100,
  },

  sendButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    backgroundColor: '#667eea',
  },

  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
