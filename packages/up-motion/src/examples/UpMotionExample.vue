<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">UpMotion 组件示例</h2>

    <!-- 基础使用 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">基础动画</h3>
      <UpMotion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.5 }">
        <div class="bg-blue-100 p-4 rounded">
          这是一个基础的下滑动画效果
        </div>
      </UpMotion>
    </div>

    <!-- 禁用动画 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">禁用动画</h3>
      <UpMotion :disabled="true" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }">
        <div class="bg-red-100 p-4 rounded">
          这个动画被禁用了
        </div>
      </UpMotion>
    </div>

    <!-- 装饰性动画 -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">装饰性动画</h3>
      <UpMotion priority="decorative" :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.3 }">
        <div class="bg-green-100 p-4 rounded">
          这是一个装饰性动画，在低性能设备上可能被禁用
        </div>
      </UpMotion>
      <UpMotion></UpMotion>
    </div>
  </div>
</template>

<script setup lang="ts">
import UpMotion from '../components/UpMotion';
</script>
