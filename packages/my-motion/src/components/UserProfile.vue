<template>
  <!-- 业务组件完全使用标准API -->
  <UpMotion :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }" :while-hover="{ scale: 1.02 }"
    class="profile-card">
    <div class="avatar-container">
      <UpMotion :initial="{ scale: 0 }" :animate="{ scale: 1 }" :transition="{ type: 'spring' }">
        <img :src="user.avatar" class="avatar" />
      </UpMotion>
    </div>

    <div class="info">
      <UpMotion :initial="{ x: -20 }" :animate="{ x: 0 }" :transition="{ delay: 0.1 }">
        <h2>{{ user.name }}</h2>
      </UpMotion>

      <UpMotion :initial="{ x: -20 }" :animate="{ x: 0 }" :transition="{ delay: 0.2 }">
        <p>{{ user.bio }}</p>
      </UpMotion>
    </div>
  </UpMotion>
</template>

<script setup lang="ts">
// 重点：业务组件完全不需要知道动画控制逻辑！
// 它只是正常使用UpMotion组件
import UpMotion from '../components/UpMotion'

const user = {
  name: '张三',
  avatar: 'https://example.com/avatar.jpg',
  bio: '前端开发者，热爱动画与交互设计'
}
</script>

<style scoped>
.profile-card {
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
