import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const preferredDark = usePreferredDark()
  const darkMode = ref(false)
  
  // Initialize theme
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      darkMode.value = savedTheme === 'dark'
    } else {
      darkMode.value = preferredDark.value
    }
    updateHtmlClass()
  }
  
  // Toggle theme
  const toggleTheme = () => {
    darkMode.value = !darkMode.value
  }
  
  // Update HTML class
  const updateHtmlClass = () => {
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  // Watch for changes
  watch(darkMode, (newVal) => {
    localStorage.setItem('theme', newVal ? 'dark' : 'light')
    updateHtmlClass()
  })
  
  // Initialize on load
  initTheme()
  
  return { darkMode, toggleTheme }
})