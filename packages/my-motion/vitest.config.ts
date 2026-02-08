/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	// outputfile: '',
	test: {
		globals: true,
		reporters: ['default'],
		// 测试覆盖率
		coverage: {
			provider: 'v8',
			enabled: true,
			include: ['src/**/*.{ts,vue}'],
			exclude: [
				'src/**/*.test.ts',
				'src/**/*.spec.ts',
				'src/components/index.ts',
				'src/components/HelloWorld.vue',
				'src/main.ts',
				'src/App.vue',
			],
		},
		projects: [
			{
				test: {
					// Vitest + node (单元测试)
					name: 'Unit',
					environment: 'node',
					// setupFiles: ['./src/setupTests.ts'],
					// include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
					include: [
						'src/**/*.unit.test.{js,ts}', // 单元测试文件
						'src/**/*.unit.spec.test.{js,ts}', // 单元测试文件
						'src/**/*.test.{js,ts}', // 所有.test文件（不含.comp.test）
						'src/**/*.spec.{js,ts}',
						// '!src/**/*.comp.test.{js,ts}', // 排除组件测试
						// '!src/**/*.comp.spec.test.{js,ts}', // 排除组件测试
					],
					exclude: [
						'src/**/*.comp.test.{js,ts}',
						'src/**/*.comp.spec.test.{js,ts}',
					],
				},
			},
			{
				test: {
					// Vitest + jsdom (组件测试)
					name: 'Component',
					environment: 'jsdom',
					// setupFiles: ['./src/setupTests.ts'],
					// include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
					include: [
						'src/**/*.comp.test.{js,ts}',
						'src/**/*.comp.spec.test.{js,ts}',
					], // 只包含组件测试
					exclude: [
						'src/**/*.unit.test.{js,ts}',
						'src/**/*.unit.spec.test.{js,ts}',
					],
				},
			},
		],
	},
});
