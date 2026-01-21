<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue';
import RekaDemo from './components/RekaDemo.vue';
import InfoCard from './components/Card/InfoCard.vue';
import Button from './components/Button/Button.vue';
</script>

<template>
	<InfoCard />
	<Button>点击！！！</Button>
	<RekaDemo />
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
