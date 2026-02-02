import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

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
			output: [
				// ESM 格式配置
				{
					format: 'es',
					dir: 'dist',
					entryFileNames: 'es/up-motion.es.js',
					chunkFileNames: (chunkInfo) => {
						const dirName = chunkDirMap[chunkInfo.name];
						const ext = 'es.js';
						return dirName
							? `es/${dirName}/index.${ext}`
							: `es/[name]-[hash].${ext}`;
					},
					// manualChunks 定义在此
					manualChunks: createManualChunks(), // 使用统一的函数
					globals: globalConfig,
					exports: 'named',
				},
				// CJS 格式配置
				{
					format: 'cjs',
					dir: 'dist',
					entryFileNames: 'cjs/up-motion.cjs',
					chunkFileNames: (chunkInfo) => {
						const dirName = chunkDirMap[chunkInfo.name];
						const ext = 'cjs';
						return dirName
							? `cjs/${dirName}/index.${ext}`
							: `cjs/[name]-[hash].${ext}`;
					},
					// manualChunks 定义在此
					manualChunks: createManualChunks(), // 使用同一个函数
					globals: globalConfig,
					exports: 'named',
				},
			],
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
