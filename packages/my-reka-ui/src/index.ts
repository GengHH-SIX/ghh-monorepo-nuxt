// 统一导出所有组件
import RekaButton from './components/Button';
import RekaInfoCard from './components/Card';

export { RekaButton };
export { RekaInfoCard };

// 如果将来需要，可以导出工具函数
// export * from './utils'

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
