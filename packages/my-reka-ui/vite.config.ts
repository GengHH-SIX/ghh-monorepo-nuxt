import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(),
		dts({
			outDir: 'dist/types',
			include: ['src/**/*.ts', 'src/**/*.vue'],
			tsconfigPath: './tsconfig.app.json',  // 指定要使用的 tsconfig 文件
			compilerOptions: {
				// 确保声明文件被生成
				declaration: true,
				emitDeclarationOnly: true,
			},
			// 启用组合模式生成单一类型文件
			rollupTypes: true,
			insertTypesEntry: true, // 生成 index.d.ts 类型入口文件
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@/components/*': resolve(__dirname, 'src/components/*'),
			'@monorepo-nuxt': resolve(__dirname, '../'),
		},
	},
	build: {
		sourcemap: true,  // 启用源码映射
		cssCodeSplit: false,  // 确保 CSS 被打包到一个文件中
		outDir: 'dist',
		// 添加 lib 选项以支持样式输出
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'RekaComponentLibrary',
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
				// 提供清晰的导出
				exports: 'named',
				// 确保资产文件（如 CSS）正确输出
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === 'style.css') {
						return 'style.css';
					}
					return assetInfo.name;
				}
			},
		},
	},
});