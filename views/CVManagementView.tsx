import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, FlatList, ActivityIndicator, ProgressBarAndroidBase } from "react-native";
import { useTranslation } from "react-i18next";
import TopTitle from "./TopTitle";

import { Dimensions } from "react-native";

import { globalStyles, COLORS } from "../utils";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {JDManagementViewModel} from "../viewmodels/JDManagementViewModel";
import { useFocusEffect } from "@react-navigation/native";
import { CVListViewModel } from "../viewmodels/CVListViewModel";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const CVManagementView: React.FC = (props: any) => {
    
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const navigation = props.navigation;
    const [viewModel] = useState(new JDManagementViewModel());
    const [data, setData] = useState(viewModel.getJobs());
    const [reload, setReload] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            viewModel.loadJobs(setLoading);
            setData(viewModel.getJobs());
            setReload(true);
        }, [])
    );


    
    const handleNavigateDetail = (job: any) => {
        try {            
            const cvViewModel: CVListViewModel = new CVListViewModel(job);
            navigation.navigate("CVList", {cvViewModel});
            setReload(false);
        } catch (error) {
            console.error(error);
        }
    }

    const pressedStyle = (pressed: boolean) => {
        return {
            opacity: pressed ? 0.5 : 1,
        };
    }

    const backgroundGradient = (item: any): readonly string[] => {
        if (item.state === "1") {
            return [COLORS.mainColor, COLORS.secondaryColor];

        } else if (item.state === "0") {
            return ["#999", "#777"];
        }
        return [];
    }

    const itemColor = (item: any) => {
        if (item.state === "1") {
            return {color: "#fff"};
        } else if (item.state === "0") {
            return {color: "#111"};
        }
        return {color: "#fff"};
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <TopTitle title={t("cvManagement")}/>
                <ActivityIndicator size="large" color={COLORS.mainColor} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TopTitle title={t("cvManagement")}/>

            <FlatList  
                style={styles.listContainer}
                data={data}
                extraData={reload}
                renderItem={({ item }) => (

                    <Pressable style={({pressed}) => [
                        pressedStyle(pressed)]}
                        onPress={() => handleNavigateDetail(item)}
                        >
                        <View>
                            <LinearGradient
                                style={styles.itemContainer}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                colors={backgroundGradient(item)}>
                                <Text style={[styles.itemTitle, itemColor(item)]}>{item.title}</Text>
                                <View >
                                {/* <Text>{viewModel.getJobTotalCV(item)}</Text> */}
                                    <Text style={[
                                        styles.infoLine,
                                        itemColor(item),

                                        ]}>
                                        {t(viewModel.getJobState(item))}
                                    </Text>
                                </View>
                            </LinearGradient>

                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />             


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,        
        width: Math.min(windowWidth, 600),
        alignSelf: "center",
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
    
    listContainer: {
        margin: 10,
        alignContent: "center",
        alignSelf: "center",
        width: Math.min(windowWidth - 20, 400),
    },
    
    itemTitle: {
        color: "#fff748",
        fontSize: 18,
        fontWeight: "bold",
    },
    infoLine: {
        flexDirection: "row",
    },

    itemContainer: {
        margin: 6,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "transparent",
        borderColor: COLORS.mainColor,
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

    pressableAddJob: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: COLORS.mainColor,
        borderRadius: 25,
        marginHorizontal: 0,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",   
        shadowOffset: {width: 0, height: 2},
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,     
    },

});

export default CVManagementView;
