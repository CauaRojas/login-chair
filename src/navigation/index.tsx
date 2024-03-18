import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Details from '~/screens/Details';
import Login from '../screens/Login';
import { useEffect, useState } from 'react';
import { supabase } from 'utils/supabase';
import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
    Login: undefined;
    Details: { email: string; password: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        console.log(session);
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={session? "Details" : "Login"}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Details" component={Details} initialParams={{email: session?.user?.email || '', password: 'Não Disponível'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
