import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigation';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export default function Register() {
    const router = useRoute<DetailsScreenRouteProp>();
    return (
        <View className={styles.container}>
            <View className={styles.main}>
                <Text className={styles.title}>Details</Text>
                <Text className={styles.subtitle}>
                    Showing details for user {router.params.name}.
                </Text>
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
