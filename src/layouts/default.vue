<template>
	<div class="nuxt-layout"  :key="0">
    <el-container class="layout-transverse">
      <el-header>
        <div class="logo flx-center">
          <img class="main-icon" src="../static/icon-logo-success.png" alt="" />
          <span class="fz16 logo-title">代码生成器</span>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect">
          <div class="flex-grow" />
          <el-menu-item index="1">代码生成器管理</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
				<slot />
      </el-main>
    </el-container>

  </div>
</template>
<script setup lang="ts">
  import headConfig from "~~/src/config/head"

  const route: any = useRoute();
	const activeIndex = ref("1");
	const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
  const head: any = route.meta.head || {};
  const heads: any = {
    titleTemplate: (appTitle: any) =>{
      if( !head.title) return appTitle;
      return `${head.title}-${appTitle}`;
    },
    meta: []
  };
  heads.meta.push( ...headConfig.buildMeta({
    title: head.title,
    keywords: head.keywords,
    description: head.description
  }));
  useHead(heads);
</script>
<style lang="scss" scoped>
.nuxt-layout {
	position: relative;
	box-sizing: border-box;
  flex-direction: column;
  width: 100%;
	height: 100%;
	overflow: auto;
	background-color: #eeeeee;
	background-repeat: no-repeat;
	background-position: 0 60%;
	background-size: cover;
	.main-icon {
      width: 20px;
      height: 20px;
    }
    .flex-grow {
       flex-grow: 1;
    }

        // 横向布局
    .layout-transverse {
      // min-width: 970px;
    }
    .el-container {
      width: 100%;
      height: 100%;
      .el-header {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 55px;
        padding: 0 15px 0 0;
        background-color: #ffffff;
        border-bottom: 1px solid #f1f1f1;
        .logo {
          width: 210px;
          margin-right: 30px;
					text-align: center;
          span {
            font-size: 21.5px;
            font-weight: bold;
            white-space: nowrap;
          }
          .logo-title {
            color: transparent;
            background-image: linear-gradient(to right, orange, purple);
            background-clip: text;
          }
          img {
            width: 28px;
            object-fit: contain;
            margin-right: 6px;
          }
        }
        :deep(.el-menu) {
          flex: 1;
          overflow: hidden;
          border-bottom: none;
          .is-active {
            border-bottom-color: var(--el-color-primary) !important;
            .el-sub-menu__title {
              color: #ffffff !important;
              background-color: var(--el-color-primary) !important;
              border-bottom-color: var(--el-color-primary) !important;
            }
            &:hover {
              color: #ffffff !important;
            }
          }
        }
        :deep(.tool-bar-ri) {
          .toolBar-icon,
          .username {
            color: #e5eaf3;
          }
        }
      }
    }
}
</style>
