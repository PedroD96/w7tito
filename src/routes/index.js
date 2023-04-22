import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/welcome';
import Login from '../pages/login';
import Register from "../pages/register";
import Main from "../pages/main";
import ServiceOrdens from "../pages/serviceOrdens";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
             name='Welcome'
             component={Welcome}
             options={{headerShown: false}}
            />

            <Stack.Screen
             name='Login'
             component={Login}
             options={{headerShown: false}}
            />

            <Stack.Screen
             name='Register'
             component={Register}
             options={{headerShown: false}}
            />
            
            <Stack.Screen
             name='Main'
             component={Main}
             options={{headerShown: false}}
            />

            <Stack.Screen
             name='ServiceOrdens'
             component={ServiceOrdens}
             options={{headerShown: false}}
            />

        </Stack.Navigator>
    );
}
