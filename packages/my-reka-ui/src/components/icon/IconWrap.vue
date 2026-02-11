<script setup lang="ts">
import { computed, useTemplateRef, watchEffect, type PropType } from 'vue';
import {
	useAnimate,
	type UseAnimateKeyframes,
	type UseAnimateOptions,
} from '@vueuse/core';
import * as icons from 'lucide-vue-next';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	size: Number,
	color: String,
	strokeWidth: Number,
	defaultClass: String,
	animation: {
		type: Boolean,
		default: false,
	},
	keyframe: {
		type: Object as PropType<UseAnimateKeyframes>,
		default: [{ transform: `rotate(0deg)` }, { transform: `rotate(360deg)` }],
	},
	options: {
		type: Object as PropType<number | UseAnimateOptions>,
		default: {
			duration: 3000,
			iterations: Infinity,
		},
	},
});

const iconEl = useTemplateRef<HTMLElement>('iconRef');

watchEffect(() => {
	if (props.animation && iconEl.value) {
		const { play } = useAnimate(
			iconEl.value,
			// [{ color: 'var(--color-red-500)' }, { color: 'var(--color-blue-500)' }],
			props.keyframe,
			props.options,
		);
		play();
	}
});

// 为 icons 对象创建一个类型安全的访问方式
const icon = computed(() => (icons as Record<string, unknown>)[props.name]);
</script>

<template>
	<component
		ref="iconRef"
		:is="icon"
		:size="size"
		:color="color"
		:stroke-width="strokeWidth"
		:default-class="defaultClass"
	/>
</template>
