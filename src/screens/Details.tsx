import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation';
import { supabase } from 'utils/supabase';
import { StackNavigationProp } from '@react-navigation/stack';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Details'>;

const doLogout = async () => {
    console.log('rodou Logout')
    const { error } = await supabase.auth.signOut();
    return error
};

export default function Details() {
    const router = useRoute<DetailsScreenRouteProp>();
    const navigation = useNavigation<DetailsScreenNavigationProps>();
    return (
        <View className={styles.container}>
            <View className={styles.main}>
                <Text className={styles.title}>Details</Text>
                <Text className={styles.subtitle}>Seu email: {router.params.email}.</Text>
                <Text className={styles.subtitle}>Sua senha: {router.params.password}.</Text>
                <TouchableOpacity onPress={async ()=> {
                    const error = await doLogout()
                    if(error){
                        Alert.alert("Erro", "Erro ao fazer logout: " + error.message)
                    }
                    else{
                        navigation.replace("Login")
                    }
                }}><Text>Logout</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    container: 'flex-1 p-6',
    main: 'flex-1 max-w-[960]',
    title: 'text-[64px] font-bold',
    subtitle: 'text-4xl text-gray-700',
};
