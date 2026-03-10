# up-motion

## Why use?

### This is a more advanced motion-v tool library, which is not only fully compatible with motion-v's functions, but also adds a global control function for initializing animations; It can also automatically analyze the performance of the user's environment and actively judge whether some animations should not be executed. In addition, it is also possible to play and disable animations at the component level;

### How to use ？

## 1. Install

```
pnpm add motion-v up-motion;
```

## 2. Import

```
import {AnimationRoot,UpMotion} from 'up-motion';
```

## 3. Use

```vue
<AnimationRoot :initial-enabled="true" :auto-detect-performance="true">
    <UpMotion :initial="{ opacity: 0, x: -150 }" :animate="{ opacity: 1, x: 0 }"
      :while-in-view="{ scale: 1.1 }" :transition="{ duration: 0.6 }" priority="decorative">
      <Motion as-child :while-hover="{ background: '#f00' }" :transition="{ duration: 1, ease: easeInOut }">
        <div class="card">
          ... 
        </div>
      </Motion>
    </UpMotion>
  </AnimationRoot>
```

## Document

#### Docs building... (Will be Builded by nuxt and shadcn-vue!)
