import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, Text, TextInput, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation<OverviewScreenNavigationProps>();

    return (
        <View className={'flex-1 justify-center items-center pt-20'}>
            <View className={'gap-4 font-bold w-4/5 h-full'}>
                <Text style={{ fontWeight: 'bold' }} className={'text-4xl text-left'}>
                    Log In
                </Text>
                <View className={'flex-row border border-gray-300 p-4 gap-2 items-center'}>
                    <MaterialIcons name="email" size={24} color="grey" />
                    <TextInput placeholder="Your Email" className={'text-lg'}></TextInput>
                </View>
                <View className={'flex-row border border-gray-300 p-4 gap-2 items-center'}>
                    <MaterialIcons name="key" size={24} color="grey" />
                    <TextInput placeholder="Password" className={'text-lg'}></TextInput>
                </View>
                <Text
                    onPress={() => {}}
                    className="bg-blue-600 text-white
                text-center p-4 rounded-lg">
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
                            <MaterialIcons name="facebook" size={24} color="#17A9FD" />
                            <Text style={{ fontWeight: 'bold' }}>Facebook</Text>
                        </View>
                    </View>
                </View>
                <Text>
                    Don't have an account?{' '}
                    <Text
                        style={{ fontWeight: 'bold' }}
                        className={'text-center text-blue-700 text-lg'}
                        onPress={() => {
                            navigation.navigate('Register', { name: 'Jane' });
                        }}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
}
