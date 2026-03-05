import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";


export default function Login() {

    const router = useRouter();

    return (
        <View>
            <Text>Login</Text>
            <Button title='Voltar' onPress={() => router.back()}></Button>
        </View>
    )
}