import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

const globalConfig = {
	vue: 'Vue',
	'motion-v': 'MotionV',
};

const chunkDirMap: Record<string, string> = {
	vendor: 'vendor', // 第三方依赖包
	composables: 'composables',
	components: 'components',
	animations: 'animations',
};

// 将 manualChunks 的逻辑提取为一个函数，方便复用
function createManualChunks() {
	return (id: string) => {
		console.log('Processing module ID for chunking:', id);
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
	};
}
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: './tsconfig.build.json',
			outDir: 'dist/types',
			// 关键：使用 vue-tsc 作为编译器
			// compiler: 'vue-tsc',
			// 包含 Vue 文件
			include: ['src/**/*.ts', 'src/**/*.vue'],
			exclude: [
				'src/**/*.test.ts',
				'src/**/*.spec.ts',
				'src/main.ts',
				'src/App.vue',
				'src/App.vue.d.ts',
			],
			rollupTypes: false, // 保留此配置，生成单一类型文件
			// copyDtsFiles: true,
			insertTypesEntry: true,
			cleanVueFileName: true,
		}), // 打包分析（可选）
		visualizer({
			filename: 'dist/stats.html',
			gzipSize: true,
			brotliSize: true,
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			// vue: 'vue/dist/vue.esm-bundler.js',  //使用这个别名，可以使用vue的某些功能，但是在lib打包时候也会进行映射，导致vue组件属性无法提示
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'up-motion',
			// fileName: (format) => {
			// 	const formats: Record<string, string> = {
			// 		es: 'up-motion.js',·
			// 		// umd: 'up-motion.umd.cjs',
			// 		cjs: 'up-motion.cjs',
			// 	};
			// 	return formats[format] || `up-motion.${format}.js`;
			// },
			// formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['vue', 'motion-v'],
			output: [
				// ESM 格式配置
				{
					format: 'es',
					dir: 'dist/es',
					// entryFileNames: 'es/up-motion.es.js',
					// chunkFileNames: (chunkInfo) => {
					// 	const dirName = chunkDirMap[chunkInfo.name];
					// 	const ext = 'es.js';
					// 	return dirName
					// 		? `es/${dirName}/index.${ext}`
					// 		: `es/[name]-[hash].${ext}`;
					// },
					// manualChunks 定义在此
					// manualChunks: createManualChunks(), // 使用统一的函数
					entryFileNames(chunkInfo) {
						// 将 MyComponent.vue.js 统一重命名为 MyComponent.mjs
						let name = chunkInfo.name.replace(/\.vue$/, '');
						if (chunkInfo.name.includes('node_modules'))
							return `${chunkInfo.name.replace(/node_modules/g, 'external')}.mjs`;
						//return '[name].mjs';
						return `${name}.mjs`;
					},
					globals: globalConfig,
					exports: 'named',
					preserveModules: true,
					preserveModulesRoot: 'src',
				},
				// CJS 格式配置
				{
					format: 'cjs',
					dir: 'dist/cjs',
					// entryFileNames: 'cjs/up-motion.cjs',
					// chunkFileNames: (chunkInfo) => {
					// 	const dirName = chunkDirMap[chunkInfo.name];
					// 	const ext = 'cjs';
					// 	return dirName
					// 		? `cjs/${dirName}/index.${ext}`
					// 		: `cjs/[name]-[hash].${ext}`;
					// },
					// manualChunks 定义在此
					// manualChunks: createManualChunks(), // 使用同一个函数
					name: 'up-motion',
					entryFileNames: '[name].js',
					globals: globalConfig,
					exports: 'named',
					esModule: true,
				},
			],
		},
		target: 'ESNext',
		// outDir: 'dist',
		emptyOutDir: true,
		//压缩代码
		minify: 'terser',
		terserOptions: {
			compress: {
				// TODO
				drop_console: true, // 移除console
				drop_debugger: true, // 移除debugger
				pure_funcs: ['console.log'], // 移除指定函数
				passes: 3, // 压缩遍数
				ecma: 2020,
				// 更激进的优化
				unsafe: true,
				unsafe_arrows: true,
				unsafe_methods: true,
				unsafe_proto: true,
				unsafe_regexp: true,
				unsafe_undefined: true,
			},
		},

		// 代码拆分
		cssCodeSplit: true,
		// Sourcemap（生产环境关闭）
		sourcemap: false,
		// 减少polyfill
		polyfillModulePreload: false,
		// 报告包大小
		reportCompressedSize: true,
		// 块大小警告限制
		chunkSizeWarningLimit: 500, // KB
	},
	// 优化依赖预构建
	optimizeDeps: {
		include: ['vue', 'motion-v'],
		exclude: ['up-motion'],
	},
});
