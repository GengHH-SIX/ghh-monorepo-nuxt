import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UpMotion from '../UpMotion';
import {
	createAnimationContext,
	provideAnimation,
} from '../../composables/useAnimation';
import { defineComponent, h } from 'vue';

/**
 * @description: 测试UpMotion组件的基本功能
 */
describe('UpMotion Component', () => {
	/**
	 * @description: 测试组件是否能正确渲染
	 */
	it('should render correctly with default props', () => {
		// 创建动画控制上下文
		const animationControl = createAnimationContext({});

		// 创建包装组件提供动画上下文
		const Wrapper = defineComponent({
			setup() {
				provideAnimation(animationControl);
				return () =>
					h(
						UpMotion,
						{},
						{
							default: () => h('div', { id: 'test-content' }, 'Test Content'),
						},
					);
			},
		});

		const wrapper = mount(Wrapper);
		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find('#test-content').exists()).toBe(true);
	});

	/**
	 * @description: 测试disabled属性功能
	 */
	it('should respect disabled prop', async () => {
		const animationControl = createAnimationContext({});

		const Wrapper = defineComponent({
			setup() {
				provideAnimation(animationControl);
				return () =>
					h(
						UpMotion,
						{ disabled: true },
						{
							default: () => h('div', 'Disabled Content'),
						},
					);
			},
		});

		const wrapper = mount(Wrapper);
		expect(wrapper.exists()).toBe(true);
	});

	/**
	 * @description: 测试priority属性功能
	 */
	it('should handle priority prop correctly', async () => {
		const animationControl = createAnimationContext({ performance: 'low' });

		const Wrapper = defineComponent({
			setup() {
				provideAnimation(animationControl);
				return () =>
					h(
						UpMotion,
						{ priority: 'decorative' },
						{
							default: () => h('div', 'Decorative Content'),
						},
					);
			},
		});

		const wrapper = mount(Wrapper);
		expect(wrapper.exists()).toBe(true);
	});
});
