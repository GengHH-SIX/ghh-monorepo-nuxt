import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.esm-bundler.js'
		}
	},
	test: {
		globals: true,
		include: [
			'src/**/*.{test,spec}.{js,ts}',
			'src/**/__test__/**/*.{test,spec}.{js,ts}'
		],
		// Vitest 浏览器模式 (组件测试)
		browser: {
			enabled: true,
			provider: playwright(),
			// https://vitest.dev/config/browser/playwright
			instances: [{ browser: 'chromium' }],
		},
	},
});