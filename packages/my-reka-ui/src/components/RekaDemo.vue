<script setup lang="ts">
import { cn } from '@monorepo-nuxt/my-shared';
import {
	PopoverArrow,
	PopoverClose,
	PopoverContent,
	PopoverPortal,
	PopoverRoot,
	PopoverTrigger,
} from 'reka-ui';
</script>

<template>
	<div class="text-red-500 hover:text-blue-100 shadow-amber-500">hahha</div>
	<PopoverRoot class="flex items-center justify-center">
		<PopoverTrigger :class="cn('PopoverTrigger bg-red-500 p-2 rounded-md')">
			More info
		</PopoverTrigger>
		<PopoverPortal>
			<PopoverContent class="w-full h-full bg-red-500/50 p-10 rounded-md">
				Some more info...
				<PopoverClose />
				<PopoverArrow class="PopoverArrow" />
			</PopoverContent>
		</PopoverPortal>
	</PopoverRoot>
</template>

<style>
.PopoverTrigger {
	/* background-color: rgb(210, 31, 31); */
	border-radius: 4px;
}

.PopoverContent {
	border-radius: 4px;
	padding: 20px;
	width: 260px;
	background-color: white;
}

.PopoverArrow {
	background-color: white;
}
</style>
