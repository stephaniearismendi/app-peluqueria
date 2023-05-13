import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  NativeBaseProvider,
  Button,
  View,
  ScrollView,
  Checkbox,
  Input,
  Switch,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const ClientDetailsScreen = () => {
  const route = useRoute();
  const idCounter = React.useRef(1); // Contador para generar IDs únicos
  const { item, deleteClient, addServiceToClient, deleteServiceFromClient } =
    route.params;
  const navigation = useNavigation();
  const [nameTreatment, setNameTreatment] = useState('');
  const [descriptionTreatment, setdescriptionTreatment] = useState('');
  const [priceTreatment, setpriceTreatment] = useState('');
  const [payedTreatment, setpayedTreatment] = useState('');
  const [services, setServices] = useState(item.services);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [totalPendiente, setTotalPendiente] = useState(0);

  useEffect(() => {
    const calculateTotalPendiente = () => {
      const serviciosNoPagados = services.filter((service) => !service.payed);
      const total = serviciosNoPagados.reduce(
        (acc, service) => acc + parseInt(service.price, 10), // Convertir a número entero
        0
      );
      const formattedTotal = total.toFixed(2); // Formatear el total con 2 decimales
      setTotalPendiente(formattedTotal);
    };

    calculateTotalPendiente();
  }, [services]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    date: '',
    price: '',
  });

  useEffect(() => {
    setServices(item.services);
  }, [item.services]);

  const handleDelete = () => {
    if (deleteClient) {
      deleteClient(item);
      navigation.goBack();
    }
  };

  const handleAddService = () => {
    const currentDate = new Date().toLocaleDateString();
    if (addServiceToClient) {
      const newServiceData = {
        id: idCounter.current++, // Incrementar el contador de ID antes de asignarlo
        name: nameTreatment,
        description: descriptionTreatment,
        date: currentDate,
        price: priceTreatment,
        payed: payedTreatment,
      };
      addServiceToClient(newServiceData, item.id);
      setServices((prevServices) => [...prevServices, newServiceData]);
      setNameTreatment('');
      setdescriptionTreatment('');
      setpriceTreatment('');
      setpayedTreatment(false);
    }
  };

  const handleDeleteService = (serviceId) => {
    if (deleteServiceFromClient) {
      deleteServiceFromClient(serviceId, item.id);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
    }
  };

  const handleServicePayedChange = (serviceId, isChecked) => {
    const updatedServices = services.map((service) => {
      if (service.id === serviceId) {
        return {
          ...service,
          payed: isChecked,
        };
      }
      return service;
    });

    const updatedItem = {
      ...item,
      services: updatedServices,
    };

    setServices(updatedServices);
    if (addServiceToClient) {
      addServiceToClient(updatedItem, item.id);
    }
  };

  return (
    <NativeBaseProvider>
      <LinearGradient
        colors={['#8e44ad', '#c0392b']}
        style={{ flex: 1, alignItems: 'center' }}>
        <View flex={1} width="100%" marginTop={15}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
            {/* Información del cliente */}
            <Box
              mt={16}
              bg="rgba(255, 255, 255, 0.8)"
              borderRadius={8}
              p={6}
              alignItems="center"
              width="80%">
              <Text fontSize={32} fontWeight="bold" color="#8e44ad" mb={4}>
                {item.nombre}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="pin-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  DIRECCIÓN
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.direccion}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  MÓVIL
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.movil}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  EMAIL
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.correo}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  CUMPLEAÑOS
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.birth}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="medkit-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  ENFERMEDADES
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.diseases}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="people-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  TIPO DE PIEL
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.skin}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="clipboard-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  TRATAMIENTOS
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.treatments}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="color-palette-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  COSMÉTICOS
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.cosmetics}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Ionicons
                  name="document-text-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />
                <Text
                  fontWeight="bold"
                  style={{ fontSize: 18, color: '#8e44ad' }}>
                  RESULTADOS
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 3,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#8e44ad',
                    textAlign: 'center',
                  }}>
                  {item.results}
                </Text>
              </View>

              <Button
                onPress={handleDelete}
                bg="#f2f3f4"
                _hover={{ bg: '#e1e2e3' }}
                mt={4}
                px={4}
                py={2}
                borderRadius={8}
                _pressed={{ opacity: 0.8 }}>
                <Text fontSize={16} fontWeight="bold" color="#8e44ad">
                  Borrar Cliente
                </Text>
              </Button>
            </Box>

            {/* Servicios contratados */}
            <Box
              mt={16}
              bg="rgba(255, 255, 255, 0.8)"
              borderRadius={8}
              p={6}
              alignItems="center"
              width="80%"
              marginBottom={15}>
              <Box
                mt={15}
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius={8}
                p={6}
                alignItems="center"
                width="100%"
                marginBottom={15}>
                <Ionicons
                  name="bonfire-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ alignItems: 'center' }}
                />
                <Text
                  fontSize={18}
                  color="#8e44ad"
                  marginBottom={5}
                  style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  SERVICIOS CONTRATADOS
                </Text>

                {services.length > 0 ? (
                  <>
                    {services.map((service) => (
                      <React.Fragment key={service.id}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3,
                          }}>
                          <Ionicons
                            name="caret-forward-outline"
                            size={18}
                            color="#8e44ad"
                            style={{ marginRight: 8 }}
                          />
                          <Text
                            fontWeight="bold"
                            style={{ fontSize: 18, color: '#8e44ad' }}>
                            SERVICIO
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 3,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#8e44ad',
                              textAlign: 'center',
                            }}>
                            {service.name}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3,
                          }}>
                          <Ionicons
                            name="create-outline"
                            size={18}
                            color="#8e44ad"
                            style={{ marginRight: 8 }}
                          />
                          <Text
                            fontWeight="bold"
                            style={{ fontSize: 18, color: '#8e44ad' }}>
                            DESCRIPCIÓN
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 3,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#8e44ad',
                              textAlign: 'center',
                            }}>
                            {service.description}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3,
                          }}>
                          <Ionicons
                            name="time-outline"
                            size={18}
                            color="#8e44ad"
                            style={{ marginRight: 8 }}
                          />
                          <Text
                            fontWeight="bold"
                            style={{ fontSize: 18, color: '#8e44ad' }}>
                            FECHA
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 3,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#8e44ad',
                              textAlign: 'center',
                            }}>
                            {service.date}
                          </Text>
                        </View>

                        <Box
                          key={service.id}
                          flexDirection="row"
                          alignItems="center"
                          width="100%">
                          <Ionicons
                            name="cash-outline"
                            size={18}
                            color="#8e44ad"
                            style={{ marginRight: 14 }}
                          />
                          <Text
                            fontWeight="bold"
                            mr={3}
                            mt={4}
                            style={{ fontSize: 18, color: '#8e44ad' }}>
                            PRECIO: {service.price}€
                          </Text>
                          <Checkbox
                            isChecked={service.payed}
                            onChange={(isChecked) =>
                              handleServicePayedChange(service.id, isChecked)
                            }
                            colorScheme="purple"
                            marginLeft="auto"
                          />
                        </Box>
                        <IconButton
                          icon="delete"
                          color="#8e44ad"
                          size={30}
                          onPress={() => handleDeleteService(service.id)}
                          style={{ marginTop: 16 }}
                        />
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    bg="rgba(255, 255, 255, 0.35)"
                    mt={16}
                    borderRadius={8}
                    p={6}
                    marginTop={2}
                    width="100%">
                    <Ionicons
                      name="information-circle-outline"
                      size={18}
                      color="#8e44ad"
                      style={{ marginRight: 8 }}
                    />
                    <Text fontSize={18} color="#8e44ad">
                      Aún no hay servicios contratados.
                    </Text>
                  </Box>
                )}
              </Box>

              <Box
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius={8}
                p={2}
                mt={2}
                padding={5}
                marginTop={5}>
                <Text
                  fontSize={18}
                  color="#8e44ad"
                  style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  Total pendiente: {totalPendiente}€
                </Text>
              </Box>

              <Box
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius={8}
                p={2}
                mt={2}
                padding={5}
                marginTop={5}>
                <Ionicons
                  name="add-circle-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginRight: 8 }}
                />

                <Text
                  fontSize={18}
                  fontWeight="bold"
                  color="#8e44ad"
                  onPress={() => setShowServiceForm(true)}>
                  Añadir Servicio
                </Text>
              </Box>
            </Box>

            {/* Renderizar el formulario para añadir un nuevo servicio si showServiceForm es verdadero */}
            {showServiceForm && (
              <Box
                mt={16}
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius={8}
                p={6}
                alignItems="center"
                width="80%"
                marginBottom={15}>
                <Ionicons
                  name="create-outline"
                  size={18}
                  color="#8e44ad"
                  style={{ marginBottom: 8 }}
                />
                <Text fontSize={18} color="#8e44ad" marginBottom={5}>
                  Añadir nuevo servicio
                </Text>
                <Input
                  placeholder="Nombre del servicio"
                  value={nameTreatment}
                  onChangeText={(text) => setNameTreatment(text)}
                  marginBottom={3}
                />
                <Input
                  placeholder="Descripción del servicio"
                  value={descriptionTreatment}
                  onChangeText={(text) => setdescriptionTreatment(text)}
                  marginBottom={3}
                />
                <Input
                  placeholder="Precio del servicio"
                  value={priceTreatment}
                  onChangeText={(text) => setpriceTreatment(text)}
                  marginBottom={3}
                />
                <Switch
                  isChecked={payedTreatment}
                  onToggle={(value) => setpayedTreatment(value)}
                  colorScheme="purple"
                  marginBottom={5}
                />
                <Button onPress={handleAddService} colorScheme="purple">
                  Añadir
                </Button>
              </Box>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </NativeBaseProvider>
  );
};

export default ClientDetailsScreen;
