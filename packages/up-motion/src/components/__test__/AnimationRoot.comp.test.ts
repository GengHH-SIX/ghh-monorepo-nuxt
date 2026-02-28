import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AnimationRoot from '../AnimationRoot';
import { useAnimation } from '../../composables/useAnimation';
import { h, defineComponent } from 'vue';
// import UpMotion from '../UpMotion';

// test('test', () => {
// 	expect(true).toBe(true);
// });

// describe("AnimationRoot",() => {
//   test("test", () => {
//     expect(true).toBe(true);
//   });
// })

// The component to test
const MessageComponent = {
	template: '<p>{{ msg }}</p>',
	props: ['msg'],
};

test('displays message', async () => {
	const wrapper = await mount(MessageComponent, {
		props: {
			msg: 'Hello world',
		},
	});
	// Assert the rendered text of the component
	expect(wrapper.text()).toContain('Hello world');
});

describe('AnimationRoot Component Test', () => {
	const donotAutoDetectPerformance = {
		autoDetectPerformance: false,
	};
	test('test root text slots', () => {
		const wrapper = mount(AnimationRoot, {
			props: donotAutoDetectPerformance,
			slots: {
				default: 'Hello world',
			},
		});
		expect(wrapper.html()).toContain('Hello world');
		//or
		expect(wrapper.text()).toContain('Hello world');
	});
	test('test root dom slots', () => {
		const wrapper = mount(AnimationRoot, {
			props: donotAutoDetectPerformance,
			slots: {
				default: '<span>Hello world</span>',
			},
		});
		expect(wrapper.html()).toContain('<span>Hello world</span>');
		// or
		expect(wrapper.find('span').text()).toContain('Hello world');
	});
	test('test root up-motion component slots', () => {
		const wrapper = mount(AnimationRoot, {
			props: donotAutoDetectPerformance,
			slots: {
				// TODO
				default: '<UpMotion>Hello world</UpMotion>',
			},
		});
		expect(wrapper.find('div').text()).toContain('Hello world');
	});
});

describe('AnimationRoot Component Props Test', () => {
	/**
	 * 测试AnimationRoot组件的基本属性传递功能
	 * 验证initialEnabled和defaultModel属性能否正确传递给上下文
	 */
	test('should provide correct context with initialEnabled and defaultModel props', async () => {
		// 创建测试子组件来验证注入的数据
		const TestChild = defineComponent({
			setup() {
				const animationContext = useAnimation();
				return () =>
					h('div', { 'data-testid': 'child-content' }, [
						JSON.stringify(animationContext.state.value),
					]);
			},
		});

		// 挂载带有AnimationRoot提供者的完整组件树
		const wrapper = await mount(
			defineComponent({
				components: { AnimationRoot, TestChild },
				template: `
				<AnimationRoot 
					:initial-enabled="false" 
					default-model="initial"
					:auto-detect-performance="false"
				>
					<TestChild />
				</AnimationRoot>
			`,
			}),
		);

		// 等待组件渲染完成
		await wrapper.vm.$nextTick();

		// 验证子组件能够正确接收到注入的数据
		const childContent = wrapper.find('[data-testid="child-content"]').text();
		const state = JSON.parse(childContent);

		expect(state.enabled).toBe(false);
		expect(state.mode).toBe('initial');
		expect(state.performance).toBe('low');
	});

	/**
	 * 测试默认属性值
	 */
	test('should use default props when not provided', async () => {
		const TestChild = defineComponent({
			setup() {
				const animationContext = useAnimation();
				return () =>
					h('div', { 'data-testid': 'default-child' }, [
						JSON.stringify(animationContext.state.value),
					]);
			},
		});

		const wrapper = await mount(
			defineComponent({
				components: { AnimationRoot, TestChild },
				template: `
				<AnimationRoot>
					<TestChild />
				</AnimationRoot>
			`,
			}),
		);

		await wrapper.vm.$nextTick();

		const childContent = wrapper.find('[data-testid="default-child"]').text();
		const state = JSON.parse(childContent);

		expect(state.enabled).toBe(true);
		expect(state.mode).toBe('all');
		expect(state.performance).toBe('auto');
	});
});

describe('AnimationRoot Context Provider Test', () => {
	/**
	 * 测试AnimationRoot正确提供动画上下文
	 * 使用更直接的方式验证provide/inject机制
	 */
	test('should provide animation context that can be consumed by child components', async () => {
		let capturedContext: any;

		// 创建测试组件来捕获上下文
		const ConsumerComponent = defineComponent({
			setup() {
				capturedContext = useAnimation();
				return () => h('div', { 'data-testid': 'consumer' }, 'Consumer ready');
			},
		});

		// 挂载完整的组件树，明确禁用性能检测
		const wrapper = await mount(
			defineComponent({
				components: { AnimationRoot, ConsumerComponent },
				template: `
				<AnimationRoot 
					:initial-enabled="false" 
					default-model="viewport"
					:auto-detect-performance="false"
				>
					<ConsumerComponent />
				</AnimationRoot>
			`,
			}),
		);

		await wrapper.vm.$nextTick();

		// 验证上下文被正确提供和消费
		expect(capturedContext).toBeDefined();
		expect(capturedContext.state.value.enabled).toBe(false);
		expect(capturedContext.state.value.mode).toBe('viewport');
		expect(capturedContext.state.value.performance).toBe('low');
		expect(typeof capturedContext.toggle).toBe('function');
		expect(typeof capturedContext.enable).toBe('function');
		expect(typeof capturedContext.disable).toBe('function');
	});

	/**
	 * 测试嵌套AnimationRoot的上下文隔离
	 */
	test('should maintain context isolation in nested providers', async () => {
		let outerContext: any;
		let innerContext: any;

		const OuterConsumer = defineComponent({
			setup() {
				outerContext = useAnimation();
				return () =>
					h('div', { 'data-testid': 'outer-consumer' }, 'Outer consumer');
			},
		});

		const InnerConsumer = defineComponent({
			setup() {
				innerContext = useAnimation();
				return () =>
					h('div', { 'data-testid': 'inner-consumer' }, 'Inner consumer');
			},
		});

		const wrapper = await mount(
			defineComponent({
				components: { AnimationRoot, OuterConsumer, InnerConsumer },
				template: `
				<AnimationRoot 
					:initial-enabled="true" 
					default-model="all"
					:auto-detect-performance="false"
				>
					<OuterConsumer />
					<AnimationRoot 
						:initial-enabled="false" 
						default-model="initial"
						:auto-detect-performance="false"
					>
						<InnerConsumer />
					</AnimationRoot>
				</AnimationRoot>
			`,
			}),
		);

		await wrapper.vm.$nextTick();

		// 验证外层上下文
		expect(outerContext.state.value.enabled).toBe(true);
		expect(outerContext.state.value.mode).toBe('all');
		expect(outerContext.state.value.performance).toBe('low');

		// 验证内层上下文（应该覆盖外层）
		expect(innerContext.state.value.enabled).toBe(false);
		expect(innerContext.state.value.mode).toBe('initial');
		expect(innerContext.state.value.performance).toBe('low');
	});
});
