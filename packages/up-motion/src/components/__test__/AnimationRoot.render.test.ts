import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AnimationRoot from '../AnimationRoot';
import { useAnimation } from '../../composables/useAnimation';
import { h, defineComponent, nextTick } from 'vue';

describe('AnimationRoot Browser Environment Test', () => {
	/**
	 * 测试在浏览器环境中的基本功能
	 * 验证AnimationRoot在真实DOM环境中的上下文提供能力
	 */
	test('should work correctly in browser environment with DOM access', async () => {
		const TestComponent = defineComponent({
			setup() {
				const animationContext = useAnimation();

				// 测试DOM访问能力
				const toggleAndCheck = () => {
					const initialState = animationContext.state.value.enabled;
					animationContext.toggle();
					return {
						initial: initialState,
						current: animationContext.state.value.enabled,
					};
				};

				return () =>
					h('div', { 'data-testid': 'browser-test' }, [
						h(
							'p',
							{ 'data-testid': 'state-display' },
							`Enabled: ${animationContext.state.value.enabled}, Mode: ${animationContext.state.value.mode}`,
						),
						h(
							'button',
							{
								'data-testid': 'toggle-btn',
								onClick: toggleAndCheck,
							},
							'Toggle Animation',
						),
					]);
			},
		});

		const wrapper = await mount(
			defineComponent({
				components: { AnimationRoot, TestComponent },
				template: `
				<AnimationRoot :initial-enabled="true" default-model="viewport">
					<TestComponent />
				</AnimationRoot>
			`,
			}),
			{
				attachTo: document.body, // 确保挂载到真实DOM
			},
		);

		await nextTick();

		// 验证初始状态
		const stateDisplay = wrapper.find('[data-testid="state-display"]').text();
		expect(stateDisplay).toContain('Enabled: true');
		expect(stateDisplay).toContain('Mode: viewport');

		// 测试交互功能
		const toggleButton = wrapper.find('[data-testid="toggle-btn"]');
		await toggleButton.trigger('click');

		// 验证状态切换
		const updatedStateDisplay = wrapper
			.find('[data-testid="state-display"]')
			.text();
		expect(updatedStateDisplay).toContain('Enabled: false');

		// 清理
		wrapper.unmount();
	});

	/**
	 * 测试性能检测功能在浏览器环境中的表现
	 */
	test('should handle performance detection in browser environment', async () => {
		const TestPerformanceComponent = defineComponent({
			setup() {
				const animationContext = useAnimation();
				return () =>
					h('div', { 'data-testid': 'performance-test' }, [
						JSON.stringify({
							performance: animationContext.state.value.performance,
							enabled: animationContext.state.value.enabled,
						}),
					]);
			},
		});

		const wrapper = await mount(
			defineComponent({
				components: { AnimationRoot, TestPerformanceComponent },
				template: `
				<AnimationRoot 
					:initial-enabled="true" 
					default-model="all"
					:auto-detect-performance="true"
				>
					<TestPerformanceComponent />
				</AnimationRoot>
			`,
			}),
			{
				attachTo: document.body,
			},
		);

		await nextTick();

		const performanceData = wrapper
			.find('[data-testid="performance-test"]')
			.text();
		const parsedData = JSON.parse(performanceData);

		// 在测试环境中，性能检测应该基于模拟的navigator数据
		expect(parsedData.performance).toBe('auto');
		// enabled状态取决于性能检测结果

		wrapper.unmount();
	});

	/**
	 * 测试多个实例的隔离性
	 */
	test('should maintain context isolation between multiple instances', async () => {
		const IsolatedTestComponent = defineComponent({
			props: ['instanceId'],
			setup(props) {
				const animationContext = useAnimation();
				return () =>
					h(
						'div',
						{
							'data-testid': `instance-${props.instanceId}`,
						},
						[
							JSON.stringify({
								id: props.instanceId,
								enabled: animationContext.state.value.enabled,
								mode: animationContext.state.value.mode,
							}),
						],
					);
			},
		});

		const wrapper = await mount(
			defineComponent({
				components: { AnimationRoot, IsolatedTestComponent },
				template: `
				<div>
					<AnimationRoot :initial-enabled="true" default-model="all">
						<IsolatedTestComponent instance-id="1" />
					</AnimationRoot>
					<AnimationRoot :initial-enabled="false" default-model="initial">
						<IsolatedTestComponent instance-id="2" />
					</AnimationRoot>
				</div>
			`,
			}),
			{
				attachTo: document.body,
			},
		);

		await nextTick();

		// 验证第一个实例的状态
		const instance1Data = wrapper.find('[data-testid="instance-1"]').text();
		const instance1 = JSON.parse(instance1Data);
		expect(instance1.enabled).toBe(true);
		expect(instance1.mode).toBe('all');

		// 验证第二个实例的状态
		const instance2Data = wrapper.find('[data-testid="instance-2"]').text();
		const instance2 = JSON.parse(instance2Data);
		expect(instance2.enabled).toBe(false);
		expect(instance2.mode).toBe('initial');

		wrapper.unmount();
	});
});
