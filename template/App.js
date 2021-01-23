/**
 * nativego template
 * https://github.com/damithg-dev/nativego
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef, isReadyRef } from "./src/navigation/helper";
import { enableScreens } from "react-native-screens";
import { ThemeProvider  } from "./src/utilities/context/theme";
enableScreens();

import HelloWorld from "./src/screens/HelloWorld";

const Stack = createStackNavigator();

const App = ({ Navigation }) => {
  return (
    <ThemeProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="HelloWorld" component={HelloWorld} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
