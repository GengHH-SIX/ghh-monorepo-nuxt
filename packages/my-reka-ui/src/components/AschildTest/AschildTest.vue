<script setup lang="ts">
import {
	TooltipRoot,
	TooltipTrigger,
	TooltipPortal,
	DialogRoot,
	DialogTrigger,
	DialogPortal,
} from 'reka-ui';
import Button from '../Button/Button.vue';
</script>

<template>
	<DialogRoot>
		<TooltipRoot>
			<TooltipTrigger>
				<DialogTrigger>
					<Button>Open dialog</Button>
				</DialogTrigger>
			</TooltipTrigger>
			<TooltipPortal>…</TooltipPortal>
		</TooltipRoot>

		<DialogPortal>...</DialogPortal>
	</DialogRoot>
</template>
