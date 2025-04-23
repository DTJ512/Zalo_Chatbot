import React from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Image, Linking } from "react-native";

import { observer } from "mobx-react-lite";
import { LoginViewModel } from "../viewmodels/LoginViewModel";


// Multi-language configuration
import i18n from '../i18n';
import {useTranslation} from 'react-i18next';
import { useNavigation } from "@react-navigation/native";



const LoginView: React.FC<{ viewModel: LoginViewModel }> = observer(({ viewModel }) => {
    
    const handleLogin = () => {
        viewModel.login();
        console.log(viewModel);
        // if password and username are correct, navigate to home screen
        if (viewModel.loginSuccess) {
            navigation.navigate('Home');
        }
    };
    
    const { t } = useTranslation();
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Image source={require('../assets/image/logo.png')} style={styles.image} />

            <Text style={styles.field}>{t("username")}</Text>

            <TextInput
                style={styles.input}
                placeholder=""
                value={viewModel.username}
                inputMode="text"
                onChangeText={(text) => viewModel.setUsername(text)}
            />
            <Text style={styles.field}>
                {t("password")}
            </Text>
            <TextInput
                style={styles.input}
                placeholder=""
                secureTextEntry
                value={viewModel.password}
                onChangeText={(text) => viewModel.setPassword(text)}
            />
            <Text style={styles.hyperlink} onPress={() => Linking.openURL("https://www.google.com")}>
                {t("forgotPassword")}
            </Text>
            <Button 
                color="#673ab7"
                title={t("login")}
                onPress={handleLogin} 
                disabled={viewModel.isLoading} />
                
            {viewModel.isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {viewModel.errorMessage && <Text style={styles.errorText}>{viewModel.errorMessage}</Text>}

         

        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,  
    },
    image: {
        width: 165,
        height: 225,
        alignSelf: "center",
    },
    field: {
        height: 25,
        fontSize: 14,
        textAlign: "left",
        marginBottom: 5,
        marginTop: 15,
        marginLeft: 15,
    },
    title: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: "center",

    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,

    },
    errorText: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
    hyperlink: {
        color: "red",
        fontStyle: "italic",
        textAlign: "right",
        marginTop: 10,
        marginRight: 15,
        marginBottom: 20,
    },
    otherMethod: {
        width: 30,
        height: undefined,
        margin: 5,
        aspectRatio: 1,
    },
    divider: {
        marginTop: 20,
    }
});

export default LoginView;
