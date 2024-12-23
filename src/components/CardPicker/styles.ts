// src/components/CardPicker/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const CARD_WIDTH = windowWidth * 0.2;
const CARD_HEIGHT = CARD_WIDTH * 1.65;
const PICKER_RADIUS = 500;

export const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        backgroundColor: '#17256B',
        width: '100%',
        height: '100%',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        position: 'relative',
    },
    cardList: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // height: CARD_HEIGHT + PICKER_RADIUS,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 3,
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: 'absolute',
        bottom: 24,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    indexText: {
        position: 'absolute',
        bottom: CARD_HEIGHT + 24,
        left: '50%',
        transform: [{ translateX: -20 }],
        color: 'rgba(255, 255, 255, 0.55)',
        fontSize: 16,
        zIndex: 10,
    },
    pickerButtons: {
        position: 'absolute',
        bottom: CARD_HEIGHT,
        right: 0,
        padding: 6,
        zIndex: 20,
    },
    button: {
        padding: 12,
        width: 40,
        height: 40,
    },
    buttonImage: {
        width: '100%',
        height: '100%',
    },
    resetButton: {
        position: 'absolute',
        bottom: CARD_HEIGHT + 50,
        right: 20,
        width: 50,
        height: 50,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetButtonImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    centerIndexText: {
        position: 'absolute',
        bottom: CARD_HEIGHT + 50,
        fontSize: 20,
        color: '#FFD700',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '100%',
    },
    modalContentContainer: {
        alignItems: 'center',
        paddingTop: 90,
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 24,
        color: 'rgba(255, 255, 255, 0.85)',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.85)',
        marginBottom: 18,
    },
    modalImage: {
        width: CARD_WIDTH * 2,
        height: CARD_HEIGHT * 2,
        marginVertical: 18,
    },
    modalText: {
        color: 'rgba(255, 255, 255, 0.85)',
        textAlign: 'left',
        paddingHorizontal: 24,
        lineHeight: 24,
    },
});