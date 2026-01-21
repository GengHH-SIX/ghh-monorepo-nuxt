import { build } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 构建样式文件
async function buildStyles() {
  await build({
    plugins: [tailwindcss()],
    build: {
      emptyOutDir: false, // 不清空整个目录，只添加样式文件
      outDir: 'dist',
      cssMinify: true,
      rollupOptions: {
        input: {
          styles: resolve(__dirname, 'src/assets/tailwind.css'), // 主样式文件
        },
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'style.css'; // 输出为 style.css
            }
            return assetInfo.name;
          },
        },
      },
    },
  });
  
  console.log('Styles built successfully!');
}

buildStyles().catch((err) => {
  console.error(err);
  process.exit(1);
});