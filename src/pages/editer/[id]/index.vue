<template>
	<div class="editerPage">
		<el-container class="layout-transverse">
				<ClientOnly fallback-tag="span" fallback="Loading comments...">
					<Editor class="fileTemplate" v-model="fileCode.rowData.fileTemplate" language="javascript" ref="fileTemplate" dom="fileTemplate"></Editor>  
   			</ClientOnly>
		</el-container>
		<div class="editerBar">
			<el-card class="box-card">
				<el-form
					label-position="top"
					ref="ruleFormRef"
					:rules="rules"
					:model="fileCode.rowData"
				>
					<el-form-item label="模板名" prop="fileName">
						<el-input v-model="fileCode.rowData.fileName" />
					</el-form-item>
					<el-form-item label="模板填充对象" prop="filePropertyJson">
						<ClientOnly fallback-tag="span" fallback="Loading comments...">
							<Editor class="filePropertyJson"  v-model="fileCode.rowData.filePropertyJson"  language="json" ref="filePropertyJson"  dom="filePropertyJson"></Editor>  
						</ClientOnly>
					</el-form-item>
				</el-form>
				<el-row>
					<el-button icon="Back" @click="router.go(-1)">返回</el-button>
					<el-button type="primary" @click="handleSubmit(ruleFormRef)">保存</el-button>
					<!-- <el-button type="primary" icon="View" circle /> -->
					<!-- <el-button type="primary" icon="Download" circle /> -->
					<!-- <el-button type="danger" icon="Delete" circle /> -->
				</el-row>
			</el-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import Editor from '@/components/MonacoEditor/index.vue'
import {FileCodeSystem} from "@/api/interface/index"
import { addFileCodeSystem, updateFileCodeSystem, getFileCodeSystemById} from "@/api/fileCodeSystem"
import {onMounted, reactive, nextTick} from "vue"
import { ElMessage } from 'element-plus'
import {isSuccess} from "@/utils/index"
import type { FormInstance } from 'element-plus'
const rules = reactive({
	fileName: [{ required: true, message: "请填写模板名", trigger: "change" }],
	filePropertyJson: [{ required: true, message: "模板属性对象不能为空", trigger: "change" }]
});

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<FormInstance>()
const fileCode = reactive({
	rowData :{
		fileName: "",
		fileTemplate: "",
		filePropertyJson: "",
		fileCatalogId: "",
		id: ""
	}
})
onMounted(() => {
	fileCode.rowData.fileCatalogId = route.params!.id;
	if(route.query.fileCodeSystemId){
		nextTick(()=>{
			getData()
		})
	}
})
const getData = async () => {
	const id: any = route.params.id || "";
	if(route.query.fileCodeSystemId) fileCode.rowData.id = route.query.fileCodeSystemId
  const { data } = await getFileCodeSystemById(route.query.fileCodeSystemId);
	fileCode.rowData = Object.assign({},data)
	console.log("fileCode.rowData", fileCode.rowData);
}
const handleSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	if(!fileCode.rowData.fileTemplate) {
		ElMessage({message: '模板内容不能为空',type: 'warning'});
		return false
	}
	await formEl.validate(async (valid, fields) => {
    if (valid) {
			const data =  fileCode.rowData.id ? await updateFileCodeSystem(fileCode.rowData) : await addFileCodeSystem(fileCode.rowData) 
			if(isSuccess(data.status)){
				ElMessage({
					message: `${fileCode.rowData.id ? '修改': '新增'}成功`,
					type: 'success',
				})
			}
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style scoped lang="scss">
.editerPage {
	width: 100%;
	height: 100%;
	.editerBar {
		position: fixed;
		top: 75px;
		right: 20px;
		box-sizing: border-box;
		width: 400px;
		height: 90vh;
		padding: 10px;
		background-color: #2d8cf0;
	}
	:deep(#fileTemplate) {
		width: 100%;
		height: 90vh;
	}
	:deep(#filePropertyJson) {
		width: 100%;
		height: 450px;
	}
}
</style>
