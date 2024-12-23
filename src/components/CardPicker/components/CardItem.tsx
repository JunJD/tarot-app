import React, { useRef } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { 
  TouchableOpacity,
  Image,
  PanResponder,
  PanResponderGestureState,
  Dimensions,
} from 'react-native';
import { styles } from '../styles';
import { CARD_IMAGES, APP_IMAGES } from '../../../constants/images';
import type { Card } from '../../../types/card';

interface CardItemProps {
  card: Card;
  index: number;
  centerIndex: number;
  rotationOffset: Animated.SharedValue<number>;
  PICKER_RADIUS: number;
  NORMAL_CARD_SPACING: number;
  CENTER_EXTRA_SPACE: number;
  onCardPress: (card: Card, index: number) => void;
  onUpdateCards: (index: number, updates: Partial<Card>) => void;
  onRotationChange: (offset: number) => void;
  getOffsetLimits: () => { minOffset: number; maxOffset: number };
  CARD_ROTATION_STEP: number;
}

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export const CardItem = React.memo(({
  card,
  index,
  centerIndex,
  rotationOffset,
  PICKER_RADIUS,
  NORMAL_CARD_SPACING,
  CENTER_EXTRA_SPACE,
  onCardPress,
  onUpdateCards,
  onRotationChange,
  getOffsetLimits,
  CARD_ROTATION_STEP,
}: CardItemProps) => {
  const gestureType = useRef<'drag' | 'scroll' | null>(null);
  const startOffset = useRef(0);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      startOffset.current = rotationOffset.value;
      gestureType.current = null;
      isDragging.current = false;
    },
    onPanResponderMove: (_, gestureState) => {
      const isCentered = index === centerIndex;
      const dx = Math.abs(gestureState.dx);
      const dy = Math.abs(gestureState.dy);

      if (!gestureType.current && (dx > 5 || dy > 5)) {
        if (card.isDrawn) {
          gestureType.current = 'drag';
        } else {
          gestureType.current = dy > dx ? 'drag' : 'scroll';
        }
        if (gestureType.current === 'drag') {
          isDragging.current = true;
        }
      }

      if (gestureType.current === 'scroll' && !card.isDrawn) {
        handleScroll(gestureState);
      } else if (gestureType.current === 'drag') {
        if (isCentered && !card.isDragged) {
          handleDrag(gestureState);
        } else if (card.isDragged && isDragging.current) {
          handleDraggedCardMove(gestureState);
        }
      }
    },
    onPanResponderRelease: () => {
      gestureType.current = null;
      isDragging.current = false;
      if (!card.isDragged) {
        const { minOffset, maxOffset } = getOffsetLimits();
        const finalOffset = Math.round(rotationOffset.value / CARD_ROTATION_STEP) * CARD_ROTATION_STEP;
        const limitedOffset = Math.max(minOffset, Math.min(maxOffset, finalOffset));
        onRotationChange(limitedOffset);
      }
    },
  }), [card.isDragged, centerIndex, index]);

  const handleDrag = (gestureState: PanResponderGestureState) => {
    const translateX = gestureState.moveX - WINDOW_WIDTH / 2;
    const translateY = gestureState.moveY - PICKER_RADIUS;

    dragOffset.current = {
      x: gestureState.x0 - translateX,
      y: gestureState.y0 - translateY,
    };

    onUpdateCards(index, {
      isDragged: true,
      isDrawn: true,
      translateX,
      translateY,
      image: CARD_IMAGES[card.key],
      picked: true
    });
  };

  const handleDraggedCardMove = (gestureState: PanResponderGestureState) => {
    if (!isDragging.current) return;

    const translateX = gestureState.moveX - dragOffset.current.x;
    const translateY = gestureState.moveY - dragOffset.current.y;

    onUpdateCards(index, {
      translateX,
      translateY,
      isDragged: true,
      isDrawn: true,
      picked: true,
      image: CARD_IMAGES[card.key]
    });
  };

  const handleScroll = (gestureState: PanResponderGestureState) => {
    const { minOffset, maxOffset } = getOffsetLimits();
    const newOffset = startOffset.current + gestureState.dx / 10;
    rotationOffset.value = Math.max(minOffset, Math.min(maxOffset, newOffset));
  };

  const baseRotation = card.rotation;
  
  const cardStyle = useAnimatedStyle(() => {
    const currentRotationStep = Math.round(rotationOffset.value / NORMAL_CARD_SPACING);
    const isCentered = index === centerIndex;

    const adjustedRotationDeg = baseRotation + rotationOffset.value;
    let finalRotation = adjustedRotationDeg;
    
    if (index > centerIndex) {
      finalRotation += CENTER_EXTRA_SPACE;
    }

    let zIndex = index;
    
    if (card.isDragged || card.isDrawn) {
      zIndex = 1000;
    }

    if (card.isDragged && card.translateX !== undefined && card.translateY !== undefined) {
      return {
        transform: [
          { translateX: card.translateX },
          { translateY: card.translateY },
          { rotate: '0deg' },
        ],
        position: 'absolute',
        left: '50%',
        marginLeft: -styles.card.width / 2,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        zIndex,
      };
    }
    
    return {
      transform: [
        { translateY: PICKER_RADIUS },
        { rotate: withSpring(`${finalRotation}deg`, {
          damping: 20,
          stiffness: 90,
          mass: 0.5,
        }) },
        { translateY: -PICKER_RADIUS },
      ],
      position: 'absolute',
      left: '50%',
      marginLeft: -styles.card.width / 2,
      borderWidth: 2,
      borderColor: isCentered ? '#FFD700' : '#F0F0F0',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: withSpring(isCentered ? 4 : 0),
      },
      shadowOpacity: withSpring(isCentered ? 0.3 : 0),
      shadowRadius: withSpring(isCentered ? 4 : 0),
      elevation: withSpring(isCentered ? 5 : 0),
      zIndex,
      display: 'flex',
    };
  });

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        onPress={() => onCardPress(card, index)}
        activeOpacity={0.7}
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor: 'white',
          borderRadius: 8,
        }}
      >
        <Image
          source={card.picked ? CARD_IMAGES[card.key] : card.image}
          style={[styles.cardImage, { 
            backgroundColor: 'white',
            borderRadius: 8,
          }]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </Animated.View>
  );
});
