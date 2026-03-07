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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cadastro</Text>

            <TextInput style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'gray', margin: 5 }} placeholder="Digite seu e-mail: " onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput style={{ justifyContent: 'center', borderWidth: 1, borderColor: 'gray', margin: 5 }} placeholder="Digite sua senha: " onChangeText={(text) => setSenha(text)}></TextInput>

            <View style={{ marginTop: 20 }}>
                <Button title='Cadastrar' onPress={signUp}></Button>
            </View>

            <View style={{ marginTop: 10 }}>
                <Button title='Voltar' onPress={() => router.push('/login')}></Button>
            </View>
            
        </View>
    )
}