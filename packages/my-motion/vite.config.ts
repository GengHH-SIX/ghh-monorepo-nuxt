import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
			outDir: resolve(__dirname, 'dist'),
			include: ['src'],
			exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
			rollupTypes: true,
			copyDtsFiles: true,
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			vue: 'vue/dist/vue.esm-bundler.js',
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'up-motion',
			fileName: (format) => {
				const formats: Record<string, string> = {
					es: 'up-motion.js',
					// umd: 'up-motion.umd.cjs',
					cjs: 'up-motion.cjs',
				};
				return formats[format] || `up-motion.${format}.js`;
			},
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['vue', 'motion-v'],
			output: {
				globals: {
					vue: 'Vue',
					'motion-v': 'MotionV',
				},
				exports: 'named',
				inlineDynamicImports: false,
				// TODO 手动分块， Tree-Shaking
				// 代码分割配置
				manualChunks: (id) => {
					// 将工具函数单独打包
					if (id.includes('src/composables/')) {
						return 'composables';
					}
					if (id.includes('src/components/')) {
						return 'components';
					}
					if (id.includes('src/animations/')) {
						return 'animations';
					}
					// 第三方依赖
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				},
				// 2. 【新增】为代码分割产生的“块”文件定义命名规则
				chunkFileNames: (chunkInfo) => {
					// chunkInfo.name 就是 manualChunks 函数返回的字符串（如 'composables'）
					const fileNameMap: Record<string, string> = {
						vendor: 'vendor', // 第三方依赖包
						composables: 'composables',
						components: 'components',
						animations: 'animations',
					};
					const name = fileNameMap[chunkInfo.name] || chunkInfo.name;
					// 根据格式返回对应的后缀名，与你的 fileName 函数逻辑保持一致
					if (chunkInfo.moduleIds.some((id) => id.includes('node_modules'))) {
						// 如果是vendor，通常希望是.cjs
						return `[format]/${name}.cjs`;
					}
					return `[format]/${name}.[format].js`;
				},
				// 3. （可选但推荐）显式定义入口文件的命名规则，确保清晰
				entryFileNames: '[format]/up-motion.[format].js',
				// 压缩配置
				compact: true,
				minifyInternalExports: true,
			},
		},
		target: 'es2018',
		outDir: 'dist',
		emptyOutDir: true,
		//压缩代码
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				// TODO
			},
		},
		cssCodeSplit: true,
		sourcemap: false,
		polyfillModulePreload: false,
		reportCompressedSize: true,
		chunkSizeWarningLimit: 500,
	},
	// 优化依赖预构建
	optimizeDeps: {
		include: ['vue', 'motion-v'],
		exclude: ['up-motio'],
	},
});
