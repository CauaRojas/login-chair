import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from 'utils/supabase';
import Details from '~/screens/Details';
import Login from '../screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';


export type RootStackParamList = {
    Login: undefined;
    Details: { email: string; password: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLodiang] = useState(true)
    useEffect(() => {

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLodiang(false)
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLodiang(false)
        });
    }, []);
    return (
        <>
        {
            loading ? <View className='flex-1 items-center justify-center'><ActivityIndicator color={"#000"} /></View> : 
            <NavigationContainer>
            <Stack.Navigator initialRouteName={session ? 'Details' : 'Login'}>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    initialParams={{
                        email: session?.user?.email || '',
                        password: 'Não Disponível',
                    }}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    }
    </>
    );
}
