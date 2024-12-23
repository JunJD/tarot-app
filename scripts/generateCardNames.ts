import * as fs from 'fs';
import * as path from 'path';

const CARDS_DIR = path.join(__dirname, '../src/assets/cards');

function generateCardImages() {
  // 读取 cards 目录下的所有文件
  const files = fs.readdirSync(CARDS_DIR);
  
  // 过滤出 .jpg 文件并移除扩展名
  const cardNames = files
    .filter(file => file.endsWith('.jpg'))
    .map(file => file.replace('.jpg', ''))
    .sort();

  // 生成 TypeScript 类型定义
  const typeDefinition = `export type CardImageKey = ${cardNames.map(name => `'${name}'`).join(' | ')};`;
  
  // 生成 CARD_IMAGES 对象
  const cardImagesObject = cardNames
    .map(name => `  '${name}': require('../assets/cards/${name}.jpg')`)
    .join(',\n');

  // 将内容写入文件
  const output = `// 此文件由脚本自动生成，请勿手动修改
import { ImageSourcePropType } from 'react-native';

${typeDefinition}

export const CARD_IMAGES: Record<CardImageKey, ImageSourcePropType> = {
${cardImagesObject}
};

export const APP_IMAGES: {
  crystalBall: ImageSourcePropType;
  cardBack: ImageSourcePropType;
} = {
  crystalBall: require('../assets/crystal-ball.png'),
  cardBack: require('../assets/cardBack.jpg'),
}; 
`;

  fs.writeFileSync(
    path.join(__dirname, '../src/constants/images.ts'),
    output
  );

  console.log('已生成卡牌图片常量文件！');
}

generateCardImages(); 