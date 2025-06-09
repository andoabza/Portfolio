<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import AnimatedBackground from '../components/AnimatedBackground.vue'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/andoabza', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/andooabza', icon: 'linkedin' },
  // { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { name: 'Email', url: 'mailto:hello@example.com', icon: 'email' }
]

onMounted(() => {
  gsap.from('.hero-content > *', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
  })
  
  gsap.from('.social-link', {
    opacity: 0,
    x: -20,
    stagger: 0.1,
    duration: 0.8,
    delay: 1,
    ease: 'back.out'
  })
})
</script>


<template>

   <section 
    id="home" 
    class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
  >
   <AnimatedBackground />

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="hero-content text-center md:text-left">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span class="block">Hello, I'm</span>
          <span 
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600"
          >
            Andamlak Developer
          </span>
        </h1>
        
        <h2 class="text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8">
          FullStack Developer & AI Enthusiast
        </h2>
        
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto md:mx-0 mb-10">
          I craft exceptional digital experiences with Vue.js, Node.js, and modern web technologies.
        </p>
        
        <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-16">
          <a 
            href="#projects" 
            class="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            class="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1"
          >
            Contact Me
          </a>
        </div>
      </div>
      
      <div class="flex justify-center md:justify-start space-x-6">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
          :aria-label="link.name"
        >
          <span class="sr-only">{{ link.name }}</span>
          <component 
            :is="link.icon" 
            class="h-6 w-6"
          />
        </a>
      </div>
    </div>
  </section>
</template>