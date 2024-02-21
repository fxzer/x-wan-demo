import { defineStore } from 'pinia'
import type { Animation, LanguageType, LayoutType, SizeConfig, SizeType } from '../interface'
import { DEFAULT_PRIMARY } from '@/config'
import { initLanguage, removeHtmlProperty, setEpHtmlVars, setHtmlProperty } from '@/utils'
import { Regs, asideTheme, generatePairAnimates } from '@/constants'

export const useGlobalStore = defineStore('store-global', () => {
  const layout = ref<LayoutType>('vertical')
  const size = ref<SizeType>('default')
  const language = ref<LanguageType>(initLanguage())
  const maximize = ref(false)
  const primary = ref(DEFAULT_PRIMARY)
  const isMixinPrimary = ref(false)
  const isDark = ref(false)
  const darkTheme = ref('')
  const isFollowSystem = ref(false)
  const isPreDark = usePreferredDark()
  const isGray = ref(false)
  const isWeak = ref(false)
  const isCollapse = ref(false)
  const isAccordion = ref(false)
  const showBreadcurmb = ref(true)
  const showBreadcrumbIcon = ref(true)
  const showTab = ref(false)
  const showTabIcon = ref(true)
  const showFooter = ref(true)
  const asideInverted = ref(false)
  const animationName = ref('fade-slide')
  const isRandownAnimate = ref(false)
  // 主题彩虹色变换
  const isRainbow = ref(false)
  // 面包屑
  const loadingName = ref('LoadingA')
  const breadAnimateName = ref('slide-right')
  const breadcrumbType = ref('arrow')
  const pairAnimates = generatePairAnimates()
  // 菜单风格
  const menuClass = ref('menu-default')
  const animationList = ref<Animation[]>([{
    label: '无动画',
    value: 'none',
  }, {
    label: '渐显',
    value: 'fade',
  }, {
    label: '滑动渐显',
    value: 'fade-slide',
  }, {
    label: '底部渐显',
    value: 'fade-bottom',
  }, {
    label: '顶部渐显',
    value: 'fade-top',
  }, {
    label: '缩放渐显',
    value: 'fade-zoom',
  }, ...pairAnimates])
  const currentAnimation = computed(() => animationList.value.find(item => item.label === animationName.value)!)
  const enterActiveClass = computed(() => currentAnimation.value?.enterActiveClass)
  const leaveActiveClass = computed(() => currentAnimation.value?.leaveActiveClass)
  function randomAnimate() {
    if (isRandownAnimate.value) {
      const index = Math.floor(Math.random() * animationList.value.length)
      animationName.value = animationList.value[index].value
    }
  }
  const sizeList = ref<SizeConfig[]>([
    {
      label: '大型',
      key: 'large',
      fold: 64,
      unfold: 210,
    },
    {
      label: '默认',
      key: 'default',
      fold: 56,
      unfold: 200,
    },
    {
      label: '小型',
      key: 'small',
      fold: 48,
      unfold: 190,
    },
  ])
  watch([isFollowSystem, isPreDark], ([f]) => {
    if (f)
      isDark.value = isPreDark.value
  }, { immediate: true })
  const settingsVisible = ref(false)
  function getCurrentSize(): SizeConfig {
    return sizeList.value.find((item => item.key === size.value))!
  }
  const currentSize = ref<SizeConfig>(getCurrentSize())
  const itemHeight = ref(52)
  function toggleDark() {
    isDark.value = !isDark.value
  }
  // 当前菜单宽度
  const menuWidth = computed(() => {
    const { fold, unfold } = currentSize.value!
    return `${isCollapse.value ? fold : unfold}px`
  })
  // 监听所选尺寸变化
  watch(size, () => {
    // 设置菜单子项高度
    currentSize.value = getCurrentSize()
    itemHeight.value = getCurrentSize()!.fold - 4
    setHtmlProperty('--el-menu-item-height', `${itemHeight.value}px`)
    setHtmlProperty('--el-menu-horizontal-sub-item-height', `${itemHeight.value}px`)
  }, {
    immediate: true,
  })
  function toggleMenu() {
    isCollapse.value = !isCollapse.value
  }
  // 打开偏好设置
  function openSettings() {
    settingsVisible.value = true
  }

  // 监听主题色变化
  watch([isDark, primary, isMixinPrimary], (val) => {
    const [i, p, o] = val
    if (!p || !Regs.hexColor.test(p)) {
      primary.value = DEFAULT_PRIMARY
      ElMessage.success('主题色格式错误，已重置为默认主题色')
      return
    }
    setEpHtmlVars(i, p, o)
  }, { immediate: true })
  // 监听灰色、弱色模式
  const htmlClass = document.documentElement.classList
  watch(isGray, (val) => {
    val ? htmlClass.add('is-gray') : htmlClass.remove('is-gray')
  }, { immediate: true })
  watch(isWeak, (val) => {
    val ? htmlClass.add('is-weak') : htmlClass.remove('is-weak')
  }, { immediate: true })

  function darkThemeChange() {
    if (darkTheme.value)
      isDark.value ? htmlClass.add(darkTheme.value) : htmlClass.remove(darkTheme.value)
  }
  // 监听暗黑主题变化
  watch(darkTheme, (_, oldVal) => {
    oldVal && htmlClass.remove(oldVal)
    darkThemeChange()
  }, { immediate: true })
  watch(isDark, (val) => {
    val ? htmlClass.add('dark') : htmlClass.remove('dark')
    darkThemeChange()
  }, { immediate: true })
  // 侧边栏反色
  watch(asideInverted, (val) => {
    Object.entries(asideTheme).forEach(([key, value]) => val ? setHtmlProperty(key, value) : removeHtmlProperty(key))
  }, { immediate: true })

  return { layout, currentSize, menuWidth, menuClass, itemHeight, size, language, maximize, primary, isDark, darkTheme, isFollowSystem, isGray, isWeak, asideInverted, isCollapse, settingsVisible, isAccordion, showBreadcurmb, showBreadcrumbIcon, showTab, showTabIcon, showFooter, sizeList, isMixinPrimary, animationName, animationList, currentAnimation, enterActiveClass, leaveActiveClass, isRandownAnimate, breadAnimateName, breadcrumbType, isRainbow, loadingName, toggleDark, toggleMenu, openSettings, randomAnimate }
}, {
  persist: true,
})
// 根据传参设置修改 Store
export function setGlobalState(...args: any[]) {
  const globalStore = useGlobalStore()
  globalStore.$patch({ [args[0]]: args[1] })
}
