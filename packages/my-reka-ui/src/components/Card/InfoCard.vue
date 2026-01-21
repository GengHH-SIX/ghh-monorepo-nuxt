<script setup lang="ts">
import { Info } from 'lucide-vue-next';
import InfoCardAvatar from './InfoCardAvatar.vue';
import InfoCardMessage from './InfoCardMessage.vue';
import { cn } from '@monorepo-nuxt/my-shared';

const avatarInfo = {
	src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
	alt: 'Colm Tuite',
};
</script>

<template>
	<div>
		<div
			:class="
				cn(
					`avatar flex flex-col bg-white gap-20 min-w-200 max-w-300 h-full `,
					`align-middle justify-center items-center p-15`,
					`rounded-md`,
				)
			"
		>
			<InfoCardAvatar v-bind="avatarInfo" />
			<!-- <div>this is someone</div> -->
			<InfoCardMessage>
				<Info></Info>
				<!-- <button class="bg-black">clickme</button> -->
			</InfoCardMessage>
		</div>
	</div>
</template>
