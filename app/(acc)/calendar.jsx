import { useUser } from '@clerk/clerk-expo';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = { ...items };
      const strTime = timeToString(day.timestamp);
      if (!newItems[strTime]) {
        newItems[strTime] = [];
      }
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  const addEvent = () => {
    if (!eventName || !selectedDate) return;

    const newItems = { ...items };
    if (!newItems[selectedDate]) {
      newItems[selectedDate] = [];
    }
    // Add the new event
    newItems[selectedDate].push({ name: eventName });
    
    // Update the items state
    setItems(newItems);
    setEventName('');  // Clear the input field
    setModalVisible(false); // Close the modal
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={new Date().toISOString().split('T')[0]}
          renderItem={renderItem}
          onDayPress={(day) => openModal(day.dateString)} // Open modal on date press
          theme={{
            selectedDayBackgroundColor: '#4CAF50',
            agendaKnobColor: '#4CAF50',
            dotColor: '#4CAF50',
            todayTextColor: '#4CAF50',
          }}
          style={styles.agenda}
        />

        {/* Modal for adding new events */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.centeredView}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add New Event</Text>
              <TextInput
                placeholder="Event Name"
                value={eventName}
                onChangeText={setEventName}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={addEvent} // Call addEvent on button press
              >
                <Text style={styles.buttonText}>Add Event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </>
    </SafeAreaView>
  );
};

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const styles = StyleSheet.create({
  agenda: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginRight: 10,
    marginTop: 17,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: width * 0.85,  // Modal takes 85% of screen width
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CalendarScreen;