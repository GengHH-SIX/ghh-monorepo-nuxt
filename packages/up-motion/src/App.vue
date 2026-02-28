<template>
  <AnimationRoot ref="animationProvider" :initial-enabled="true" :auto-detect-performance="true">
    <!-- 全局动画控制UI -->
    <!-- <div class="animation-controls">
    <button @click="animationControl.toggle()">
      {{ animationControl.state.value.enabled ? '禁用所有动画' : '启用所有动画' }}
    </button>

    <select v-model="selectedMode" @change="onModeChange">
      <option value="all">全部动画</option>
      <option value="initial">仅初始动画</option>
      <option value="viewport">无视口动画</option>
      <option value="state">无状态动画</option>
    </select>
  </div> -->
    <!-- <CtlFnComponent></CtlFnComponent> -->
    <!-- 业务内容区域 -->
    <main>
      <!-- 示例1：使用UpMotion（推荐） -->
      <UpMotion :initial="{ opacity: 0, x: -150 }" :animate="{ opacity: 1, x: 0 }" :while-in-view="{ scale: 1.1 }"
        :transition="{ duration: 0.6 }" priority="decorative" @viewportEnter="console.log('进入视口')">
        <Motion as-child :while-hover="{ background: '#f00' }" :transition="{ duration: 1, ease: easeInOut }">
          <div class="card">
            <h2>自动受控的卡片</h2>
            <p>这个组件的动画会自动响应全局设置</p>
          </div>
        </Motion>
      </UpMotion>

      <!-- 示例2：使用预设动画组件 -->
      <!-- <SlideUp :transition="{ duration: 0.5 }">
        <div class="feature">
          <h3>预设淡入效果</h3>
        </div>
      </SlideUp> -->

      <!-- 示例3：嵌套使用 -->
      <!-- <UpMotion :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">
        <div class="parent">
          <UpMotion v-for="item in items" :key="item.id" :initial="{ scale: 0 }" :animate="{ scale: 1 }"
            :transition="{ delay: item.id * 0.1 }" class="child">
            {{ item.name }}
          </UpMotion>
        </div>
      </UpMotion> -->

      <!-- 示例4：深度嵌套的子组件 -->
      <!-- <UserProfile /> -->
    </main>
    <UpMotionExample>new motion</UpMotionExample>
  </AnimationRoot>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue';
import AnimationRoot from './components/AnimationRoot.ts';
import UpMotion from './components/UpMotion.ts';
// import { SlideUp } from './components/animations';
// import UserProfile from './components/UserProfile.vue';
import { useAnimation } from './composables/useAnimation.ts';
// import { FastForward } from 'lucide-vue-next';
import { easeInOut, Motion } from 'motion-v';
import UpMotionExample from './examples/UpMotionExample.vue';
// // 获取动画控制
// const animationControl = useAnimation()

// // 模式选择
// const selectedMode = computed({
//   get: () => animationControl.state.value.mode,
//   set: (value) => animationControl.enable(value as any)
// })

// const onModeChange = (event: Event) => {
//   const target = event.target as HTMLSelectElement
//   animationControl.enable(target.value as any)
// }
const CtlFnComponent = defineComponent({
  name: 'CtlFnComponent',
  setup() {
    const animationControl = useAnimation();
    const selectedMode = computed({
      get: () => animationControl.state.value.mode,
      set: (value) => animationControl.enable(value as any),
    });
    const onModeChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      animationControl.enable(target.value as any);
    };
    return {
      animationControl,
      selectedMode,
      onModeChange,
    };
  },
  template: `
  <div class="animation-controls">
    <button @click="animationControl.toggle()">
      {{ animationControl.state.value.enabled ? '禁用所有动画' : '启用所有动画' }}
    </button>

    <select v-model="selectedMode" @change="onModeChange">
      <option value="all">全部动画</option>
      <option value="initial">仅初始动画</option>
      <option value="viewport">无视口动画</option>
      <option value="state">无状态动画</option>
    </select>
  </div>
  `,
});

// 示例数据
const items = ref([
  { id: 1, name: '项目 1' },
  { id: 2, name: '项目 2' },
  { id: 3, name: '项目 3' },
]);
</script>

<style>
.animation-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card,
.feature,
.parent {
  padding: 20px;
  margin: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.child {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border-radius: 4px;
}
</style>
