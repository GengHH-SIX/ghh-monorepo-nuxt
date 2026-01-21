<script setup lang="ts">
import { Slot } from 'reka-ui';
</script>

<template>
	<Slot>
		<button class="bg-white p-10 rounded-sm m-5">
			<slot></slot>
		</button>
	</Slot>
</template>
