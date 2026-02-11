import { computed, defineComponent, h, ref, useAttrs } from 'vue';
import { Motion, type MotionProps } from 'motion-v';
import { useAnimation, processMotionProps } from '../composables/useAnimation';

/**
 * @description: UpMotion组件属性接口，继承Motion的所有属性并扩展控制属性
 * @interface UpMotionProps
 * @extends {MotionProps}
 */
export interface UpMotionProps extends MotionProps {
	/**
	 * 是否禁用动画效果
	 * @type {boolean}
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * 动画优先级控制
	 * @type {'critical' | 'normal' | 'decorative'}
	 * @default 'normal'
	 */
	priority?: 'critical' | 'normal' | 'decorative';
}

/**
 * @description: 创建UpMotion组件实例
 * @param {UpMotionProps} props - 组件属性
 * @param {object} context - 组件上下文，包含slots等
 * @return {VNode} 渲染的虚拟DOM节点
 */
export default defineComponent<UpMotionProps>({
	name: 'UpMotion',

	/**
	 * @description: 组件setup函数，处理所有逻辑和响应式数据
	 * @param {UpMotionProps} props - 组件接收的属性
	 * @param {object} context - 组件上下文对象
	 * @param {Function} context.slots - 插槽函数
	 * @return {Function} 渲染函数
	 */
	setup(props, { slots }) {
		// 获取组件属性和上下文
		const attrs = useAttrs();
		const motionRef = ref();

		// 获取全局动画控制器
		const animationController = useAnimation();

		/**
		 * @description: 计算是否应该执行动画
		 * @return {boolean} 动画是否启用
		 */
		const shouldAnimate = computed(() => {
			// 如果组件被禁用，不执行动画
			if (props.disabled) return false;

			// 装饰性动画在低性能模式下被禁用
			if (
				props.priority === 'decorative' &&
				animationController.state.value.performance === 'low'
			) {
				return false;
			}

			// 返回全局动画控制状态
			return animationController.state.value.enabled;
		});

		/**
		 * @description: 处理并计算最终传递给Motion组件的属性
		 * @return {object} 处理后的属性对象
		 */
		const processedProps = computed(() => {
			// 合并attrs和props，然后通过processMotionProps处理
			const newProps = processMotionProps(
				{ ...attrs, ...props },
				{
					...animationController.state.value,
					enabled: shouldAnimate.value,
				},
			);
			return newProps;
		});

		/**
		 * @description: 渲染函数，返回Motion组件的虚拟DOM
		 * @return {VNode} Motion组件的虚拟节点
		 */
		return () => {
			// 使用any类型绕过严格的类型检查，确保组件能正常工作
			return h(
				Motion as any,
				{
					...processedProps.value,
					ref: motionRef,
				},
				[slots.default?.()],
			);
		};
	},
});
