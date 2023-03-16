<template>
	<div class="fileCodeSystem">
		<el-page-header class="mbB20" @back="router.go(-1)">
    <template #content>
			<el-button type="primary" style="display:block;width: 90px" size="mini" text bg @click="openEditer('新增文件模板')">新增</el-button>
    </template>
  </el-page-header>
		<el-table :data="tableData.list" border style="width: 100%">
		<el-table-column prop="fileName"  label="模板名" width="180" />
		<el-table-column prop="fileTemplate" label="模板内容">
			<template #default="scope">
				<span @click="openDialog('编辑模板', scope.row)">{{scope.row.fileTemplate}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="filePropertyJson" label="模板属性">
			<template #default="scope">
				<span @click="openDialog('编辑属性', scope.row)">{{scope.row.filePropertyJson}}</span>
			</template>
		</el-table-column>
		<el-table-column fixed="right" label="操作" width="300">
			<template #default="scope">
				<el-button link type="primary"  icon="View" @click="openDialog('预览模板', scope.row)" size="small"
				>预览</el-button>
				<el-button link type="primary"  icon="Download"  @click="downLoadHandler(scope.row)" size="small"
				>下载</el-button>
				<el-button link type="primary" size="small"  @click="openEditer('新增文件模板', scope.row)">编辑</el-button>
				<el-button link type="danger" size="small" @click="deleteHandler(scope.row.id)">删除</el-button>
			</template>
		</el-table-column>
  </el-table>
	<ClientOnly fallback-tag="span" fallback="Loading comments...">
		<el-dialog v-model="dialogVisible" width="80%"  destroy-on-close :title="dialogData.title" draggable>
		<span>
			<ClientOnly fallback-tag="span" fallback="Loading comments...">
				<Editor class="fileTemplate"   v-model="dialogData.viewData"  :language="dialogData.title=== '编辑属性'? 'json': 'javascript'" ref="fileTemplate"  dom="fileTemplate"></Editor>
			</ClientOnly>  
		</span>
		<template #footer>
			<el-button @click="dialogVisible = false">关闭</el-button>
			<el-button v-if="dialogData.title=== '编辑模板' || dialogData.title=== '编辑属性'" @click="handleSubmit">保存</el-button>
		</template>
		</el-dialog>
	</ClientOnly>
	</div>
</template>
<script lang="ts" setup>
import {getFileCodeSystem, reviewFileTemplateById, updateFileCodeSystem, deleteFileCodeSystem, downloadFileZIP} from '@/api/fileCodeSystem'
import Editor from '@/components/MonacoEditor/index.vue'
import {onMounted} from "vue"
import {FileCodeSystem} from "@/api/interface/index"
import { useSrcMixins } from "@/mixins/srcMixins";
import { ElMessage } from 'element-plus'
import {isSuccess} from "@/utils/index"
const { src, mx_PATH } = useSrcMixins();
const route: any = useRoute();
const router = useRouter()
const tableData = reactive({
  list: []
})
const dialogVisible = ref(false);
const dialogData = reactive({
 	rowData: {},
	title: "",
  viewData: "",
	dialogProperty: ""
})
onMounted(() => {
	console.log("route.params.id", route.params.id);
  getData();
})
const getData = async () => {
	const id: any = route.params.id || "";
  const {data} = await getFileCodeSystem(id);
  tableData.list = data
}

const openEditer = (title: string, rowData: Partial<FileCodeSystem.FileCodeSystemParamsList> = {}) => {
  router.push({
		path: mx_PATH.fileCodeSystem.editer + route.params.id,
		query: {fileCodeSystemId: rowData!.id}
	})
}
const deleteHandler = async (id: string) => {
	const data = await deleteFileCodeSystem(id)
	if(isSuccess(data.status)){
			ElMessage({
				message: '删除成功',
				type: 'success',
			})
			getData();
	}
}

const downLoadHandler = async (rowData: Partial<FileCodeSystem.FileCodeSystemParamsList> = {}) => {
	await downloadFileZIP(rowData)
}
const openDialog = async (title: string, rowData: any) => {
	dialogData.title = title;
	if(title === "预览模板") {
		const { data } = await reviewFileTemplateById(rowData.id);
		dialogData.viewData = data;
	}
	if(title === "编辑模板") {
		dialogData.rowData = rowData;
		dialogData.viewData = rowData.fileTemplate;
		dialogData.dialogProperty = "fileTemplate"
	}
	if(title === "编辑属性") {
		dialogData.rowData = rowData;
		dialogData.viewData = rowData.filePropertyJson;
		dialogData.dialogProperty = "filePropertyJson"
	}
	console.log("测试", dialogData.rowData);
	dialogVisible.value = true;
}

const handleSubmit = async () => {
		const params: any = Object.assign({},dialogData.rowData);
		params[dialogData.dialogProperty] = dialogData.viewData;
		const data =  await updateFileCodeSystem(params)
		if(isSuccess(data.status)){
				ElMessage({
					message: `${dialogData.title}成功`,
					type: 'success',
				})
		}
		dialogVisible.value = false;
		getData();
}

</script>
<style lang="scss" scoped>
.fileCodeSystem {
	width: 100%;
	height: 100%;
	background-color: #eeeeee;
	:deep(#fileTemplate) {
		width: 100%;
		height: 50vh;
	}
}
</style>
