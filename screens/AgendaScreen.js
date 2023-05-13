import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';

const AgendaScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayPress = (date) => {
    setSelectedDate(date.dateString);
    setSelectedDay(date.dateString);
  };

  const addEvent = () => {
    if (selectedDate !== '') {
      const newEvent = {
        date: selectedDate,
        time: startTime,
        endTime: endTime,
        clientName: clientName,
        service: service,
      };
      setEvents([...events, newEvent]);
      setClientName('');
      setService('');
      setStartTime('');
      setEndTime('');
    }
  };

  const removeEvent = (event) => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
  };

  const renderEvents = () => {
    const filteredEvents = events.filter(
      (event) => event.date === selectedDate
    );

    if (filteredEvents.length === 0) {
      return (
        <View style={styles.emptyEventsContainer}>
          <Text style={styles.emptyEventsText}>
            No hay citas para {'\n'} la fecha seleccionada
          </Text>
        </View>
      );
    } else {
      return filteredEvents.map((event, index) => (
        <TouchableOpacity
          key={index}
          style={styles.eventContainer}
          onPress={() => removeEvent(event)}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventText}>
              {event.time} - {event.endTime}
            </Text>
            <Text style={styles.eventText}>{event.clientName}</Text>
            <Text style={styles.eventText}>{event.service}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeEvent(event)}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ));
    }
  };

  const getMarkedDates = () => {
    const markedDates = {};
    events.forEach((event) => {
      markedDates[event.date] = { marked: true };
    });
    if (selectedDay !== '') {
      markedDates[selectedDay] = {
        ...markedDates[selectedDay],
        selected: true,
      };
    }
    return markedDates;
  };

  const renderDay = (date, item) => {
    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dayText}>{date.day}</Text>
        {item.marked && <View style={styles.dot} />}
      </View>
    );
  };

  const saveEvents = async () => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadStoredEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents !== null) {
          setEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadStoredEvents();
  }, []);

  useEffect(() => {
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem('events', JSON.stringify(events));
      } catch (error) {
        console.log(error);
      }
    };

    saveEvents();
  }, [events]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <LinearGradient
        colors={['#8e44ad', '#c0392b']}
        style={styles.gradientContainer}>
        <Text style={styles.title}>Agenda</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Calendar
            onDayPress={handleDayPress}
            style={styles.calendar}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: '#fff',
              selectedDayBackgroundColor: 'rgba(255, 255, 255, 0.5)',
              selectedDayTextColor: '#fff',
              todayTextColor: '#fff',
              dayTextColor: '#fff',
              textDisabledColor: 'rgba(255, 255, 255, 0.5)',
              arrowColor: '#fff',
              monthTextColor: '#fff',
              indicatorColor: '#fff',
              selectedDotColor: '#fff',
            }}
            markedDates={getMarkedDates()}
          />
          <View style={styles.eventsContainer}>{renderEvents()}</View>
          <View style={styles.addEventContainer}>
            <TextInput
              placeholder="Nombre Cliente"
              placeholderTextColor="#8e44ad"
              style={styles.input}
              onChangeText={(text) => setClientName(text)}
              value={clientName}
            />
            <TextInput
              placeholder="Servicio"
              placeholderTextColor="#8e44ad"
              style={styles.input}
              onChangeText={(text) => setService(text)}
              value={service}
            />
            <TextInput
              placeholder="Hora inicio"
              placeholderTextColor="#8e44ad"
              style={styles.input}
              onChangeText={(text) => setStartTime(text)}
              value={startTime}
            />
            <TextInput
              placeholder="Hora fin"
              placeholderTextColor="#8e44ad"
              style={styles.input}
              onChangeText={(text) => setEndTime(text)}
              value={endTime}
            />
            <TouchableOpacity style={styles.addButton} onPress={addEvent}>
              <Text style={styles.addButtonLabel}>Añadir cita</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    marginTop: '20%',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  calendar: {
    marginTop: 20,
    marginBottom: 10,
  },
  eventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  eventContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
  },
  eventText: {
    fontSize: 18,
    color: '#8e44ad',
    fontWeight: 'bold',
  },
  emptyEventsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  emptyEventsText: {
    fontSize: 18,
    color: '#8e44ad',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addEventContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 250,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Solo para Android
  },
  addButton: {
    backgroundColor: '#8e44ad',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  addButtonLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayText: {
    fontSize: 18,
    color: '#fff',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8e44ad',
    marginTop: 2,
  },
});

export default AgendaScreen;
