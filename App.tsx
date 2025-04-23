/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import './i18n'; 

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import LoginView from "./views/LoginView";
import { LoginViewModel } from "./viewmodels/LoginViewModel";
import HomeView from "./views/HomeView";
import JDManagementView from "./views/JDManagementView";
import AddJobView from "./views/AddJobView";
import JobDetailView from "./views/JobDetailView";

import { OPENSANS_BOLD, OPENSANS_REGULAR } from './utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './utils/RootStackParamList';
import CVManagementView from './views/CVManagementView';
import CVListView from './views/CVListView';

// Multi-language configuration

const loginViewModel = new LoginViewModel();


SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

    const [loaded, error] = useFonts({
        [OPENSANS_REGULAR]: require('./assets/fonts/OpenSans-Regular.ttf'),
        [OPENSANS_BOLD]: require('./assets/fonts/OpenSans-Bold.ttf'),
    });

  useEffect(() => {
      if (loaded || error) {
          SplashScreen.hideAsync();
      }
  }, [loaded, error]);

  if (!loaded && !error) {
      return null;
  }

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="Home" component={HomeView} options={{headerShown: false}} />
              <Stack.Screen name="Login" options={{headerShown: false}} >
                  {(props) => <LoginView {...props} viewModel={loginViewModel} />}
              </Stack.Screen>
              <Stack.Screen name="JDManagement" component={JDManagementView} options={{headerShown: false}} />
              <Stack.Screen name="JobDetail" component={JobDetailView} options={{headerShown: false}} />
              <Stack.Screen name="AddJob" component={AddJobView} options={{headerShown: false}} />
              <Stack.Screen name="CVManagement" component={CVManagementView} options={{headerShown: false}} />
              <Stack.Screen name="CVList" component={CVListView} options={{headerShown: false}} />
          </Stack.Navigator>
      </NavigationContainer>
  );

    // return (
    //     <SafeAreaView style={styles.container}>
    //         <HomeView/>
    //     </SafeAreaView>
    // );
    // return (
    //     <SafeAreaView style={{ flex: 1 }}>
    //         <LoginView viewModel={loginViewModel} />
    //     </SafeAreaView>
    // );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'OpenSans-Bold',
        marginTop: 20,
    }
});

export default App;
