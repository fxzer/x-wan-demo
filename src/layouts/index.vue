<!-- 💥 一次性加载 LayoutComponents -->
<script setup lang="ts" name="layout">
import type { Component } from 'vue'
import Settings from './components/Settings/index.vue'
import SettingIcon from './components/SettingIcon/index.vue'
import LayoutVertical from './LayoutVertical/index.vue'
import LayoutClassic from './LayoutClassic/index.vue'
import LayoutTransverse from './LayoutTransverse/index.vue'
import LayoutColumns from './LayoutColumns/index.vue'
import { useGlobalStore } from '@/stores'
import type { LayoutType } from '@/stores'

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
}

const globalStore = useGlobalStore()
const { layout, settingsVisible } = storeToRefs(globalStore)
console.log('[ layout ]-22', layout)
</script>

<template>
  <component :is="LayoutComponents[layout]" />
  <SettingIcon />
  <Settings v-model="settingsVisible" />
</template>

<style scoped lang="scss">
.layout {
  min-width: 600px;
}
</style>
