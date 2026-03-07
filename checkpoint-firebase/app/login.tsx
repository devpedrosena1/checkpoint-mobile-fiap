import { auth } from "@/services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";


export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    useEffect(() => {
        const verificarUsuarioLogado = async () => {
            try {
                const usuarioSalvo = await AsyncStorage.getItem('@user');
                if (usuarioSalvo) {
                    router.replace('/home');
                }
            } catch (error) {
                console.error('Erro ao verificar usuário logado:', error);
            }
        };
        verificarUsuarioLogado();
    }, [])

    const login = () => {
        if (!email || !senha) {
            alert('Preencha todos os campos');
            return;
        }
        signInWithEmailAndPassword(auth, email, senha) 
            .then(async(userCredential) => {
                const user = userCredential.user;
                Alert.alert('Login bem-sucedido', `Bem-vindo, ${user.email}!`);
                await AsyncStorage.setItem('@user', JSON.stringify(user));
                router.push('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Erro ao fazer login:', errorCode, errorMessage);
                Alert.alert('Erro de login', 'E-mail ou senha inválidos. Tente novamente.');
            })
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInput placeholder="Digite seu e-mail: " onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput placeholder="Digite sua senha: " onChangeText={(text) => setSenha(text)}></TextInput>

            <Button title='Entrar' onPress={login}></Button>
            <Button title='Voltar' onPress={() => router.back()}></Button>
        </View>
    )
}