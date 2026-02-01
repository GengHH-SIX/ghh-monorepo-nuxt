import { ref, readonly, onMounted, provide, inject } from 'vue';
import type { Ref, InjectionKey } from 'vue';

/**
 * @description: typeof animation state
 * @return {*}
 */
export interface AnimationState {
	enabled: boolean;
	mode: 'all' | 'initial' | 'viewport' | 'state';
	performance: 'auto' | 'low' | 'high';
}
/**
 * @description: typeof animation controll
 * @return {*}
 */
export interface AnimationControl {
	state: Readonly<Ref<AnimationState>>;
	toggle: () => void;
	enable: (model?: AnimationState['mode']) => void;
	disable: (model?: AnimationState['mode']) => void;
	setPerformance: (level: AnimationState['performance']) => void;
}

/**
 * @description: injection key for animation context
 * @return {*}
 */
const AnimationInjectKey: InjectionKey<AnimationControl> =
	Symbol('animation-context');

export function createAnimationContext(
	initialState: Partial<AnimationState>,
): AnimationControl {
	// defined context initial state
	const state = ref<AnimationState>({
		enabled: true,
		mode: 'all',
		performance: 'auto',
		...initialState,
	});

	/**
	 * @description: auto check performance level
	 * @return {*}
	 */
	const detectProformace = () => {
		if (state.value.performance === 'auto') {
			const navigator: any = window.navigator;
			(console.log('[useAnimation]: detect performance level'),
				navigator.connection.effectiveType);
			const isLowEndDevice =
				/(Android | Webos | Iphone | Ipad)/i.test(navigator.userAgent) ||
				(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
				(navigator as any).connection
					? navigator.connection.effectiveType.includes('2g')
					: false;
			state.value.enabled = !isLowEndDevice;
		}
	};

	onMounted(() => {
		detectProformace();
	});

	const control: AnimationControl = {
		state: readonly(state),
		toggle: () => {
			state.value.enabled = !state.value.enabled;
		},
		enable: (model = 'all') => {
			state.value.enabled = true;
			state.value.mode = model;
		},
		disable: (model = 'all') => {
			if (model === 'all') {
				state.value.enabled = false;
			} else {
				state.value.mode = model;
			}
		},
		setPerformance: (level) => {
			state.value.performance = level;
			detectProformace();
		},
	};

	return control;
}
/**
 * @description: provide data in animation context
 * @param {AnimationControl} control
 * @return {*}
 */
export function provideAnimation(control: AnimationControl) {
	provide(AnimationInjectKey, control);

	/**
	 * @description: Inject animation context, use all animation data;
	 * @return {*}
	 */
}
export function useAnimation() {
	const cxt = inject(AnimationInjectKey) as AnimationControl;
	if (!cxt) {
		throw new Error(
			'[useAnimation]: missing animation context;useAnimation must be used within AnimationProvider.',
		);
	} else {
		return cxt;
	}
}

export function processMotionProps(props: any, state: AnimationState): any {
	if (!state.enabled) {
		return {
			...props,
			initial: props.initial === false ? false : {},
			animate: {},
			whileInView: false,
			transition: { duration: 0 },
		};
	}

	// 部分模式控制
	const processed = { ...props };

	if (state.mode === 'initial') {
		processed.animate = {};
		processed.whileInView = false;
	} else if (state.mode === 'viewport') {
		processed.whileInView = false;
	} else if (state.mode === 'state') {
		processed.initial = false;
	}

	return processed;
}
