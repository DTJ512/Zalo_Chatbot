import { 
    Modal, 
    Pressable, 
    View, 
    Text,
    StyleSheet 
} from "react-native";
import SortingCriteria from "../manager/Enum";
import { useState } from "react";
import { COLORS } from "../utils";
import { useTranslation } from "react-i18next";

interface IProps {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    sortCrit: SortingCriteria;
    setSortCrit: (value: SortingCriteria) => void;
}

const SortCVCrit = (props: IProps) => {

    const {
        modalVisible, 
        setModalVisible,
        sortCrit,
        setSortCrit,
    } = props;

    const {t} = useTranslation();

    const listCrit = [
        {id: 0, title: t("NameAscending")},
        {id: 1, title: t("NameDescending")},
        {id: 2, title: t("PercentageAscending")},
        {id: 3, title: t("PercentageDescending")},
    ];
    
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
                    <Text style={styles.modalTitle}>{t("SortCV")}</Text>
                    <Text style={styles.modalText}>{t("SortBy")}</Text>

                    {listCrit.map((item) => (
                        <Pressable key={item.id}
                            style={[
                                styles.listCritItemContainer,
                                (sortCrit === item.id) ? {borderColor: COLORS.mainColor} : {},
                            ]}
                            onPress={() => {
                                setSortCrit(item.id);
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.modalText}>{item.title}</Text>
                        </Pressable>
                    ))}

                    <View style={styles.confirmButton}>
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
        marginRight: 20,
    },

    buttonOpen: {
        backgroundColor: COLORS.mainColor,
        marginRight: 20,
    },
    buttonClose: {
        backgroundColor: "transparent",
        margin: 30,
        marginBottom: 10,
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

    textCancel: {
        color: COLORS.mainColor,
        fontWeight: 'bold',
        textAlign: 'right',
    },

    confirmButton: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",        
    },

    listCritItemContainer: {
        borderColor: "#9ab",
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 10,
        padding: 1,
        margin: 9,
        
    },
  });
  
export default SortCVCrit;