import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { MenuProvider } from "react-native-popup-menu";

function App() {

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MenuProvider>
    </SafeAreaProvider>
  );
}

export default App;
