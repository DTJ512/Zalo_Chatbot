import { StyleSheet } from 'react-native';

export const OPENSANS_REGULAR = 'OpenSans-Regular';
export const OPENSANS_BOLD = 'OpenSans-Bold';

export const COLORS = {
    mainColor: '#673ab7',
    secondaryColor: '#874154',
}

export const globalStyles = StyleSheet.create({
    globalTitleFont: {
        fontFamily: OPENSANS_BOLD,
    },
    globalRegularFont: {
        fontFamily: OPENSANS_REGULAR,
    }

});

