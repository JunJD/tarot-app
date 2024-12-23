// src/types/card.ts
import { ImageSourcePropType, ViewStyle } from 'react-native';
import { CardImageKey } from '../constants/images';

export interface Card {
  id: string;
  key: CardImageKey;
  image: ImageSourcePropType;
  rotation: number;
  picked: boolean;
  isDragged: boolean;
  isDrawn?: boolean;
  translateX?: number;
  translateY?: number;
}

export interface CardDetailInfo {
  name: string;
  enName: CardImageKey;
  note: string;
}

export type CardPosition = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

export interface CardPickerProps {
  isActive?: boolean;
}

export interface CardProps {
  card: Card;
  isFlipped: boolean;
  onFlip?: () => void;
  style?: ViewStyle;
}

export type RootStackParamList = {
  Home: undefined;
  CardDetail: { card: Card };
};