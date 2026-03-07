import { auth } from "@/services/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Cadastrar() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter();

    const signUp = async () => {
        try {
            const credential = await createUserWithEmailAndPassword(auth, email, senha);
            const userData = {
                email: credential.user.email,
                tipo: "cadastrado"
            };
            await AsyncStorage.setItem('@user', JSON.stringify(userData));
            alert(`Usuário cadastrado: ${email}`);
            router.replace('/home');
        } catch (error: any) {
            alert('Usuário NÃO cadastrado');
            console.log('Erro ao cadastrar:', error.code, error.message);
        }
    }

    return (
        <View>
            <Text>Cadastro</Text>

            <TextInput placeholder="Digite seu e-mail: " onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput placeholder="Digite sua senha: " onChangeText={(text) => setSenha(text)}></TextInput>

            <Button title='Cadastrar' onPress={signUp}></Button>
            <Button title='Voltar' onPress={() => router.back()}></Button>
        </View>
    )
}