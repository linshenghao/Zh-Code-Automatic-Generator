<template>
  <div class="container"  :key="0">
		<el-button type="primary" style="display:block;width: 90px" text bg @click="openDialog('新增文件目录')">新增</el-button>

		<el-row :gutter="10" class="mbT20">
			<el-col v-for="(item,index) in fileCatalog.data" :xs="12" :sm="6" :md="4" :lg="4" :xl="3">
				<el-card shadow="hover" @click="openEditerFileCodeSystem(item)"> 
					<template #header>
						<div class="card-header">
							<span>{{ item.name }}</span>
							<el-dropdown  class="item-fixed-icon" :hide-on-click="false">
								<el-icon @click.stop="false"><MoreFilled /></el-icon>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item @click="openDialog('修改文件目录', item)">编辑</el-dropdown-item>
										<el-dropdown-item @click="deleteHandler(item)">删除</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
					</template>
						<div class="item">
							<div class="item-box">
								<SvgIcon name="file" />
								<span class="mbT10"></span>
							</div>
					</div>	
				</el-card>
			</el-col>
		</el-row>
		<el-dialog v-if="dialogVisible" v-model="dialogVisible" :destroy-on-close="true" size="500px" :title="dialogData.title" draggable>
				<el-form
					ref="ruleFormRef"
					:rules="rules"
					:disabled="dialogData.isView"
					:model="dialogData.rowData"
					label-width="80px"
					label-suffix=" :"
					:hide-required-asterisk="dialogData.isView"
				>
					<el-form-item label="文件名" prop="name">
						<el-input v-model="dialogData.rowData!.name" placeholder="请填写文件名" clearable></el-input>
					</el-form-item>
					<el-form-item label="描述" prop="describe">
						<el-input v-model="dialogData.rowData!.describe" placeholder="请填写描述" clearable></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" v-show="!dialogData.isView" @click="handleSubmit(ruleFormRef)">确定</el-button>
				</template>
		</el-dialog>
  </div>
</template>
<script setup lang="ts">
import {onMounted} from "vue"
import { useSrcMixins } from "@/mixins/srcMixins";
import {getFileCatalog, addFileCatalog, deleteFileCatalog, updateFileCatalog} from "@/api/fileCatalog"
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { isSuccess,deepClone } from "@/utils/index"
import {FileCatalog} from "@/api/interface/index"
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const { src, mx_PATH } = useSrcMixins();
const fileCatalog = reactive({
  data: []
})

const rules = reactive({
	name: [{ required: true, message: "请填写文件名", trigger: "change" }]
});
const dialogData = reactive({
  rowData: {},
	title: "",
  isView: false
})
const dialogVisible = ref(false);

const openEditerFileCodeSystem = (item: FileCatalog.FileCatalogParamsList) => {
  router.push({
		path: mx_PATH.fileCodeSystem.index + item.id
	})
}

onMounted(() => {
  getData();
})

const getData = async () => {
  const {data} = await getFileCatalog();
  fileCatalog.data = data
  console.log("fileCatalog", fileCatalog.data);
}

const deleteHandler = async (item: any) => {
	const data = await deleteFileCatalog(item.id)
	if(isSuccess(data.status)){
				ElMessage({
					message: '删除成功',
					type: 'success',
				})
				getData();
	}
}

const handleSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return
	await formEl.validate(async (valid, fields) => {
    if (valid) {
			const data =  dialogData.title === "新增文件目录" ? await addFileCatalog(dialogData.rowData) : dialogData.title === "修改文件目录" ? await updateFileCatalog(dialogData.rowData) : "" 
			if(isSuccess(data.status)){
				ElMessage({
					message: `${dialogData.title}成功`,
					type: 'success',
				})
				getData();
			}
			dialogVisible.value = false;
    } else {
      console.log('error submit!', fields)
    }
  })
}
const openDialog = (title: string, rowData: Partial<FileCatalog.FileCatalogParamsList> = {}) => {
	dialogData.title = title
	dialogData.rowData = { ...rowData }
  dialogVisible.value = true;
}
</script>
<style scoped lang="scss">

  .container {
		.card-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
    .item {
      .item-box {
				box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
				padding: 20px;
				cursor: pointer;
				border-radius: 5px;
      }
   }
  }


</style>
