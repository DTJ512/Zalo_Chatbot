import React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { globalStyles } from '../utils';
import { useNavigation } from '@react-navigation/native';

function TopTitle (probs: {title: string, hideBack?: boolean}): JSX.Element {

    const navigation = useNavigation();

    const backAction = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.topTitleContainer}>
            <Pressable 
                android_ripple={{color: 'gray'}} 
                style={probs.hideBack ? {display :"none" } : styles.pressable}
                onPress={backAction}>
                {/* <Image source={require('../assets/icon/leftArrow.png')} style={probs.hideBack ? {display: "none"} : styles.image}/> */}
                <MaterialIcons name="arrow-back" size={25} color="black" style={
                    probs.hideBack ? {display: "none"} : styles.image
                } />
            </Pressable>
            <Text 
                style={[styles.title, globalStyles.globalTitleFont]}
                ellipsizeMode='tail'
            >
                {probs.title}
            </Text>
        </View>
    );
}


export const styles = StyleSheet.create({
    topTitleContainer: {
        marginVertical: 5,
        height: 50,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        marginTop: 10,
        fontSize: 24,
        marginHorizontal: 8,
        textAlign: "left",
        verticalAlign: "middle",
    },
    image : {
        marginTop: 10,
        width: 25,
        height: 25,
    },

    pressable: {
        marginHorizontal: 0,
        width: 40,
        height: 60,
        alignItems: "center",
        justifyContent: "center",        
        
    }
});

export default TopTitle;