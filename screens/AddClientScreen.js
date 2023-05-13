import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeBaseProvider, Box, Input, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const AddClientScreen = ({ route }) => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [birth, setBirth] = useState('');
  const [diseases, setDiseases] = useState('');
  const [skin, setSkin] = useState('');
  const [treatments, setTreatments] = useState('');
  const [cosmetics, setCosmetics] = useState('');
  const [results, setResults] = useState('');

  const handleAddClient = () => {
    route.params.addNewClient(
      nombre,
      telefono,
      direccion,
      correo,
      birth,
      diseases,
      skin,
      treatments,
      cosmetics,
      results,
    );
    navigation.goBack();
  };

  return (
    <NativeBaseProvider>
      <LinearGradient colors={['#8e44ad', '#c0392b']} style={styles.gradient}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Box
              bg="rgba(255, 255, 255, 0.8)"
              p={6}
              borderRadius={8}
              width="90%"
              alignItems="center">
              <Input
                variant="underlined"
                placeholder="Nombre"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Teléfono"
                value={telefono}
                onChangeText={(text) => setTelefono(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Dirección"
                value={direccion}
                onChangeText={(text) => setDireccion(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Correo"
                value={correo}
                onChangeText={(text) => setCorreo(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Cumpleaños"
                value={birth}
                onChangeText={(text) => setBirth(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Enfermedades padecidas"
                value={diseases}
                onChangeText={(text) => setDiseases(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Tipo de piel"
                value={skin}
                onChangeText={(text) => setSkin(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Tratamientos"
                value={treatments}
                onChangeText={(text) => setTreatments(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Cosméticos utilizados."
                value={cosmetics}
                onChangeText={(text) => setCosmetics(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />
              <Input
                variant="underlined"
                placeholder="Resultados y nota"
                value={results}
                onChangeText={(text) => setResults(text)}
                style={styles.input}
                multiline={true}
                numberOfLines={1}
                textAlignVertical="top"
                scrollEnabled={true}
              />{' '}
              <Button
                onPress={handleAddClient}
                colorScheme="purple"
                size="lg"
                mt={4}>
                Agregar
              </Button>
            </Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '80%',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    textAlignVertical: 'top',
    maxHeight: 80,
  },
});

export default AddClientScreen;
