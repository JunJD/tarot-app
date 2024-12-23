// src/utils/layout.ts
import { Dimensions } from 'react-native';
import { CardPosition } from '../types/card';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CARD_ASPECT_RATIO = 1.67;
export const CARD_WIDTH = SCREEN_WIDTH * 0.5;
export const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT_RATIO;
export const RADIUS = SCREEN_HEIGHT * 0.8;
export const CARD_ROTATION = 15;

export const calculateCardPosition = (index: number, centerRotation: number): CardPosition => {
  const rotation = (index * CARD_ROTATION) + centerRotation;
  const radian = (rotation * Math.PI) / 180;
  
  return {
    x: RADIUS * Math.sin(radian),
    y: RADIUS * (1 - Math.cos(radian)),
    rotation,
    scale: 1
  };
};