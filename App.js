import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialScreen from './screens/InitialScreen';
import SeniorScreen from './screens/SeniorScreen'; // SeniorScreen 추가
import MenuScreen from './screens/MenuScreen';
import MenuTabs from './components/MenuTabs';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ title: 'ㅇㅇ커피' }}
        />
        <Stack.Screen
          name="Senior"
          component={SeniorScreen}
          options={{ title: '노인 화면' }}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuTabs} 
          
          options={{ title: '메뉴 화면' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
