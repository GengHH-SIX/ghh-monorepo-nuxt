<script setup lang="ts">
import IconWrap from '../Icon/IconWrap.vue';
import { cn } from '@monorepo-nuxt/my-shared';
type InfoCardMessage = {
	name?: string;
	email?: string;
	phone?: string;
	github?: string;
	webSite?: string;
};
const msg = withDefaults(defineProps<InfoCardMessage>(), {
	name: 'username',
	email: 'template@email.com',
	phone: '+1 (555) 555-5555',
	github: 'https://github.com/username',
	webSite: 'https://username.com',
});
const click = () => {
	alert('clicked');
};
</script>

<template>
	<div class="felx">
		<p class="nameMsg w-full text-xl text-gray-500/80 text-center">
			{{ msg.name }}
		</p>
		<p
			class="inline-flex-center w-full text-gray-300/80 text-sm hover:text-gray-600/85"
		>
			<IconWrap :name="'Mail'" :class="cn(`p-2 pr-5`)" />{{ msg.email }}
		</p>
		<p
			v-if="msg.phone"
			class="inline-flex-center w-full text-gray-300/80 text-sm hover:text-gray-600/85"
		>
			<IconWrap :name="'PhoneForwarded'" :class="cn(`p-2 pr-5`)" />{{
				msg.phone
			}}
		</p>
		<p
			v-if="msg.github"
			class="inline-flex-center w-full text-gray-300/80 text-sm hover:text-gray-600/85"
		>
			<IconWrap :name="'Github'" :class="cn(`p-2 pr-5`)" />{{ msg.github }}
		</p>
		<p
			v-if="msg.webSite"
			class="inline-flex-center w-full text-gray-300/80 text-sm hover:text-gray-600/85"
		>
			<IconWrap :name="'Webcam'" :class="cn(`p-2 pr-5`)" />{{ msg.webSite }}
		</p>
	</div>
	<Button
		class="btn flex w-[80%] text-white bg-black pl-10 pr-10 pt-5 pb-5 text-sm justify-center items-center rounded-md cursor-pointer"
		@click="click"
	>
		<IconWrap
			:name="'CircleArrowRight'"
			:class="cn(`mr-5`)"
			:size="16"
		></IconWrap>
		click me
	</Button>
</template>
