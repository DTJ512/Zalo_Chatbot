import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import TopTitle from "./TopTitle";
import { globalStyles } from "../utils";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import { useNavigation } from "@react-navigation/native";

const HomeView: React.FC = (props: any) => {
    const navigation = props.navigation;
    const handleLogout = () => {
        // TODO: confirm logout
        try {
            navigation.navigate("Login");
        } catch (error) {
            console.error(error);
        }   
    }

    const handleNavigate = (screen: string) => {
        try {
            navigation.navigate(screen);
        } catch (error) {
            console.error(error);
        }
    }
    
    const { t } = useTranslation();
    const pressedStyle = (pressed: boolean) => {
        return {
            opacity: pressed ? 0.5 : 1,
        };
    }

    return (
        <View style={styles.container}>
            <TopTitle title={t("home")} hideBack/>

            <View style={styles.bannerContainer}>               
            </View>

            <Text style={[styles.headerText, globalStyles.globalTitleFont]}>{t("feature")}</Text>

            <View>
                <View style={styles.navContainer}>
                    <Pressable style={({pressed}) => [
                                pressedStyle(pressed),  
                                styles.pressableFeature,
                                styles.bt1Color]}
                                onPress={() => {handleNavigate("JDManagement")}}
                                >
                        <FontAwesome6 name="file-alt" size={50} color="black" />
                        <Text style={[globalStyles.globalRegularFont, styles.btnText]}>{t("jdManagement")}</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                                pressedStyle(pressed),  
                                styles.pressableFeature,
                                styles.bt2Color]}
                                onPress={() => {handleNavigate("CVManagement")}}
                                >
                        <Foundation name="results-demographics" size={50} color="black" />
                        <Text style={[globalStyles.globalRegularFont, styles.btnText]}>{t("cvManagement")}</Text>
                    </Pressable>
                </View>
                <View style={styles.navContainer}>
                <Pressable style={({pressed}) => [
                                pressedStyle(pressed),  
                                styles.pressableFeature,
                                styles.bt3Color]}>
                    <FontAwesome5 name="scroll" size={50} color="black" />
                    <Text style={[globalStyles.globalRegularFont, styles.btnText]}>{t("scriptManagement")}</Text>
                </Pressable>
                    <Pressable style={({pressed}) => [
                                pressedStyle(pressed),  
                                styles.pressableFeature,
                                styles.bt4Color]}
                                onPress={() => {handleLogout()}}
                                >
                    <MaterialCommunityIcons name="logout-variant" size={50} color="black" />
                    <Text style={[globalStyles.globalRegularFont, styles.btnText]}>{t("logout")}</Text></Pressable>
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    searchBar: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        marginLeft: 10,
        marginTop: 20,
    },  
    bannerContainer: {
        height: 200,
        backgroundColor: "#55555555", // TODO: change to image
        margin: 10,
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 10,
    },
    
    btnText : {
        alignContent: "center",
        textAlign: "center",
        fontSize: 12,       
    },

    pressableFeature: {
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        marginHorizontal: 0,
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",   
        shadowOffset: {width: 0, height: 2},
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,     
    },

    bt1Color: {
        backgroundColor: "#E6835E",
    },
    bt2Color: {
        backgroundColor: "#AB90DB",
    },
    bt3Color: {
        backgroundColor: "#C77174",
    },
    bt4Color: {
        backgroundColor: "#D5D7F2",
    },
});

export default HomeView;
