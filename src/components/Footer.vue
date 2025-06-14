<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedBackground from './AnimatedBackground.vue'

const currentYear = ref(new Date().getFullYear())
const showBackToTop = ref(false)

const socialLinks = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/andoabza' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/andooabza' },
//   { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/yourhandle' },
  { name: 'Email', icon: 'mail', url: 'mailto:andaabi3@gmail.com' }
]

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  // Show/hide back-to-top button based on scroll position
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 300
  })

  // Footer animations
  gsap.from('.footer-item', {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
})
</script>

<template>
  <footer class=" text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-20"></div>
    
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- About Column -->
        <div class="footer-item">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <span class="bg-primary-500 w-2 h-6 rounded-full mr-3"></span>
            About Me
          </h3>
          <p class="mb-4">
            FullStack developer specializing in React and Node.js applications. Passionate about creating performant, accessible web experiences.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-primary-400 transition-colors duration-300"
              :aria-label="link.name"
            >
              <component :is="link.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="footer-item">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <span class="bg-primary-500 w-2 h-6 rounded-full mr-3"></span>
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li>
              <a href="#home" class="hover:text-primary-400 transition-colors duration-300">Home</a>
            </li>
            <li>
              <a href="#projects" class="hover:text-primary-400 transition-colors duration-300">Projects</a>
            </li>
            <li>
              <a href="#skills" class="hover:text-primary-400 transition-colors duration-300">Skills</a>
            </li>
            <li>
              <a href="#about" class="hover:text-primary-400 transition-colors duration-300">About</a>
            </li>
            <li>
              <a href="#contact" class="hover:text-primary-400 transition-colors duration-300">Contact</a>
            </li>
          </ul>
        </div>

        <!-- Contact Info Column -->
        <div class="footer-item">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <span class="bg-primary-500 w-2 h-6 rounded-full mr-3"></span>
            Contact Info
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <component :is="'mail'" class="flex-shrink-0 h-5 w-5 text-primary-400 mr-3" />
              <span>andaabi3@gmail.com</span>
            </li>
            <li class="flex items-start">
              <component :is="'phone'" class="flex-shrink-0 h-5 w-5 text-primary-400 mr-3" />
              <span>+251 (928) 303-235</span>
            </li>
            <li class="flex items-start">
              <component :is="'map-marker'" class="flex-shrink-0 h-5 w-5 text-primary-400 mr-3" />
              <span>Addis Ababa, Et</span>
            </li>
          </ul>
        </div>

        <!-- Newsletter Column -->
        <div class="footer-item">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
            <span class="bg-primary-500 w-2 h-6 rounded-full mr-3"></span>
            Newsletter
          </h3>
          <p class="mb-4">
            Subscribe to my occasional newsletter for tech insights and updates.
          </p>
          <form class="flex">
            <input
              type="email"
              placeholder="Your email"
              class="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full bg-gray-800 text-white"
              required
            >
            <button
              type="submit"
              class="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-lg text-white transition-colors duration-300"
            >
              <component :is="'paper-airplane'" class="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <!-- Copyright and Credits -->
      <div class="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-sm">
            &copy; {{ currentYear }} Andamlak. All rights reserved.
          </p>
        </div>
        <!-- <div class="flex space-x-6">
          <a href="#" class="text-sm hover:text-primary-400 transition-colors duration-300">Privacy Policy</a>
          <a href="#" class="text-sm hover:text-primary-400 transition-colors duration-300">Terms of Service</a>
          <a href="#" class="text-sm hover:text-primary-400 transition-colors duration-300">Sitemap</a>
        </div> -->
      </div>
    </div>

    <!-- Back to top button -->
    <Transition name="fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <component :is="'arrow-up'" class="h-5 w-5" />
      </button>
    </Transition>
  </footer>
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
