import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import TopTitle from "./TopTitle";

import { Dimensions } from "react-native";

import { globalStyles, COLORS } from "../utils";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {JDManagementViewModel} from "../viewmodels/JDManagementViewModel";
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const JDManagementView: React.FC = (props: any) => {
    
    const { t } = useTranslation();

    const [loadingJD, setLoadingJD] = useState(true);
    const navigation = props.navigation;
    const [viewModel] = useState(new JDManagementViewModel());
    const [data, setData] = useState(viewModel.getJobs());
    const [reload, setReload] = useState(false);


    useFocusEffect(
        React.useCallback(() => {
            viewModel.loadJobs(setLoadingJD);
            setData(viewModel.getJobs());
            setReload(true);
        }, [])
    );

    const handleAddJob = () => {    
        try {
            setReload(false);
            navigation.navigate("AddJob", {viewModel});
        } catch (error) {
            console.error(error);
        }   
    }
    
    const handleNavigateDetail = (job: any) => {
        try {            
            navigation.navigate("JobDetail", {viewModel, job});
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

    const itemBorderColor = (item: any) => {
        if (item.state === "1") {
            return {
                borderColor: COLORS.mainColor
            };
        } else if (item.state === "0") {
            return {
                borderColor: "#888888",
                borderWidth: 1, 
            };
        }
    }

    if (loadingJD) {
        return (
            <View style={styles.container}>
                <TopTitle title={t("jdManagement")}/>
                <ActivityIndicator size="large" color={COLORS.mainColor} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TopTitle title={t("jdManagement")}/>

            <FlatList  
                style={styles.listContainer}
                data={data}
                extraData={reload}
                renderItem={({ item }) => (
                    <Pressable style={({pressed}) => [
                        pressedStyle(pressed)]}
                        onPress={() => handleNavigateDetail(item)}
                        >
                        <View style={[
                            styles.itemContainer,
                            itemBorderColor(item),

                        ]}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <View style={styles.infoLine}>
                                <Text>{viewModel.getJobTotalJD(item)}</Text>
                                <Text>, {t(viewModel.getJobState(item))}</Text>
                            </View>
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />             
            
            <View>
                <Pressable style={({pressed}) => [
                            pressedStyle(pressed),  
                            styles.pressableAddJob]}
                            onPress={handleAddJob}>
                    <FontAwesome6 name="add" size={30} color="white" />
                </Pressable>
            </View>


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

    infoLine: {
        flexDirection: "row",
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
        fontSize: 18,
        fontWeight: "bold",
    },
    itemContainer: {
        margin: 6,
        padding: 10,
        borderRadius: 10,
        borderWidth: 3,
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

export default JDManagementView;
