# 塔罗牌占卜应用 (Tarot Reading App)

一个基于React Native的互动式塔罗牌占卜应用，具有流畅的动画效果和直观的用户界面。让用户能够以优雅的方式进行塔罗牌占卜。

## 功能特点

- 圆形塔罗牌选择器布局
- 流畅的卡牌旋转和滑动动画
- 支持卡牌拖拽和抽取
- 卡牌居中高亮显示
- 直观的触摸手势操作
- 完整的78张塔罗牌牌组
- 支持正逆位解读
- 优雅的卡牌展示效果

## 项目结构

```
src/
├── components/
│   ├── CardPicker/
│   │   ├── components/
│   │   │   └── CardItem.tsx      # 单个塔罗牌组件
│   │   ├── index.tsx             # 塔罗牌选择器主组件
│   │   └── styles.ts             # 样式定义
│   └── CardDetail/
│       └── index.tsx             # 塔罗牌详情与解读组件
├── constants/
│   └── images.ts                 # 塔罗牌图片资源
├── screens/
│   ├── HomeScreen.tsx            # 主屏幕
│   └── styles.ts                 # 屏幕样式
├── types/
│   └── card.ts                   # 类型定义
└── App.tsx                       # 应用入口
```

## 主要组件说明

### CardPicker (塔罗牌选择器)
主容器组件，负责：
- 管理塔罗牌状态和位置
- 处理卡牌旋转和动画逻辑
- 计算卡牌布局位置
- 响应用户抽牌操作
- 处理正逆位判定

### CardItem (单张塔罗牌)
单个塔罗牌组件，实现：
- 手势识别与响应
- 拖拽抽牌功能
- 卡牌翻转动画
- 正逆位显示效果

## 技术栈

- React Native
- React Native Reanimated (动画效果)
- TypeScript
- React Native Gesture Handler (手势操作)

## 核心功能实现

### 1. 塔罗牌系统
```typescript
interface Card {
  key: string;           // 卡牌唯一标识
  rotation: number;      // 卡牌旋转角度
  image: any;           // 卡牌图片
  isDrawn: boolean;     // 是否被抽取
  isDragged: boolean;   // 是否被拖拽
  picked: boolean;      // 是否被选中
  isReversed?: boolean; // 是否逆位
  translateX?: number;  // X轴位移
  translateY?: number;  // Y轴位移
}
```

- 使用极坐标系统布局展示塔罗牌
- 支持自定义展示半径和间距
- 动态计算卡牌位置
- 处理卡牌正逆位逻辑

### 2. 抽牌手势系统
- 水平滑动：浏览卡牌
- 垂直拖拽：抽取卡牌
- 智能手势判断
- 自动正逆位判定

### 3. 动画系统
- 基于react-native-reanimated
- 流畅的卡牌翻转效果
- 平滑的抽牌动画
- 性能优化

## 开发环境配置

### 系统要求
- Node.js >= 14
- React Native >= 0.63
- iOS >= 11.0
- Android >= 5.0

### 依赖安装
```bash
# 安装项目依赖
npm install

# 安装iOS依赖
cd ios && pod install
```

## 运行项目

```bash
# iOS
npm run ios

# Android
npm run android
```

## 自定义配置

可在 `src/components/CardPicker/index.tsx` 中修改以下参数：

```typescript
const PICKER_RADIUS = 300;           // 选择器半径
const NORMAL_CARD_SPACING = 15;      // 卡牌间距
const CENTER_EXTRA_SPACE = 5;        // 中心卡牌额外间距
const CARD_ROTATION_STEP = 15;       // 旋转步进值
```
