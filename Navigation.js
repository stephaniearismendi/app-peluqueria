import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  MaterialCommunityIcons,
  Octicons,
  AntDesign,
} from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import HomeScreen from './screens/HomeScreen';
import ClientScreen from './screens/ClientsScreen';
import AgendaScreen from './screens/AgendaScreen';
import AddClientScreen from './screens/AddClientScreen';
import ClientDetailsScreen from './screens/ClientDetailsScreen';


const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();
const ClientsStackNavigator = createNativeStackNavigator();

function MyStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="ClientsScreen">
      <HomeStackNavigator.Screen
        name="ClientsScreen"
        component={ClientScreen}
        options={{
          headerShown: false,
          headerTitle: 'Clientes',
          headerBackTitleVisible: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="AddClientScreen"
        component={AddClientScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
      <HomeStackNavigator.Screen
        name="ClientDetailsScreen"
        component={ClientDetailsScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'purple',
        tabBarLabelStyle: {
          display: 'none',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Fichas"
        component={MyStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
