import React, { useCallback, useEffect } from "react";

import { 
    Dimensions, 
    TextInput, 
    View, 
    Text, 
    Pressable,
    StyleSheet,
    

} from "react-native";
import { useTranslation } from "react-i18next";
import TopTitle from "./TopTitle";
import { COLORS, globalStyles } from "../utils";
import Toast from 'react-native-toast-message';
import * as DocumentPicker from 'expo-document-picker';
import { BusinessLogicError } from "../utils/BusinessLogicError";


import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { JDManagementViewModel } from "../viewmodels/JDManagementViewModel";


const windowWidth = Dimensions.get("window").width;

const AddJobView: React.FC = (props: any) => {

    const navigation = props.navigation;
    const { t } = useTranslation();
    
    const [jobTitle, setJobTitle] = React.useState<string>("");
    const [file, setFile] = React.useState<string>("");
    const [filename, setFileName] = React.useState<string>("");
    const [reload, setReload] = React.useState(false);

    const pressedStyle = (pressed: boolean) => {
        return {
            opacity: pressed ? 0.5 : 1,
        };
    }
    const viewModel:JDManagementViewModel = props.route.params.viewModel;
    viewModel.initNewJob("");
    
    const handleAddJob = () => {
        try {
            viewModel.getNewJob()?.changeTitle(jobTitle);
            viewModel.saveNewJob();
            Toast.show({
                type: 'success',
                //text1: 'Success',
                text2: t("jobAddedSuccessfully"),
                visibilityTime: 3000,
                autoHide: true,
            });
            navigation.goBack();
        } catch (error: any) {
            console.error(t(error.message));
            Toast.show({
                type: 'info',
                text1: t("error"),
                text2: t(error.message),
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    }

    const handleCancel = () => {
        navigation.goBack();
    }

    const handleFilePicker = async () => {
        // try {
        //     const file = await pick({
        //         type: [DocumentPicker.types.allFiles],
        //     });
        //     //viewModel.updateJobJDFilePath(viewModel.getNewJob()!, file.uri);
        // } catch (error) {
        //     console.error(error);
        // }

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
                copyToCacheDirectory: true,
            });

            if(result.canceled) {
                // do nothing;
            } else if (result.assets) {
                setFile(result.assets[0].name);
                viewModel.updateJobJDFilePath(viewModel.getNewJob()!, result.assets[0].uri);
                viewModel.updateJobFileName(viewModel.getNewJob()!, result.assets[0].name);
            }
            
        }
        catch (error: any) {
            console.error(error);
            if (error) {
                Toast.show({
                    type: 'info',
                    text1: t("error"),
                    text2: t(error.message),
                    visibilityTime: 3000,
                    autoHide: true,
                });
            }
        }
    };

    const getJobFile = () => {
        // get file name and extension
        if (!file) {
            return "";
        }
        let filename: string | undefined = file.split('/').pop();
        return filename;
    }

    useEffect(() => {}, [file]);

    return (
        <View style={styles.container}>
            <TopTitle title={t("addJD")}/>

            <View style={styles.inputContainer}>

                <Text style={styles.hintText}>{t("jobTitle")}</Text>

                <TextInput
                    style={styles.input}
                    placeholder={t("enter") + ' ' + t("jobTitle")}
                    onChangeText={setJobTitle}
                />

                <Text style={styles.hintText}>{t("jobDescription")}</Text>
                <View style={styles.viewFileReviewContainer}>
                    <Text>{getJobFile()}</Text>

                    <Pressable style={({pressed}) => [
                        pressedStyle(pressed),  
                        styles.pressableBottomBtn,
                        styles.pressableAttach]}
                        onPress={handleFilePicker}
                        >
                        <FontAwesome6 name="paperclip" size={20} color="white" />
                    </Pressable>
                    
                </View>

                {/* <Pressable style={({pressed}) => [
                    pressedStyle(pressed),  
                    styles.pressableCVManagement]}
                    onPress={() => {}}
                >
                    <Text style={styles.textCVManagement}>
                        {t("cvManagement")}
                    </Text>
                </Pressable> */}
                

            </View>

            <Pressable style={({pressed}) => [
                        pressedStyle(pressed),  
                        styles.pressableBottomBtn,
                        styles.pressableAdd]}
                        onPress={handleAddJob}
                        >
                <FontAwesome6 name="check" size={30} color="white" />
            </Pressable>

            <Pressable style={({pressed}) => [
                        pressedStyle(pressed),  
                        styles.pressableBottomBtn,
                        styles.pressableCancel]}
                        onPress={handleCancel}>
                <FontAwesome6 name="xmark" size={30} color="white" />
            </Pressable>

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

    inputContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
    },

    input: {
        height: 50,
        marginHorizontal: 10,
        borderColor: COLORS.mainColor,
        borderWidth: 2,
        padding: 10,
        borderRadius: 8,
        
    },

    hintText: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: "bold",
        padding: 5,
    },

    viewFileReviewContainer: {

        height: 50,
        marginHorizontal: 10,
        borderColor: COLORS.mainColor,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        
    },




    textCVManagement: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
    },


    pressableAdd: {
        right: 10,
    },

    pressableCancel: {
        left: 10,
    },

    pressableAttach: {
        right: 5,
        bottom: 3,
        height: 40,
        width: 40,
    },

    pressableBottomBtn: {
        position: "absolute",
        bottom: 10,
        backgroundColor: COLORS.mainColor,
        borderRadius: 25,
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

export default AddJobView;