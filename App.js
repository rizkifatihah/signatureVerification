import React, {useState,createContext} from 'react';
import { View, Dimensions, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import EStyleSheet from 'react-native-extended-stylesheet';
import DashboardScreen from './screen/DashboardScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';

let shadow = {
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export let GlobalContext = createContext();

function MyTabBar({ state, descriptors, navigation }) {
  let [selectedTab, setSelectedTab] = useState("Dashboard");
  return (
    <View style={
      { flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: EStyleSheet.value("60rem"), backgroundColor: '#24b596' }
    }>
      <View style={{flexDirection:"row"}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if(route.name==="Menu3"){
          return (
            <View style={{flex:1,height:EStyleSheet.value("50rem"),justifyContent:"center",alignItems:"center"}}>
               <View
               style={{overflow:"hidden",...shadow,borderRadius:999,marginBottom:EStyleSheet.value("35rem"),width:EStyleSheet.value("70rem"),height:EStyleSheet.value("70rem")}}
                >
                    <Pressable 
                    android_ripple={{
                      color:"white"
                    }}
                    onPress={()=>{
                      setSelectedTab("Dashboard");
                    }}
                  style={{backgroundColor:(selectedTab==="Dashboard" || state.index===0) ? "rgb(35, 182, 151)":"whitesmoke",overflow:"hidden",...shadow,justifyContent:"center",alignItems:"center",borderRadius:999,marginBottom:EStyleSheet.value("35rem"),width:EStyleSheet.value("70rem"),height:EStyleSheet.value("70rem")}}>
                    <Ionicons name="home" size={EStyleSheet.value("30rem")} color={(selectedTab==="Dashboard" || state.index===0) ? "white":"#b7b7b7"} />
                    </Pressable>
               </View>
            </View>
          );
        }
      })}
      </View>
      <LinearGradient 
        colors={['#24b596', '#04a280', '#04a280']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      style={{backgroundColor:"rgb(35, 182, 151)",height:EStyleSheet.value("8rem"),justifyContent:"center",alignItems:"center"}}>
      </LinearGradient>
    </View>
  );
}
function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen options={{headerShown:false}} name="Menu3" component={MyStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function MyStack(){
  let [perangkat, setPerangkat] = useState(null);
  return (
    <GlobalContext.Provider value={{perangkat,setPerangkat}}>
    <Stack.Navigator
    >
      <Stack.Screen 
       options={{
        headerShown:false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
      name="Landing" component={DashboardScreen} />
    </Stack.Navigator>
    </GlobalContext.Provider>
  )
}

export default function App() {
  return (
   <MyTabs/>
  );
}
