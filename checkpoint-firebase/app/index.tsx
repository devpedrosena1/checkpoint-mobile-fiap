import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Home() {

    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Realizar login</Text>
            <View style={{ marginTop: 20 }}>
                <Button title='Login' onPress={() => router.push('/login')}></Button>
            </View>
            <View style={{ marginTop: 10 }}>
                <Button title='Cadastro' onPress={() => router.push('/cadastrar')}></Button>
            </View>
            
        </View>
    )
}