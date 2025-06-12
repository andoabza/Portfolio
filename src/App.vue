<script setup>
import { useThemeStore } from './stores/theme'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Hero from './pages/Hero.vue'
import Projects from './pages/Projects.vue'
import Skills from './pages/Skills.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'

const themeStore = useThemeStore()
</script>

<template>
  <AnimatedBackground />
<div  class="min-h-screen text-gray-100 transition-colors duration-300">
    <Navbar />
    <main>
      <Hero />
      <Projects />
      <Skills />
      <About />
      
      <Contact />
    </main>
    <Footer />
  </div>
</template>