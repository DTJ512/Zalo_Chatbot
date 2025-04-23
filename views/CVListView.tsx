import React, { useCallback, useEffect } from "react";

import { 
    Dimensions, 
    TextInput, 
    View, 
    Text, 
    Pressable,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    

} from "react-native";
import { useTranslation } from "react-i18next";
import TopTitle from "./TopTitle";
import { COLORS, globalStyles } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import Toast from 'react-native-toast-message';
import * as DocumentPicker from 'expo-document-picker';
import { BusinessLogicError } from "../utils/BusinessLogicError";
import { Dropdown } from "react-native-element-dropdown";


import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { JDManagementViewModel } from "../viewmodels/JDManagementViewModel";
import { CVListViewModel } from "../viewmodels/CVListViewModel";

import SortCVCrit from "./SortCVCrit.modal";
import FilterCVCrit from "./FilterCVCrit";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CVListView: React.FC = (props: any) => {

    const navigation = props.navigation;
    const { t } = useTranslation();
    const [reload, setReload] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    
    
    const pressedStyle = (pressed: boolean) => {
        return {
            opacity: pressed ? 0.5 : 1,
        };
    }
    const viewModel: CVListViewModel = props.route.params.cvViewModel;
    
    let screenTitle: string = viewModel.getJobTitle();
    const [data, setData] = React.useState(viewModel.getCVs());

    const [sortModalVisible, setSortModalVisible] = React.useState(false);
    const [sortCrit, setSortCrit] = React.useState(0);

    const [filterModalVisible, setFilterModalVisible] = React.useState(false);
    const [fromPercent, setFromPercent] = React.useState(0);
    const [toPercent, setToPercent] = React.useState(100);
    const [onFilter, setOnFilter] = React.useState(true);
 
    const handleCancel = () => {
        navigation.goBack();
    }

    const handleRemoveCV = (id: string) => {

        if (confirm(t("DoYouWantToRemoveCV"))) {
            viewModel.removeCV(id);
            Toast.show({
                type: "success",
                text1: t("CVRemoved"),
                text2: t("CVRemovedSuccess"),
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                position: "top",
            });
            setData(viewModel.getCVs());
        }
    }

    useEffect(() => {
        viewModel.loadCVs(setLoading);
        setData(viewModel.getCVs());
    }, [loading]);

    useEffect(() => {
        viewModel.sortCVs(sortCrit);
        setData(viewModel.getCVs());
        setReload(!reload);
    }, [sortCrit]);

    useEffect(()=>{
        if(onFilter){
            viewModel.filterCVs(fromPercent, toPercent);
            setData(viewModel.getCVs());
            setReload(!reload);
            setOnFilter(false);
        }
    }, [onFilter]);

    if(loading) {
        return (
            <View style={styles.container}>
                <TopTitle title={screenTitle}/>
                <ActivityIndicator size="large" color={COLORS.mainColor} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TopTitle title={screenTitle}/>

            <Text style={styles.hintText}>{t("cvManagement")} ({t("Total")}: {viewModel.getCVs().length})</Text>

            <View style={styles.viewFileReviewContainer}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return (
                            <Pressable style={({pressed}) => [
                                pressedStyle(pressed),  
                                styles.pressableCVManagement]}
                                onPress={() => {}}
                            >
                                    <Text>{item.percentage}%</Text>
                                    <View style={styles.separator}/>
                                    <Text>{item.filename}</Text>
                                    <Pressable style={({pressed}) => [
                                        pressedStyle(pressed),  
                                        styles.pressableBottomBtn]}
                                        onPress={() => handleRemoveCV(item.id)}>
                                        <FontAwesome6 name="xmark" size={20} color={"white"}/>
                                    </Pressable>
                                
                                
                            </Pressable>
                        );
                    }}
                />
            </View>

            <View style={styles.operationContainer}>
                <Pressable style={({pressed}) => [
                    pressedStyle(pressed), 
                    styles.pressableOperation, 
                    styles.pressableSort]}
                    onPress={() => setSortModalVisible(true)}>
                        <LinearGradient
                            style={styles.pressableOperation}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            colors={[COLORS.mainColor, COLORS.secondaryColor]}>
                        </LinearGradient>
                        <FontAwesome6 name="arrow-up-wide-short" size={40} color="white" />
                </Pressable>
                <Pressable style={({pressed}) => [
                    pressedStyle(pressed),  
                    styles.pressableOperation,
                    styles.pressableFilter]}
                    onPress={() => setFilterModalVisible(true)}>
                    <LinearGradient
                        style={styles.pressableOperation}
                        start={{x: 1, y: 1}}
                        end={{x: 0, y: 0}}
                        colors={[COLORS.mainColor, COLORS.secondaryColor]}>
                    </LinearGradient>
                    <FontAwesome6 name="filter" size={40} color="white" />
                                
                </Pressable>
            </View>

            <SortCVCrit
                modalVisible={sortModalVisible}
                sortCrit={sortCrit}
                setModalVisible={setSortModalVisible}
                setSortCrit={setSortCrit}
            />

            <FilterCVCrit
                modalVisible={filterModalVisible}
                fromPercent={fromPercent}
                toPercent={toPercent}
                onFilter={onFilter}
                setModalVisible={setFilterModalVisible}
                setFromPercent={setFromPercent}
                setToPercent={setToPercent}
                setOnFilter={setOnFilter}            
            />


        </View>

    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 25,
        width: Math.min(windowWidth, 600),
        alignSelf: "center",
    },

    itemContainer: {
        margin: 6,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },

    hintText: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: "bold",
        padding: 5,
    },

    viewFileReviewContainer: {

        height: Math.min(windowHeight - 200, 600),
        marginHorizontal: 10,
        padding: 5,
        borderColor: COLORS.mainColor,
        borderBottomWidth: 2,
        
    },
    
    pressableCVManagement: {
        margin: 6,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 5,
        height: 50,
        borderColor: COLORS.mainColor,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
    },

    textCVManagement: {
        fontWeight: "bold",
        fontSize: 18,
    },


    pressableOperation: {
        position: "absolute",
        backgroundColor: "transparent",
        borderRadius: 25,
        width: 100,
        height: 75,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {width: 0, height: 2},
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,     
    },

    pressableSort: {
        left: 50,
    },

    pressableFilter: {
        right: 50,
    },

    pressableCancel: {
        left: 10,
    },

    pressableBottomBtn: {
        position: "absolute",
        right: 10,
        backgroundColor: COLORS.mainColor,
        borderRadius: 25,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",   
        shadowOffset: {width: 0, height: 2},
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,     
    },

    operationContainer: {
        backgroundColor: COLORS.mainColor,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 10,
    },

    separator: {
        height: "100%",
        width: 2,
        backgroundColor: COLORS.mainColor,
        marginHorizontal: 10,
    },
});

export default CVListView;