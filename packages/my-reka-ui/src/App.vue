<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue';
import RekaDemo from './components/RekaDemo.vue';
import InfoCard from './components/Card/InfoCard.vue';
import Button from './components/Button/Button.vue';
import IconWrap from './components/Icon/IconWrap.vue';
</script>

<template>
	<InfoCard />
	<Button class="inline-flex align-middle" type="primary">
		><IconWrap :name="'Mail'" :size="16" animation></IconWrap>
		点击！！！</Button>
	<RekaDemo />
	<!-- <AschildTest /> -->
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
