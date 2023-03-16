import { 
	VXETable,
	Icon,
	Column,
	Table
} from 'vxe-table'
import 'vxe-table/lib/style.css'
import 'xe-utils'
import { App, createApp } from 'vue'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
VXETable.setup({
	i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})
function useTable (app: App) {
	app.use(Icon).use(Column).use(Table)
}
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(useTable);
})
