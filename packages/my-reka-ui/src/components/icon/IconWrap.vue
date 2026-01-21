<script setup lang="ts">
import { computed } from 'vue';
import * as icons from 'lucide-vue-next';
console.log(icons);
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	size: Number,
	color: String,
	strokeWidth: Number,
	defaultClass: String,
});

// 为 icons 对象创建一个类型安全的访问方式
const icon = computed(() => (icons as Record<string, unknown>)[props.name]);
</script>

<template>
	<component
		:is="icon"
		:size="size"
		:color="color"
		:stroke-width="strokeWidth"
		:default-class="defaultClass"
	/>
</template>
