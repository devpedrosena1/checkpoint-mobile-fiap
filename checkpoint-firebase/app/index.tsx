import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Home() {

    const router = useRouter();

    return (
        <View>
            <Text>Realizar login</Text>
            <Button title='Login' onPress={() => router.push('/login')}></Button>
            <Button title='Cadastro' onPress={() => router.push('/cadastrar')}></Button>
        </View>
    )
}