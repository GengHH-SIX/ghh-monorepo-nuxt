# UpMotion 组件

## 简介

UpMotion 是一个基于 TypeScript 实现的动画控制组件，它是 UpMotion 组件的纯 TS 版本。该组件继承了 [motion-v](https://github.com/your-motion-v-link) 库的所有功能，并添加了额外的控制属性。

## 特性

- ✅ 完全基于 TypeScript 实现
- ✅ 继承 Motion 组件的所有属性和功能
- ✅ 支持动画禁用控制
- ✅ 支持动画优先级管理
- ✅ 与全局动画控制系统集成
- ✅ 响应式性能优化

## 安装和使用

### 基本导入

```typescript
import UpMotion from './components/UpMotion';
import type { UpMotionProps } from './components/UpMotion';
```

### 基础用法

```vue
<template>
	<UpMotion
		:initial="{ opacity: 0, y: 20 }"
		:animate="{ opacity: 1, y: 0 }"
		:transition="{ duration: 0.5 }"
	>
		<div>这是一个带动画的内容</div>
	</UpMotion>
</template>

<script setup lang="ts">
import UpMotion from './components/UpMotion';
</script>
```

## Props 说明

UpMotion 组件继承了 Motion 组件的所有属性，并添加了以下扩展属性：

### 扩展属性

| 属性名     | 类型                                     | 默认值     | 说明             |
| ---------- | ---------------------------------------- | ---------- | ---------------- |
| `disabled` | `boolean`                                | `false`    | 是否禁用动画效果 |
| `priority` | `'critical' \| 'normal' \| 'decorative'` | `'normal'` | 动画优先级控制   |

### Motion 继承属性

UpMotion 继承了 Motion 组件的所有属性，包括但不限于：

- `initial`: 初始状态
- `animate`: 动画目标状态
- `exit`: 离开动画
- `transition`: 过渡配置
- `whileHover`: 悬停动画
- `whileTap`: 点击动画
- `whileInView`: 视口内动画
- `layout`: 布局动画
- 等等...

## 使用示例

### 1. 基础动画

```vue
<UpMotion
	:initial="{ opacity: 0, x: -100 }"
	:animate="{ opacity: 1, x: 0 }"
	:transition="{ duration: 0.6 }"
>
  <h1>欢迎来到我的网站</h1>
</UpMotion>
```

### 2. 禁用动画

```vue
<UpMotion :disabled="true" :initial="{ scale: 0 }" :animate="{ scale: 1 }">
  <div>这个元素不会有动画效果</div>
</UpMotion>
```

### 3. 装饰性动画

```vue
<UpMotion
	priority="decorative"
	:initial="{ opacity: 0, rotate: -180 }"
	:animate="{ opacity: 1, rotate: 0 }"
>
  <span>装饰性元素</span>
</UpMotion>
```

### 4. 关键动画（始终执行）

```vue
<UpMotion
	priority="critical"
	:initial="{ y: 50, opacity: 0 }"
	:animate="{ y: 0, opacity: 1 }"
>
  <div>重要内容动画</div>
</UpMotion>
```

## 动画优先级说明

### critical（关键）

- 总是执行，不受性能设置影响
- 适用于重要内容和交互反馈

### normal（普通）

- 默认优先级
- 根据全局性能设置决定是否执行

### decorative（装饰）

- 在低性能设备上会被禁用
- 适用于装饰性效果和非必要动画

## 与全局动画控制集成

UpMotion 组件与项目的全局动画控制系统深度集成：

```typescript
// 全局动画控制示例
import {
	createAnimationContext,
	provideAnimation,
} from '../composables/useAnimation';

// 创建动画控制上下文
const animationControl = createAnimationContext({
	enabled: true,
	mode: 'all',
	performance: 'auto',
});

// 在应用根组件中提供
provideAnimation(animationControl);
```

## 性能优化

组件内置了智能性能优化：

1. **自动性能检测**：根据设备性能自动调整动画行为
2. **优先级管理**：不同重要程度的动画有不同的执行策略
3. **全局控制**：可以通过全局设置统一管理所有动画

## 注意事项

1. **类型安全**：由于使用了类型断言，某些严格的类型检查可能会被绕过
2. **调试**：TS 版本的调试体验可能不如 SFC 版本直观
3. **兼容性**：确保项目中正确配置了 motion-v 库

## 故障排除

### 常见问题

**Q: 动画不执行**
A: 检查是否正确提供了动画控制上下文，确认 `disabled` 属性未设置为 `true`

**Q: TypeScript 报错**
A: 确保正确导入了所有依赖项，检查 motion-v 版本兼容性

**Q: 性能问题**
A: 调整动画优先级，使用 `decorative` 优先级的动画在低端设备上会自动禁用

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件！

## 许可证

MIT
