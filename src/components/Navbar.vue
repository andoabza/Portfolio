<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { gsap } from 'gsap'

const themeStore = useThemeStore()
const mobileMenuOpen = ref(false)
const navbar = ref(null)

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
]

onMounted(() => {
  // Navbar scroll animation
  let lastScroll = 0
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset
    
    if (currentScroll <= 0) {
      navbar.value.classList.remove('scrolled')
      return
    }
    
    if (currentScroll > lastScroll && !mobileMenuOpen.value) {
      navbar.value.classList.add('scrolled', 'hidden')
    } else {
      navbar.value.classList.remove('hidden')
    }
    
    if (currentScroll < lastScroll) {
      navbar.value.classList.remove('scrolled')
    }
    
    lastScroll = currentScroll
  })
  
  // Animate nav links
  gsap.from('.nav-link', {
    opacity: 0,
    y: -20,
    stagger: 0.1,
    duration: 0.8,
    delay: 0.5
  })
})
</script>

<template>
  <header 
    ref="navbar"
    class="fixed w-full z-50 transition-all duration-500 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <a 
          href="#home" 
          class="flex-shrink-0 flex items-center text-xl font-bold text-primary-600 dark:text-primary-400"
        >
          <img src="../assets/andamlak-logo.png" alt="logo" width="100" />
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="nav-link text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            {{ link.name }}
          </a>
        </nav>
        
        <!-- Theme Toggle -->
        <button
          @click="themeStore.toggleTheme"
          class="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          <MoonIcon v-if="themeStore.darkMode" class="h-5 w-5" />
          <SunIcon v-else class="h-5 w-5" />
        </button>
        
        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <svg
            class="h-6 w-6"
            :class="{ 'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            class="h-6 w-6"
            :class="{ 'hidden': !mobileMenuOpen, 'block': mobileMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div 
      class="md:hidden transition-all duration-300 overflow-hidden"
      :class="{ 'max-h-0': !mobileMenuOpen, 'max-h-screen': mobileMenuOpen }"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
  </header>
</template>