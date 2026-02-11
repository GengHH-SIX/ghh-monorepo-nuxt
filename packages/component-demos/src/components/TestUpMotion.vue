<script setup lang="ts">
// import {AnimationRoot} from 'up-motion';
import { AnimationRoot, ControlledMotion } from 'up-motion';

</script>

<template>
  <h3>Up Motion Test</h3>
  <AnimationRoot>
    <ControlledMotion :initial="{ opacity: 0, x: -150 }" :animate="{ opacity: 1, x: 0 }" :while-in-view="{ scale: 1.1 }"
      :transition="{ duration: 0.6 }" priority="decorative">
      <Motion :while-hover="{ background: '#0f0' }" :transition="{ duration: 1 }">
        <div class="card w-100 h-100 bg-amber-300">
          ...
          asdfasdfasdfasdf
        </div>
      </Motion>
    </ControlledMotion>
    <ControlledMotion></ControlledMotion>
  </AnimationRoot>
  <AnimationRoot></AnimationRoot>
</template>
