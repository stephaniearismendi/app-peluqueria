import * as React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NativeBaseProvider, Box, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
1;

const ClientsScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const idCounter = React.useRef(10); // Contador para generar IDs únicos

  React.useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('clientData');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
          setFilteredData(parsedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadStoredData();
  }, []);

  React.useEffect(() => {
    const filteredClients = data.filter((client) =>
      client.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filteredClients);
  }, [data, searchText]);

  const addNewClient = (
    nombre,
    telefono,
    direccion,
    correo,
    birth,
    diseases,
    skin,
    treatments,
    cosmetics,
    results
  ) => {
    const newClient = {
      id: idCounter.current++,
      nombre: nombre,
      movil: telefono,
      direccion: direccion,
      correo: correo,
      birth: birth,
      diseases: diseases,
      skin: skin,
      treatments: treatments,
      cosmetics: cosmetics,
      results: results,
      services: [],
    };
    const updatedData = [...data, newClient];
    setData(updatedData);
    setFilteredData(updatedData);
    saveData(updatedData);
  };

  const addServiceToClient = (service, id_person) => {
    const updatedData = data.map((client) => {
      if (client.id === id_person) {
        return {
          ...client,
          services: [...client.services, service],
        };
      }
      return client;
    });

    setData(updatedData);
    setFilteredData(updatedData);
    saveData(updatedData);
  };

  const deleteServiceFromClient = (serviceId, clientId) => {
    const updatedData = data.map((client) => {
      if (client.id === clientId) {
        const updatedServices = client.services.filter(
          (service) => service.id !== serviceId
        );
        return {
          ...client,
          services: updatedServices,
        };
      }
      return client;
    });

    setData(updatedData);
    setFilteredData(updatedData);
    saveData(updatedData);
  };

  const saveData = React.useCallback(async (data) => {
    try {
      await AsyncStorage.setItem('clientData', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteClient = (client) => {
    const updatedData = data.filter((item) => item.id !== client.id);
    setData(updatedData);
    setFilteredData(updatedData);
    saveData(updatedData);
  };

  return (
    <LinearGradient colors={['#8e44ad', '#c0392b']} style={styles.gradient}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddClientScreen', { addNewClient })
          }
          style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar Cliente</Text>
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <Input
            placeholder="Buscar"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchBar}
            variant="filled"
            InputRightElement={
              <Icon
                as={<Ionicons name="search" />}
                size={6}
                m={2}
                color="gray.400"
              />
            }
          />
        </View>
        <View style={styles.clientsContainer}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.clientCard}
              onPress={() =>
                navigation.navigate('ClientDetailsScreen', {
                  item: item,
                  deleteClient: deleteClient,
                  addServiceToClient: addServiceToClient,
                  deleteServiceFromClient: deleteServiceFromClient,
                })
              }>
              <Text style={styles.clientName}>{item.nombre}</Text>
              <Text style={styles.clientPhone}>{item.movil}</Text>
              <Text style={styles.clientEmail}>{item.correo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    marginTop: '10%',
  },
  searchBarContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 15,
  },
  clientsContainer: {
    marginBottom: 20,
  },
  clientCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clientEmail: {
    fontSize: 14,
    color: '#888',
  },
  clientPhone: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 30,
    width: '100%',
    marginBottom: 30,
    marginTop: 40,
  },
  addButtonText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});

const ClientScreen = () => {
  return (
    <NativeBaseProvider>
      <ClientsScreen />
    </NativeBaseProvider>
  );
};

export default ClientScreen;
