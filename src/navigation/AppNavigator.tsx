import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AlphabetScreen from '../screens/AlphabetScreen';
import LetterDetailScreen from '../screens/LetterDetailScreen';
import NumberScreen from '../screens/NumberScreen';
import PracticeScreen from '../screens/PracticeScreen';
import GameScreen from '../screens/GameScreen';
import GameFindLetterScreen from '../screens/games/GameFindLetterScreen';
import GameMissingNumberScreen from '../screens/games/GameMissingNumberScreen';
import GameMemoryScreen from '../screens/games/GameMemoryScreen';
import GameCountFastScreen from '../screens/games/GameCountFastScreen';
import GameFirstLetterScreen from '../screens/games/GameFirstLetterScreen';
import AchievementScreen from '../screens/AchievementScreen';
import { COLORS } from '../styles/colors';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alphabet" component={AlphabetScreen} />
        <Stack.Screen name="LetterDetail" component={LetterDetailScreen} />
        <Stack.Screen name="Numbers" component={NumberScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="Games" component={GameScreen} />
        <Stack.Screen name="GameFindLetter" component={GameFindLetterScreen} />
        <Stack.Screen name="GameMissingNumber" component={GameMissingNumberScreen} />
        <Stack.Screen name="GameMemory" component={GameMemoryScreen} />
        <Stack.Screen name="GameCountFast" component={GameCountFastScreen} />
        <Stack.Screen name="GameFirstLetter" component={GameFirstLetterScreen} />
        <Stack.Screen name="Achievements" component={AchievementScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
