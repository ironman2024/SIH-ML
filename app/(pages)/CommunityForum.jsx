import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';

const post = {
  id: '1',
  title: 'Panama Disease Cure',
  description:
    'Hey everyone, my banana plantation has been hit by Panama disease. Has anyone successfully treated their crops? I’m looking for solutions that don’t involve destroying my entire plantation.',
  imageUrl: 'https://example.com/banana-disease.jpg',
  comments: [
    {
      id: '1',
      name: 'Mukund Patil',
      text: 'Sorry to hear that! I faced a similar problem last year. Unfortunately, there’s no true cure once Panama disease hits, but I’ve heard some researchers are working on resistant banana varieties. Anyone else know about this?',
    },
    {
      id: '2',
      name: 'Sumit Dodke',
      text: 'You’re right, Sumit Dodke. There’s no permanent cure yet, but using resistant varieties like "Cavendish" or "Gros Michel" can help. Also, improving soil drainage and rotating crops can slow the spread of the disease. Have you tried any preventative measures?',
    },
  ],
};

const CommunityForum = () => {
  const [contributionModalVisible, setContributionModalVisible] = useState(false);
  const [contributionText, setContributionText] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('Siddhesh Anokar'); // Default name

  const [comments, setComments] = useState(post.comments); // State for comments

  const handleContribute = () => {
    setContributionModalVisible(true);
  };

  const handleSubmitContribution = () => {
    if (contributionText.trim()) {
      const newComment = {
        id: (comments.length + 1).toString(),
        name,
        text: contributionText,
      };
      setComments([...comments, newComment]); // Add new comment to state
      setContributionModalVisible(false);
      setContributionText('');
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentName}>{item.name}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{post.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription}>{post.description}</Text>

        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
        />
      </ScrollView>

      <TouchableOpacity style={styles.contributeButton} onPress={handleContribute}>
        <Text style={styles.contributeButtonText}>Contribute</Text>
      </TouchableOpacity>

      <Modal
        visible={contributionModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setContributionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Contribution</Text>
              <TouchableOpacity onPress={() => setContributionModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <Pressable style={styles.inputRow} onPress={() => console.log('Select Location')}>
              <Text style={styles.inputLabel}>Location</Text>
              <Text style={styles.inputText}>{location || 'Select Location'}</Text>
            </Pressable>

            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.inputText}
                value={name}
                onChangeText={setName}
                editable
              />
            </View>

            <View style={styles.textAreaContainer}>
              <Text style={styles.inputLabel}>Your Thoughts</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Write your contribution..."
                value={contributionText}
                onChangeText={setContributionText}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.modalContributeButton} onPress={handleSubmitContribution}>
              <Text style={styles.modalContributeButtonText}>Contribute</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  contributeButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contributeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  inputLabel: {
    fontSize: 16,
    color: '#757575',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginLeft: 10,
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    height: 100,
    marginTop: 5,
  },
  modalContributeButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  modalContributeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommunityForum;