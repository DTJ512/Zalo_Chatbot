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
import { Dropdown } from "react-native-element-dropdown";


import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { JDManagementViewModel } from "../viewmodels/JDManagementViewModel";


const windowWidth = Dimensions.get("window").width;

const JobDetailView: React.FC = (props: any) => {

    const navigation = props.navigation;
    const { t } = useTranslation();
    const [reload, setReload] = React.useState(false);
    
    
    const pressedStyle = (pressed: boolean) => {
        return {
            opacity: pressed ? 0.5 : 1,
        };
    }
    const viewModel: JDManagementViewModel = props.route.params.viewModel;
    const job = props.route.params.job;

    
    let screenTitle: string = job.title;
    const [jobTitle, setJobTitle] = React.useState<string>(job.title);
    const [filename, setFileName] = React.useState<string>(job.fileName || "");
    const [file,     setFile] = React.useState<string>(job.file || "");
    const [state,    setState] = React.useState<string>(viewModel.getJobState(job));
    const [stateId,  setStateId] = React.useState<string>(job.state);

    const handleNavigateCVManagement = () => {
        navigation.navigate("CVManagement", {viewModel, job});
    }

    
    const handleUpdateJob = () => {
        try {
            if(jobTitle === "") {
                throw new Error(BusinessLogicError.AddJob.TitleRequired);
            } else if (jobTitle !== screenTitle) {
                viewModel.updateJobTitle(job, jobTitle);
            }
            if(!job.file || file !== job.file) {
                viewModel.updateJobJDFilePath(job, file);
                viewModel.updateJobFileName(job, filename);
            }
            if(job.state !== stateId) {
                job.state = stateId;
            }
            alert(t("JobUpdatedSuccessfully"));
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
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });
            if (result.canceled) {
                // do nothing
            } else {
                if (result.assets) {
                    setFile(result.assets[0].uri);
                    setFileName(result.assets[0].name);
                }
            }
            setReload(!reload);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {}, [reload, filename, file]);

    const data = viewModel.getJobManager().getStateList().map((state) => {
        return {
            label: t(state.state),
            value: state.id,
        };
    });

    return (
        <View style={styles.container}>
            <TopTitle title={screenTitle}/>

            <View style={styles.inputContainer}>

                <Text style={styles.hintText}>{t("jobTitle")}</Text>

                <TextInput
                    style={styles.input}
                    placeholder={t("enter") + ' ' + t("jobTitle")}
                    value={jobTitle}
                    onChangeText={setJobTitle}
                />

                <Text style={styles.hintText}>{t("jobDescription")}</Text>
                {/* TODO: Add file picker */}
                <View style={styles.viewFileReviewContainer}>
                    <Text ellipsizeMode="tail">
                        {filename}
                    </Text>
                    <Pressable style={({pressed}) => [
                        pressedStyle(pressed),  
                        styles.pressableBottomBtn,
                        styles.pressableAttach]}
                        onPress={handleFilePicker}
                        >
                        <FontAwesome6 name="paperclip" size={20} color="white" />
                    </Pressable>
                    
                </View>

                <Text style={styles.hintText}>{t("jobState")}</Text>
                <View style={styles.viewFileReviewContainer}>
                    <Dropdown
                        data={data}
                        value={state}
                        onChange={item => {
                            setState(item.label);
                            setStateId(item.value);
                        }}
                        placeholder={t(state)}
                        labelField="label"
                        valueField="value"
                    />
                </View>

                <Pressable style={({pressed}) => [
                    pressedStyle(pressed),  
                    styles.pressableCVManagement]}
                    onPress={() => {}}
                >
                    <Text style={styles.textCVManagement}>
                        {t("cvManagement")}
                    </Text>
                </Pressable>
                

            </View>

            <Pressable style={({pressed}) => [
                        pressedStyle(pressed),  
                        styles.pressableBottomBtn,
                        styles.pressableAdd]}
                        onPress={handleUpdateJob}
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
        fontSize: 16,
        
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

    pressableCVManagement: {
        marginHorizontal: 10,
        marginVertical: 20,
        height: 50,
        backgroundColor: COLORS.mainColor,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
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
        width: 40,
        height: 40,
        bottom: 3,
        right: 5,
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

export default JobDetailView;