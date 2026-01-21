<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';
import { cn } from '@monorepo-nuxt/my-shared';

type ImgInfo = {
	src?: string;
	alt?: string;
	placeholder?: string;
};

let imgInfo: ImgInfo = withDefaults(defineProps<ImgInfo>(), {
	alt: 'Noting',
	src: 'https://placehold.co/200x200',
	placeholder: 'GH',
});
</script>

<template>
	<div>
		<div :class="cn(`avatar grid grid-cols-1 gap-20`)">
			<AvatarRoot :class="cn(`AvatarRoot`, `w-60 h-60`)">
				<AvatarImage
					:class="
						cn(
							`AvatarImage hover:opacity-85 hover:scale-150 transition-all duration-300`,
						)
					"
					:src="imgInfo.src || 'https://placehold.co/200x200'"
					:alt="imgInfo.alt"
				/>
				<AvatarFallback class="AvatarFallback" :delay-ms="600">
					{{ imgInfo.placeholder }}
				</AvatarFallback>
			</AvatarRoot>

			<!-- <AvatarRoot class="AvatarRoot">
				<AvatarFallback class="AvatarFallback"> PD </AvatarFallback>
			</AvatarRoot> -->
		</div>
	</div>
</template>
