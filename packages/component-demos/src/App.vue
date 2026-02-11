<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { RekaButton, RekaInfoCard } from '@monorepo-nuxt/my-reka-ui';
</script>

<template>
	<div>
		<a href="https://vite.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
	<h1 class="text-red-500 text-xl">Vite + Vue</h1>
	<HelloWorld class="text-red-500 text-8xl bg-black" msg="Vite + Vue" />
	<RekaButton class="text-red-500"> 点击哈哈哈 </RekaButton>
	<RekaInfoCard></RekaInfoCard>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
