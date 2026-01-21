// 统一导出所有组件
export { default as RekaButton } from './components/Button';
// ... 导出其他组件
export { default as RekaInfoCard } from './components/Card';

// 如果将来需要，可以导出工具函数
// export * from './utils'

type Test = {
	name: string;
};
export type TestType = Test;

// 完整库的默认安装函数
// import type { App,DefineComponent } from 'vue'
// import * as components from './components'

// const install = (app: App) => {
//   Object.entries(components).forEach(([name, component]) => {
//     if (name !== 'install') {
//       app.component(name, component)
//     }
//   })
// }

// export default {
//   install,
//   ...components
// }