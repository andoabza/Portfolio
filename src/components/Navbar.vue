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

        <!-- Logo -->
        <a href="#home" class="flex items-center text-xl font-bold text-primary-600 dark:text-primary-400">
          <img src="../assets/andamlak-logo.png" alt="logo" class="h-10 w-auto" />
        </a>

        <!-- Desktop Navigation (Hidden on Mobile) -->
        <nav class="hidden md:flex space-x-6">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="nav-link text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Theme Toggle + Mobile Menu Toggle -->
        <div class="flex items-center space-x-2">
          <button
            @click="themeStore.toggleTheme"
            class="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition"
            aria-label="Toggle Theme"
          >
            <MoonIcon v-if="themeStore.darkMode" class="h-5 w-5" />
            <SunIcon v-else class="h-5 w-5" />
          </button>

          <!-- Hamburger Button (Only on Mobile) -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none transition"
            aria-label="Toggle Mobile Menu"
          >
            <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Dropdown -->
    <transition name="fade">
      <div
        v-show="mobileMenuOpen"
        class="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
      >
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition"
        >
          {{ link.name }}
        </a>
      </div>
    </transition>
  </header>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
