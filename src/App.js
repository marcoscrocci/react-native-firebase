/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firebase from 'firebase'

const App = () => {

    const [Pontuacao, setPontuacao] = useState(0);
    const [UsuarioAutenticado, setUsuarioAutenticado] = useState(null);

    const salvarDados = () => {
        // Exemplo 1
        //var database = firebase.database();
        //database.ref("pontuacao").set("200"); // Incluir ou Atualizar
        //database.ref("pontuacao").remove(); // Remover

        // Exemplo 2
        var funcionarios = firebase.database().ref("funcionarios");
        //funcionarios.child("002").child("nome").set("Jamilton") 
        //funcionarios.child("002").remove(); 
        //funcionarios.remove();
        //funcionarios.push().child("nome").set("Jamilton") 
        funcionarios.push().set(
            {
                nome: "Jamilto",
                altura: "1,75",
                peso: "74"
            }
        )
    }

    const listarDados = () => {
        var pontuacao = firebase.database().ref("pontuacao");
        pontuacao.on('value', (snapshot) => {
            var pontos = snapshot.val();
            setPontuacao(pontos)
        })
    }

    const cadastrarUsuario = () => {
        var email = "marcoscrocci@gmail.com";
        var senha = "teste123";

        const usuario = firebase.auth();
        usuario.createUserWithEmailAndPassword(email, senha)
            .catch((erro) => {
                //erro.code
                var mensagemError = "Falha ao criar o usuário!"
                switch (erro.code) {
                    case "auth/weak-password":
                        mensagemError = "A senha precisa ter no mínimo 6 caracteres!";
                        break;
                    case "auth/email-already-in-use":
                        mensagemError = "Este endereço de e-mail já está em uso por outra conta!";
                        break;

                    default:
                        mensagemError = erro.message
                        break;
                }
                alert(mensagemError)
            });
    }

    const verificarUsuarioLogado = () => {
        const usuario = firebase.auth();
        const usuarioAtual = usuario.currentUser;
        // if (usuarioAtual) {
        //     alert("Usuário está logado")
        // } else {
        //     alert("Usuário não está logado")
        // }

        usuario.onAuthStateChanged((usuarioAtual) => {
            if (usuarioAtual) {
                setUsuarioAutenticado(usuarioAtual)
                //alert(JSON.stringify(usuarioAtual))
            } else {
                setUsuarioAutenticado(null)
            }
        });
    }

    const sairUsuario = () => {
        const usuario = firebase.auth();
        usuario.signOut()
    }

    const autenticarUsuario = () => {
        var email = "marcoscrocci@gmail.com";
        var senha = "teste123";
        const usuario = firebase.auth();
        usuario.signInWithEmailAndPassword(email, senha)
            .catch((erro) => {
                //erro.code
                var mensagemError = "Falha ao criar o usuário!"
                switch (erro.code) {
                    case "auth/wrong-password":
                        mensagemError = "Usuário e/ou senha inválidos!";
                        break;
                    case "auth/user-not-found":
                        mensagemError = "Usuário e/ou senha inválidos!";
                        break;

                    default:
                        mensagemError = erro.code
                        break;
                }
                alert(mensagemError)
            });
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.body}>
                        <Text>Meu App</Text>
                        <Button
                            onPress={salvarDados}
                            title="Salvar dados"
                            color="#841584"
                            accessibilityLabel="Salvar dados"
                        />
                        <Button
                            onPress={listarDados}
                            title="Listar dados"
                            color="#841584"
                            accessibilityLabel="Listar dados"
                        />
                        <Button
                            onPress={cadastrarUsuario}
                            title="Cadastrar usuário"
                            color="#841584"
                            accessibilityLabel="Cadastrar usuário"
                        />
                        <Button
                            onPress={verificarUsuarioLogado}
                            title="Verificar usuário autenticado"
                            color="#841584"
                            accessibilityLabel="Verificar usuário autenticado"
                        />
                        <Button
                            onPress={sairUsuario}
                            title="Sair"
                            color="#841584"
                            accessibilityLabel="Sair"
                        />
                        <Button
                            onPress={autenticarUsuario}
                            title="Autenticar"
                            color="#841584"
                            accessibilityLabel="Autenticar"
                        />
                    </View>
                    <Text>Pontuação: {Pontuacao}</Text>
                    <Text>Usuário Autenticado: {UsuarioAutenticado && UsuarioAutenticado.email}</Text>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
});

export default App;
