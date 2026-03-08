import AppButton from "@/app/components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Home() {

    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function carregar() {
            const dados = await AsyncStorage.getItem('@user');
            if (dados) {
                const usuario = JSON.parse(dados);
                setEmail(usuario.email);
                setTipo(usuario.tipo);
            } else {
                router.push('/src/login/login');
            }
        }
        carregar();
    }, [])

    const realizarLogout = async () => {
        await AsyncStorage.removeItem('@user');
        router.replace('/src/login/login');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {tipo === "logado" ? "Usuário logado" : "Usuário Cadastrado"}
            </Text>
            <Text style={{ margin: 10}}>Email: {email}</Text>
            <View style={{ marginTop: 20 }}>
                <AppButton
                    title="Sair"
                    onPress={realizarLogout}
                />
            </View>
        </View>
    );
}