import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { brotliCompressSync, gzipSync } from 'zlib';
/**
 * @description: 1. 清理注释和空白（在terser之后）
 * @param {*} code
 * @return {*}
 */
function postProcessCode(code) {
	// 移除特定注释
	return code
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/\/\/.*$/gm, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * @description: 2.生成文件大小报告
 * @param {*} filePath
 * @return {*}
 */
function generateSizeReport(filePath) {
	const content = readFileSync(filePath);
	const gziped = gzipSync(content);
	const brotlied = brotliCompressSync(content);

	console.log(`📦 ${filePath}:`);
	console.log(`  原始大小: ${(content.length / 1024).toFixed(2)} KB`);
	console.log(`  Gzip后: ${(gzipped.length / 1024).toFixed(2)} KB`);
	console.log(`  Brotli后: ${(brotlied.length / 1024).toFixed(2)} KB`);
}

/**
 * @description: 3.运行构建命令
 * @return {*}
 */
execSync('vite build', { stdio: 'inherit' });

/**
 * @description: 4. 处理输出文件
 * @return {*}
 */
const files = ['dist/up-motion.js', 'dist/up-motion.umd.cjs'];

files.forEach(generateSizeReport);
