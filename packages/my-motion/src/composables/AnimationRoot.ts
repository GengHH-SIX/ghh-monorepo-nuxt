import { createAnimationContext, provideAnimation } from './useAnimation';
import { defineComponent, h, type PropType } from 'vue';

export interface RootProps {
	initialEnabled?: boolean;
	defaultModel?: 'all' | 'initial' | 'viewport' | 'state';
	autoDetectPerformance?: boolean;
}
/**
 * @description: define animation provider component named AnimationRoot
 * @return {*}
 */
export default defineComponent({
	name: 'AnimationRoot',
	props: {
		initialEnabled: {
			type: Boolean,
			default: true,
		},
		defaultModel: {
			type: String as PropType<'all' | 'initial' | 'viewport' | 'state'>,
			default: 'all',
		},
		autoDetectPerformance: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { slots }) {
		console.log('AnimationRoot props:', props);
		// const props = defineProps<RootProps>();
		const control = createAnimationContext({
			enabled: props.initialEnabled ?? true,
			mode: props.defaultModel ?? 'all',
			performance: props.autoDetectPerformance ? 'auto' : 'low',
		});

		provideAnimation(control);

		// defineExpose(control);

		return () => {
			return h('div', props, [slots.default?.()]);
		};
	},
});
