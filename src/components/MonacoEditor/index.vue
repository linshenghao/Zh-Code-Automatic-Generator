<template>
  <div class="e-box">
    <div :id="props.dom"></div>
  </div>
</template>
<script lang="ts" setup>
import * as monaco from 'monaco-editor';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

import { nextTick,ref,onBeforeUnmount, watch,onMounted } from 'vue'
/**
 * @description 图片上传
 * @param options 上传的文件
 * */
 interface Emits {
	(e: "update:modelValue", value: any): void;
	(e: "change", value: any): void;
	(e: "editor-mounted", value: any): void;
}
const emit = defineEmits<Emits>();
watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue()
          if (newValue !== value) {
            editor.setValue(newValue)
          }
        }
      },
)
watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue)
      },
)
interface Props {
	dom: string;
	language: string;
	modelValue: string;
}
// 接收父组件传过来的参数
const props = withDefaults(defineProps<Props>(), {
	dom: "codeEditBox",
	language: "javascript",
	modelValue: ""
});
// 
// MonacoEditor start
//
 onBeforeUnmount(()=>{
   editor.dispose() 
 })
// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  },
}
let editor: monaco.editor.IStandaloneCodeEditor;

const editorInit = () => {
    nextTick(()=>{
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false
        });
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2016,
            allowNonTsExtensions: true
        });
        
        !editor ? editor = monaco.editor.create(document.getElementById(props.dom) as HTMLElement, {
            value:props.modelValue, // 编辑器初始显示文字
            language: props.language, // 语言支持自行查阅demo
            automaticLayout: true, // 自适应布局  
            theme: 'vs-dark', // 官方自带三种主题vs, hc-black, or vs-dark
            foldingStrategy: 'indentation',
            renderLineHighlight: 'all', // 行亮
            selectOnLineNumbers: true, // 显示行号
            minimap:{
                enabled: false,
            },
            readOnly: false, // 只读
            fontSize: 16, // 字体大小
            scrollBeyondLastLine: false, // 取消代码后面一大段空白 
            overviewRulerBorder: false, // 不要滚动条的边框  
        }) : 
        editor.setValue("");
        // console.log(editor)
        // 监听值的变化
        editor.onDidChangeModelContent((val:any) => {
					const value = editor.getValue() // 给父组件实时返回最新文本
					emit('update:modelValue', value)
					emit('change', value)
					emit('editor-mounted', editor)
        })
    })
}
onMounted(() => {
	editorInit()
})

/***
 * editor.setValue(newValue)

editor.getValue()

editor.onDidChangeModelContent((val)=>{ //监听值的变化  })

editor.getAction('editor.action.formatDocument').run()    //格式化代码

editor.dispose()    //销毁实例

editor.onDidChangeOptions　　//配置改变事件

editor.onDidChangeLanguage　　//语言改变事件
 */
</script>
<style scoped lang="scss">
.e-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
</style>
