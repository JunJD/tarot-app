import React, { useState, useCallback, useRef } from 'react';
import Animated, {
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { 
  View, 
  Dimensions, 
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { styles } from './styles';
import { CARD_IMAGES, CardImageKey, APP_IMAGES } from '../../constants/images';
import { CardDetail } from '../CardDetail';
import { CARDS } from '../../constants/cards';
import { CardItem } from './components/CardItem';
import type { Card, CardDetailInfo } from '../../types/card';

const { width: windowWidth } = Dimensions.get('window');
const NORMAL_CARD_SPACING = 3; // 普通卡片之间的角度间距
const CENTER_EXTRA_SPACE = 2; // 中心卡片两侧的额外空间
const PICKER_RADIUS = 700; // 扇形半径
const CARD_ROTATION_STEP = 1; // 每次滑动的角度步进

// 获取设备宽度并计算背景图片的尺寸
const DESK_PADDING = 50; // 左右边距
const DESK_WIDTH = windowWidth - (DESK_PADDING * 2); // 背景图片宽度

export const CardPicker = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [centerIndex, setCenterIndex] = useState(Math.floor(Object.keys(CARD_IMAGES).length / 2));
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardDetailInfo | null>(null);
  const rotationOffset = useSharedValue(0);
  const [cards, setCards] = useState<Card[]>(() => 
    Object.entries(CARD_IMAGES).map(([key, image], index, array) => {
      const totalCards = array.length;
      const totalAngleRange = (totalCards - 1) * NORMAL_CARD_SPACING;
      const startAngle = -totalAngleRange / 2;
      const rotation = startAngle + (NORMAL_CARD_SPACING * index);
      
      return {
        id: index.toString(),
        key: key as CardImageKey,
        image: APP_IMAGES.cardBack,
        rotation,
        picked: false,
        isDragged: false
      };
    })
  );

  const debounceTimer = useRef<NodeJS.Timeout>();

  const resetCards = () => {
    const newCards = cards.map((card, index) => ({
      ...card,
      picked: false,
      isDragged: false,
      isDrawn: false,
      image: APP_IMAGES.cardBack,
      translateX: undefined,
      translateY: undefined,
    }));
    setCards(newCards);
    rotationOffset.value = withSpring(0);
    setSelectedIndex(-1);
  };

  const calculateSelectedIndex = (offset: number) => {
    const stepCount = Math.round(offset / CARD_ROTATION_STEP);
    const newIndex = Math.min(
      Math.max(0, Math.floor(cards.length / 2) - stepCount),
      cards.length - 1
    );
    return newIndex;
  };

  const handleCardPick = (index: number) => {
    const card = cards[index];
    if (index >= 0 && !card.picked && card.isDragged) {
      const newCards = [...cards];
      newCards[index] = {
        ...newCards[index],
        picked: true,
        image: CARD_IMAGES[newCards[index].key],
      };
      setCards(newCards);
    }
  };

  const handleCardPress = (card: Card, index: number) => {
    handleCardPick(index);
    if (card.picked) {
      const cardInfo = CARDS.find(c => c.enName === card.key);
      setSelectedCard({
        name: cardInfo?.name || "",
        enName: cardInfo?.enName || "" as any,
        note: cardInfo?.note || ""
      });
      setDetailVisible(true);
    }
  };

  const getOffsetLimits = () => {
    const totalCards = cards.length;
    const maxSteps = Math.floor(totalCards / 2);
    const minOffset = -maxSteps * NORMAL_CARD_SPACING;
    const maxOffset = maxSteps * NORMAL_CARD_SPACING - 1;
    return { minOffset, maxOffset };
  };

  const handleUpdateCards = (index: number, updates: Partial<Card>) => {
    const newCards = [...cards];
    newCards[index] = {
      ...newCards[index],
      ...updates,
    };
    setCards(newCards);
  };

  const handleRotationChange = useCallback((offset: number) => {
    rotationOffset.value = withSpring(offset);
    setSelectedIndex(calculateSelectedIndex(offset));
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      const newCenterIndex = Math.floor(cards.length / 2) - Math.round(offset / NORMAL_CARD_SPACING);
      setCenterIndex(Math.min(Math.max(0, newCenterIndex), cards.length - 1));
    }, 150);
  }, [cards.length, NORMAL_CARD_SPACING]);

  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            source={APP_IMAGES.deskBack}
            style={{
              width: DESK_WIDTH,
              height: DESK_WIDTH,
              resizeMode: 'cover',
              borderRadius: 16,
            }}
          />
        </View>
        <Animated.View style={styles.cardList}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              resetCards();
              setCenterIndex(Math.floor(cards.length / 2));
            }}
          >
            <Image 
              source={APP_IMAGES.crystalBall}
              style={styles.resetButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.centerIndexText}>
            {centerIndex + 1}
          </Text>
          {cards.map((card, index) => (
            <CardItem
              key={card.id}
              card={card}
              index={index}
              centerIndex={centerIndex}
              rotationOffset={rotationOffset}
              PICKER_RADIUS={PICKER_RADIUS}
              NORMAL_CARD_SPACING={NORMAL_CARD_SPACING}
              CENTER_EXTRA_SPACE={CENTER_EXTRA_SPACE}
              CARD_ROTATION_STEP={CARD_ROTATION_STEP}
              onCardPress={handleCardPress}
              onUpdateCards={handleUpdateCards}
              onRotationChange={handleRotationChange}
              getOffsetLimits={getOffsetLimits}
            />
          ))}
        </Animated.View>
      </View>

      <CardDetail
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}
        card={selectedCard}
      />
    </View>
  );
}; 