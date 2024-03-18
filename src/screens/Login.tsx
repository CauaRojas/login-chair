import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Image, Text, TextInput, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { createRef, useState } from 'react';
import { supabase } from 'utils/supabase';
import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;
const createAlert = (msg: string) => {
    Alert.alert('Erro', msg, [{ text: 'OK', onPress: () => {} }]);
};

const signInWithEmail = async (email: string, password: string) => {
    console.log('rodou');
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return error;
};

export default function Login() {
    const emailInput = createRef<TextInput>();
    const passwordInput = createRef<TextInput>();
    const navigation = useNavigation<OverviewScreenNavigationProps>();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <View className={'flex-1 justify-center items-center pb-20'}>
            <View className={'gap-4 font-bold w-4/5 '}>
                <Text style={{ fontWeight: 'bold' }} className={'text-4xl text-left'}>
                    Log In
                </Text>
                <View className={'flex-row border border-gray-300 p-4 gap-2 items-center'}>
                    <MaterialIcons
                        name="email"
                        size={24}
                        color="grey"
                        onPress={() => {
                            emailInput.current?.focus();
                        }}
                    />
                    <TextInput
                        placeholder="Your Email"
                        className={'text-lg'}
                        ref={emailInput}
                        onChangeText={(e) => {
                            setEmail(e);
                        }}></TextInput>
                </View>
                <View className={'flex-row border border-gray-300 p-4 gap-2 items-center'}>
                    <MaterialIcons
                        name="key"
                        size={24}
                        color="grey"
                        onPress={() => {
                            passwordInput.current?.focus();
                        }}
                    />
                    <TextInput
                        placeholder="Password"
                        className={'text-lg'}
                        secureTextEntry={true}
                        ref={passwordInput}
                        onChangeText={(e) => {
                            setPassword(e);
                        }}></TextInput>
                </View>
                <Text
                    disabled={loading}
                    onPress={async () => {
                        if (loading) {
                            return;
                        }
                        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                        if (!emailRegex.test(email)) {
                            createAlert('Email inválido');
                        } else if (password.length < 6) {
                            createAlert('Senha inválida, insira no mínimo 6 caracteres');
                        } else {
                            setLoading(true);
                            const error = await signInWithEmail(email, password);
                            setLoading(false);
                            if (error) {
                                createAlert('Erro ao realizer o login: ' + error.message);
                            } else {
                                navigation.replace('Details', { email, password });
                            }
                        }
                    }}
                    className={`${loading ? 'bg-blue-300' : 'bg-blue-600'} text-white text-center p-4 rounded-lg`}>
                    Log In
                </Text>
                <Text
                    style={{ fontWeight: 'bold' }}
                    className={'text-right font-bold text-blue-700 text-lg'}
                    onPress={() => {}}>
                    Forgot Password?
                </Text>
                <View className="flex-row justify-center items-center">
                    <View
                        className="border-b border-gray-400 h-1
                    w-[45%]"></View>
                    <Text className="text-gray-400 mx-2">or</Text>
                    <View className="border-b border-gray-400 h-1 w-[45%]"></View>
                </View>
                <View>
                    <View className="flex-row justify-center items-center gap-4">
                        <View className="flex-row gap-4 border border-gray-400 px-8 items-center py-1 rounded-lg w-">
                            <Image
                                source={require('../../assets/google.png')}
                                className="w-[24px] h-[24px]"
                            />
                            <Text style={{ fontWeight: 'bold' }}>Google</Text>
                        </View>
                        <View className="flex-row gap-4 border border-gray-400 px-8 items-center py-1 rounded-lg w-1/2">
                            <Image
                                source={require('../../assets/facebook.png')}
                                className="w-[24px] h-[24px]"
                            />
                            <Text style={{ fontWeight: 'bold' }}>Facebook</Text>
                        </View>
                    </View>
                </View>
                <Text>
                    Don't have an account?{' '}
                    <Text
                        style={{ fontWeight: 'bold' }}
                        className={'text-center text-blue-700 text-lg'}
                        onPress={() => {}}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
}
