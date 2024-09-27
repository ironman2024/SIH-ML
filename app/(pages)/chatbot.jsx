import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: 'Hello, Farmer! 👩‍🌾👨‍🌾\nI’m your virtual assistant, here to help you keep your crops and animals healthy. 🌾🌿\nWhether you’re worried about strange spots on your plants or your livestock showing unusual signs, I can assist in diagnosing potential diseases.',
          isBot: true }
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isBot: false }]);
      setInput('');
      Keyboard.dismiss(); // Dismiss keyboard

      // Simulate bot response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { text: 'Thank you for your message! I’ll look into that.', isBot: true }
        ]);
      }, 1500); // Simulated delay for bot response
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        style={styles.messageContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ref={scrollViewRef}
      >
        {messages.map((message, index) => (
          <View key={index} style={[styles.messageBubble, message.isBot ? styles.botMessage : styles.userMessage]}>
            <Text style={[styles.messageText, message.isBot ? styles.botMessageText : styles.userMessageText]}>
              {message.text}
            </Text>
          </View>
        ))}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Typing</Text>
            <View style={styles.dotContainer}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend} // Allow sending with keyboard return
          accessibilityLabel="Chat input"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton} accessibilityLabel="Send message">
          <MaterialIcons name={input ? "send" : "mic"} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: Dimensions.get('window').width * 0.75,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  botMessage: {
    backgroundColor: '#D0EAD0',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  botMessageText: {
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  typingText: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 5,
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginHorizontal: 2,
  },
});

export default Chatbot;
