import ControlledMotion from '../ControlledMotion.vue';
import { defineComponent, h } from 'vue';

/**
 * 创建预设动画的高阶函数
 * 这个函数接收预设属性并返回一个可复用的组件创建函数
 *
 * @param presetProps - 预设的动画属性配置对象
 * @returns 返回一个函数，该函数接受覆盖属性和插槽作为参数，并定义一个新的组件
 */
function createPresetMotion(presetProps: any) {
	/**
	 * 返回的函数用于创建具体的动画组件
	 *
	 * @param overrideProps - 要覆盖的属性，默认为空对象
	 * @param slots - 插槽对象，默认为空对象
	 * @returns 返回使用defineComponent定义的新组件
	 */
	return (overrideProps: any = {}, slots: any = {}) =>
		defineComponent({
			components: { ControlledMotion },
			// 使用传入的覆盖属性的键作为组件props
			props: Object.keys(overrideProps || {}),
			render() {
				// 合并预设属性和当前组件的props
				const mergedProps = { ...presetProps, ...this.$props };
				console.log('Motion props:', slots.defaule, this);
				// const children = slots.default
				// 	? slots.default()
				// 	: this.$slots.default?.();

				const _slots = slots.default ? slots : this.$slots;
				// 使用合并后的属性和插槽渲染ControlledMotion组件
				return h(ControlledMotion, mergedProps, _slots);
			},
		});
}

// 预设动画组件
export const FadeIn = createPresetMotion({
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 3 },
})();

export const SlideUp = createPresetMotion({
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { type: 'spring', stiffness: 300 },
})();

export const ScaleIn = createPresetMotion({
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	transition: { duration: 0.4 },
})();

export const StaggerChildren = createPresetMotion({
	variants: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	},
	initial: 'hidden',
	animate: 'visible',
})();

// 视口触发动画
export const ViewportReveal = createPresetMotion({
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 },
})();
