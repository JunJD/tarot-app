import React from 'react';
import {
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { CardImageKey, CARD_IMAGES } from '../../constants/images';

const { width: windowWidth } = Dimensions.get('window');
const CARD_WIDTH = windowWidth * 0.2;
const CARD_HEIGHT = CARD_WIDTH * 1.65;

interface CardDetailProps {
  visible: boolean;
  onClose: () => void;
  card: {
    name: string;
    enName: CardImageKey;
    note: string;
  } | null;
}

export const CardDetail = ({ visible, onClose, card }: CardDetailProps) => {
  if (!card) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          onTouchStart={(e) => e.stopPropagation()}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>{card.name}</Text>
            <Text style={styles.subtitle}>{card.enName}</Text>
            <Image 
              source={CARD_IMAGES[card.enName]}
              style={styles.image}
              resizeMode="contain"
            />
            <Text 
              style={styles.text}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{card.note}</Text>
          </SafeAreaView>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  safeArea: {
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  image: {
    width: CARD_WIDTH * 2,
    height: CARD_HEIGHT * 2,
    marginVertical: 18,
    alignSelf: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'left',
    paddingHorizontal: 24,
    lineHeight: 24,
    fontSize: 16,
  },
});
