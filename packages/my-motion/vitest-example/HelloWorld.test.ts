import { expect, test } from 'vitest';
import { render } from 'vitest-browser-vue';
import HelloWorld from './HelloWorld.vue';
import { page } from 'vitest/browser';

test('renders name', async () => {
	page.getByText('Vitest');
	const { getByText } = render(HelloWorld, {
		props: { name: 'Vitest' },
	});
	await expect.element(getByText('Hello Vitest!')).toBeInTheDocument();
});
