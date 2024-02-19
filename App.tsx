import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { CatScreen } from './screens/CatScreen';
import { DogScreen } from './screens/DogScreen';
import { CatDetails } from './screens/CatDetails';
import { DogDetails } from './screens/DogDetails';
import { CatIcon } from './icons/Cat';
import { DogIcon } from './icons/Dog';
import { RootStackParamList } from './types/navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Piano } from './screens/Piano';
import { SixtySeconds } from './screens/SixtySeconds';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

 const Tabs = ()=> {
  return(
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'red', tabBarItemStyle: { marginBottom: -30 } , headerShown: false }}>
    <Tab.Screen
      name="CatScreen"
      component={CatScreen}
      options={{ tabBarIcon: ({ color }) => <CatIcon color={color} />, tabBarShowLabel: false ,}}
    />
    <Tab.Screen
      name="DogScreen"
      component={DogScreen}
      options={{ tabBarIcon: ({ color }) => <DogIcon color={color} />, tabBarShowLabel: false }}
    />
  </Tab.Navigator>
  )
}

const Screen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="CatDetails" component={CatDetails} />
      <Stack.Screen name="DogDetails" component={DogDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Drawer.Navigator>
        <Drawer.Screen name="HomeScreen" component={Screen} />
        <Drawer.Screen name="Piano" component={Piano} />
        <Drawer.Screen name="Sixty" component={SixtySeconds}  />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}