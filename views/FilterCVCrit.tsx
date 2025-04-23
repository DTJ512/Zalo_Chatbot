import { 
    Modal, 
    Pressable, 
    View, 
    Text,
    StyleSheet, 
    TextInput
} from "react-native";
import SortingCriteria from "../manager/Enum";
import { useState } from "react";
import { COLORS } from "../utils";
import { useTranslation } from "react-i18next";

interface IProps {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    fromPercent: number;
    setFromPercent: (value: number) => void;
    toPercent: number;
    setToPercent: (value: number) => void;
    onFilter: boolean;
    setOnFilter: (value: boolean) => void;
}

const FilterCVCrit = (props: IProps) => {

    const {
        modalVisible, 
        setModalVisible,
        fromPercent,
        setFromPercent,
        toPercent,
        setToPercent,
        onFilter,
        setOnFilter
    } = props;

    const {t} = useTranslation();
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{t("AppropriateLevel")}</Text>
                    <View style={styles.inputContainer}>

                        <Text style={styles.modalText}>{t("from")}</Text>
                        <TextInput 
                            style={styles.inputStyle}
                            inputMode="numeric"
                            value={fromPercent.toString()}
                            onChangeText={(value) => setFromPercent(Number(value))}
                        />
                        <Text style={styles.modalText}>% {t("to")}</Text>
                        <TextInput 
                            style={styles.inputStyle}
                            inputMode="numeric"
                            value={toPercent.toString()}
                            onChangeText={(value) => setToPercent(Number(value))}
                        />
                        <Text style={styles.modalText}>%</Text>



                    </View>


                        
                    <View style={styles.confirmButton}>

                        <Pressable 
                            style={[styles.buttonOK]}
                            onPress={()=>{
                                setFromPercent(0);
                                setToPercent(100);
                                setOnFilter(true);
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textConfirm}>{t("Reset")}</Text>
                        </Pressable>

                        <Pressable 
                            style={[styles.buttonOK]}
                            onPress={()=>{
                                setOnFilter(true);
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textConfirm}>{t("OK")}</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textCancel}>{t("Cancel")}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

    );

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
    modalView: {
        margin: 10,
        backgroundColor: '#ECE6F0',
        borderRadius: 20,
        padding: 15,
        width: 300,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    buttonOK: {
        backgroundColor: COLORS.mainColor,
        margin: 10,
        padding: 10,
        borderRadius: 10
        
    },

    buttonOpen: {
        backgroundColor: COLORS.mainColor,
        margin: 20,
    },

    buttonClose: {
        backgroundColor: "transparent",
        margin: 20
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    modalText: {
        marginBottom: 5,
        textAlign: 'left',
        fontSize: 16,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    textConfirm: {
        color: "white",
        fontWeight: "bold",
    },

    textCancel: {
        color: COLORS.mainColor,
        fontWeight: 'bold',
        textAlign: 'right',
    },

    confirmButton: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 20,
        //backgroundColor: "#333",       
    },

    inputContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: 5,
        width: "100%"
    },

    inputStyle: {
        height: 30,
        width:"18%",
        fontSize: 16,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        padding: 5

    },

    listCritItemContainer: {
        borderColor: COLORS.mainColor,
        borderLeftWidth: 2,
        padding: 4,
        margin: 9,
    },
});
  
export default FilterCVCrit;