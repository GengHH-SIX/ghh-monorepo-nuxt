<template>
  <Motion v-bind="processedProps" ref="motionRef">
    <slot />
  </Motion>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { Motion, type MotionProps } from 'motion-v'
import { useAnimation, processMotionProps } from '../composables/useAnimation'

export interface ControlledMotionProps extends MotionProps {
  disabled?: boolean
  priority?: 'critical' | 'normal' | 'decorative'
}
const attrs = useAttrs();
// 组件Props（继承Motion所有属性）
const props = defineProps<ControlledMotionProps>();
// const props = defineProps<{
//   // Motion基础属性
//   initial?: any
//   animate?: any
//   exit?: any
//   transition?: any
//   whileHover?: any
//   whileTap?: any
//   whileInView?: any
//   whileFocus?: any
//   viewport?: any
//   layout?: boolean | string
//   layoutId?: string

//   // 扩展属性
//   disabled?: boolean  // 组件级禁用
//   priority?: 'critical' | 'normal' | 'decorative' // 动画优先级 '关键' | '普通' | '装饰'
// }>()
const motionRef = ref();
defineExpose({ motionRef })

// 获取全局动画控制
const animationControler = useAnimation()

// 处理优先级过滤
const shouldAnimate = computed(() => {
  if (props.disabled) return false

  // 优先级控制（按需实现）
  if (props.priority === 'decorative' && animationControler.state.value.performance === 'low') {
    return false
  }

  return animationControler.state.value.enabled
})

// 计算最终属性
const processedProps = computed(() => {
  // const rawProps = {
  //   as: props.as,
  //   asChild: props.asChild,
  //   initial: props.initial,
  //   animate: props.animate,
  //   exit: props.exit,
  //   transition: props.transition,
  //   whileHover: props.whileHover,
  //   //whileTap: props.whileTap,
  //   whileInView: props.whileInView,
  //   whileFocus: props.whileFocus,
  //   //viewport: props.viewport,
  //   layout: props.layout,
  //   layoutId: props.layoutId
  // }

  const newProp = processMotionProps({ ...attrs, ...props }, {
    ...animationControler.state.value,
    enabled: shouldAnimate.value
  })
  return newProp;
})
</script>
