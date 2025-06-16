<template>
  <header
    ref="navbar"
    class="fixed w-full z-50 transition-all duration-500 bg-white dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-22 md:h-24">
        <!-- Logo -->
        <a href="#home" class="flex items-center">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">A</span>
          </div>
          <span class="ml-3 text-2xl font-bold text-gray-900 dark:text-white">&lt;&gt;</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-1 lg:space-x-3">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="nav-link px-3 py-2 rounded-md font-medium transition-colors duration-300"
            :class="{
              'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30': activeLink === link.href,
              'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400': activeLink !== link.href
            }"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- Theme Toggle + Mobile Menu Toggle -->
        <div class="flex items-center space-x-2">
          <button
            @click="toggleTheme"
            class="p-4 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition"
            aria-label="Toggle Theme"
          >
            <svg v-if="darkMode" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-4 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition"
            aria-label="Toggle Mobile Menu"
          >
            <svg v-if="!mobileMenuOpen" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Dropdown -->
    <transition name="slide-down">
      <div
        v-show="mobileMenuOpen"
        class="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
      >
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 rounded-lg text-lg font-large transition"
          :class="{
            'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30': activeLink === link.href,
            'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800': activeLink !== link.href
          }"
        >
          {{ link.name }}
        </a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navbar = ref(null)
const mobileMenuOpen = ref(false)
const darkMode = ref(false)
const activeLink = ref('#home')

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
]

const toggleTheme = () => {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const handleScroll = () => {
  const currentScroll = window.pageYOffset
  
  // Update active link based on scroll position
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    if (currentScroll >= sectionTop) {
      activeLink.value = '#' + section.id
    }
  })
  
  // Navbar scroll effect
  if (currentScroll <= 0) {
    navbar.value.classList.remove('scrolled')
    return
  }
  
  if (currentScroll > 100) {
    navbar.value.classList.add('scrolled')
  } else {
    navbar.value.classList.remove('scrolled')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Check for saved theme preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    darkMode.value = false
    document.documentElement.classList.remove('dark')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
  max-height: 300px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

header.scrolled {
  @apply shadow-md py-0 h-16;
  transform: translateY(0);
}

.nav-link {
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

@media (min-width: 768px) {
  .nav-link {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
  }
}

@media (min-width: 1024px) {
  .nav-link {
    font-size: 1.15rem;
  }
}

.dark header {
  background-color: rgba(15, 23, 42, 0.95);
}
</style>
