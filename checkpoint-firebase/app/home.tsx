import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {

    const router = useRouter();

    const realizarLogout = async () => {
        await AsyncStorage.removeItem('@user');
        router.replace('/');
    }

    return (
        <View>
            <Text>Home</Text>
            <Button title='Sair' onPress={realizarLogout}></Button>
        </View>
    );
}