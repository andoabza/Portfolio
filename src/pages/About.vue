<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Terminal from '../components/Terminal.vue'
import TimelineItem from '../components/TimelineItem.vue'
import AnimatedBackground from '../components/AnimatedBackground.vue'

// Import Heroicons
import { LightBulbIcon, AcademicCapIcon, BriefcaseIcon, DownloadIcon, LocationMarkerIcon, MountainIcon, BookOpenIcon, MusicNoteIcon, CameraIcon } from '@heroicons/vue/outline'

gsap.registerPlugin(ScrollTrigger)

const activeTab = ref('bio')
const showTerminal = ref(false)

const icons = {
  'light-bulb': LightBulbIcon,
  'academic-cap': AcademicCapIcon,
  'briefcase': BriefcaseIcon,
  'download': DownloadIcon,
  'map-marker': LocationMarkerIcon,
  'mountain': MountainIcon,
  'book-open': BookOpenIcon,
  'music-note': MusicNoteIcon,
  'camera': CameraIcon,
}

const timelineData = [
  { year:'2022-2023', title:'Alx Software Program', company:'Holberton School', description:'A 12-month (70 hrs/week) immersive programme that prepares participants for a global career as a Full-Stack Developer', icon:'briefcase' },
  { year:'2024-2025', title:'FullStack Developer (MERN)', company:'Nile Technology Solutions', description:'Working with a team to build scalable web applications using Vue.js and Node.js', icon:'light-bulb' },
  { year:'2023-Present', title:'FullStack Developer', company:'SolvX', description:'Working with my team to develop revolutionary ideas that will help peoples day to day problems', icon:'academic-cap' },
  { year:'2021-2022', title:'Coding Instructor', company:'Codejika', description:'instructed HighSchool Students how to Code in HTML, CSS, Javascript and Python', icon:'briefcase' }
]

const hobbies = [
  { name:'Photography', icon:'camera', description:'Capturing moments and landscapes' },
  { name:'Hiking', icon:'mountain', description:'Exploring nature trails on weekends' },
  { name:'Gaming', icon:'music-note', description:'Indie games and classic RPGs' },
  { name:'Reading', icon:'book-open', description:'Sci-fi and tech nonfiction' }
]

onMounted(() => {
  // Animate timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 50,
      scrollTrigger: { trigger: item, start:'top 80%' },
      duration: 0.8,
      delay: i * 0.15
    })
  })
  // Animate hobby cards
  gsap.utils.toArray('.hobby-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.8,
      scrollTrigger: { trigger: card, start:'top 80%' },
      duration: 0.6,
      delay: i * 0.1
    })
  })
})

const toggleTerminal = () => {
  showTerminal.value = !showTerminal.value
}
</script>

<template>
  <section id="about" class="text-gray-50 py-20 px-4 sm:px-6 lg:px-8">
    <AnimatedBackground />
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h2 class="section-title">
          About Me
        </h2>
        <p class="section-subtitle">
          Get to know me beyond the code
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-12">
        <div class="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            v-for="tab in ['bio', 'timeline', 'hobbies']"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-6 py-2 text-sm font-semibold rounded-md transition-colors duration-300 capitalize',
              activeTab === tab ? 'bg-gray-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]">
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Bio Section -->
        <div v-if="activeTab === 'bio'" class="space-y-8">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Who Am I?
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              I'm a passionate FullStack developer with 2+ years of experience creating digital experiences that matter.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When I'm not coding, you can find me hiking in the mountains, experimenting with photography, or reading the latest Biography novel.
            </p>
            <div class="mt-6">
              <button
                @click="toggleTerminal"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 transition-colors">
                {{ showTerminal ? 'Hide' : 'Show' }} Developer Terminal
              </button>
            </div>
          </div>

          <transition name="fade">
            <Terminal v-if="showTerminal" class="mt-4" />
          </transition>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Philosophy
            </h3>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 mr-4">
                   <component :is="icons['light-bulb']" class="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                   <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
                     Solve Real Problems
                   </h4>
                   <p class="text-gray-600 dark:text-gray-400">
                     Technology should make lives better, not just look pretty.
                   </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 mr-4">
                   <component :is="icons['academic-cap']" class="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                   <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
                     Balance Matters
                   </h4>
                   <p class="text-gray-600 dark:text-gray-400">
                     The right solution balances performance, aesthetics, and maintainability.
                   </p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 mr-4">
                   <component :is="icons['briefcase']" class="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                   <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
                     Never Stop Learning
                   </h4>
                   <p class="text-gray-600 dark:text-gray-400">
                     The tech landscape evolves rapidly, and we must keep up.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Section -->
        <div v-if="activeTab === 'timeline'" class="lg:col-span-2">
          <div class="relative">
            <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>

            <div class="space-y-8">
              <TimelineItem
                v-for="(item, index) in timelineData"
                :key="index"
                :item="item"
                :position="index % 2 === 0 ? 'left' : 'right'"
                class="timeline-item"
              />
            </div>
          </div>
        </div>

        <!-- Hobbies Section -->
        <div v-if="activeTab === 'hobbies'" class="lg:col-span-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(hobby, index) in hobbies"
              :key="index"
              class="hobby-card bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div class="mx-auto h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <component :is="icons[hobby.icon]" class="h-12 w-12" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                {{ hobby.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ hobby.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Side photo -->
        <div v-if="activeTab === 'bio'" class="relative">
          <div class="sticky top-24">
            <div class="rounded-xl shadow-lg overflow-hidden">
              <img src="../assets/images/profile-photo.jpg" alt="Profile photo" class="w-80 h-auto mx-auto rounded-xl" loading="lazy">
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                   Quick Facts
                </h3>
                <ul class="space-y-3">
                   <li class="flex items-start">
                      <component :is="icons['map-marker']" class="flex-shrink-0 h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      <span class="text-gray-600 dark:text-gray-400">Addis Ababa, Ethiopia</span>
                   </li>
                   <li class="flex items-start">
                      <component :is="icons['briefcase']" class="flex-shrink-0 h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      <span class="text-gray-600 dark:text-gray-400">2+ years experience</span>
                   </li>
                   <li class="flex items-start">
                      <component :is="icons['academic-cap']" class="flex-shrink-0 h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                      <span class="text-gray-600 dark:text-gray-400"> ALX 12Months Software Engineering Program Alumni </span>
                   </li>
                </ul>
                <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                   <a
                     href="/Developer-Resume.pdf"
                     download
                     class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 transition-colors">
                     Download Resume
                     <component :is="icons['download']" class="ml-2 h-4 w-4" />
                   </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div><!-- grid -->
    </div><!-- max-w-7xl -->
  </section>
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
