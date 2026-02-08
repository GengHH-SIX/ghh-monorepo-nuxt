import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

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

test('displays message', () => {
	const wrapper = mount(MessageComponent, {
		props: {
			msg: 'Hello world',
		},
	});

	// Assert the rendered text of the component
	expect(wrapper.text()).toContain('Hello world');
});
