<template>
  <section id="about" class="text-gray-50 py-20 px-4 sm:px-6 lg:px-8">
    <AnimatedBackground />
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title">
          About Me
        </h2>
        <p class="section-subtitle">
          Get to know me beyond the code
        </p>
      </div>

      <div class="flex justify-center mb-12">
        <div class="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            v-for="tab in ['bio', 'timeline', 'hobbies']"
            :key="tab"
            @click="activeTab = tab"
            class="px-6 py-2 text-sm font-semibold rounded-md transition-colors duration-300 capitalize"
            :class="{
              'bg-gray-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow': activeTab === tab,
              'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700': activeTab !== tab
            }"
          >
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
              I'm a passionate Full Stack Developer with 2+ years of experience creating digital experiences that matter.
              My journey in tech started when I built my first website at 18, and I've been hooked ever since.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              When I'm not coding, you can find me hiking in the mountains, experimenting with photography,
              or reading the latest Biography novel. I believe great software is built at the intersection of
              technology and human needs.
            </p>
            <div class="mt-6">
              <button
                @click="toggleTerminal"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 transition-colors w-full sm:w-auto"
              >
                {{ showTerminal ? 'Hide' : 'Show' }} Developer Terminal
                <component :is="showTerminal ? ChevronUpIcon : ChevronDownIcon" class="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <Transition name="fade">
            <Terminal v-if="showTerminal" class="mt-4" />
          </Transition>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Philosophy
            </h3>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300 mr-4">
                   <LightBulbIcon class="h-5 w-5" />
                </div>
                <div>
                   <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                     Solve Real Problems
                   </h4>
                   <p class="text-gray-600 dark:text-gray-300">
                     Technology should make lives better, not just look pretty.
                   </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300 mr-4">
                   <ScaleIcon class="h-5 w-5" />
                </div>
                <div>
                   <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                     Balance Matters
                   </h4>
                   <p class="text-gray-600 dark:text-gray-300">
                     The right solution balances performance, aesthetics, and maintainability.
                   </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300 mr-4">
                   <AcademicCapIcon class="h-5 w-5" />
                </div>
                <div>
                   <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                     Never Stop Learning
                   </h4>
                   <p class="text-gray-600 dark:text-gray-300">
                     The tech landscape evolves rapidly, and we must grow with it.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Section -->
        <div v-else-if="activeTab === 'timeline'" class="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            My Experience Timeline
          </h3>
          <div class="space-y-6">
            <TimelineItem
              v-for="item in timeline"
              :key="item.date"
              :item="item"
            />
          </div>
        </div>

        <!-- Hobbies Section -->
        <div v-else-if="activeTab === 'hobbies'" class="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            My Hobbies
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(hobby, index) in hobbies"
              :key="index"
              class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-center"
            >
              <component :is="hobby.icon" class="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h4 class="text-lg font-semibold mb-2">
                {{ hobby.name }}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {{ hobby.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Profile Section -->
        <div class="sticky top-24">
          <div class="max-w-xs w-full mx-auto rounded-xl shadow-lg overflow-hidden">
            <img src="../assets/images/profile-photo.jpg" alt="Profile photo" class="w-full h-auto rounded-xl" loading="lazy" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Quick Facts
              </h3>
              <ul class="space-y-3 mb-6">
                <li class="flex items-start">
                   <MapMarkerIcon class="flex-shrink-0 h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                   <span class="text-gray-600 dark:text-gray-300">
                     Based in Addis Ababa, Et
                   </span>
                </li>
                <li class="flex items-start">
                   <BriefcaseIcon class="flex-shrink-0 h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                   <span class="text-gray-600 dark:text-gray-300">
                     2+ years experience
                   </span>
                </li>
                <li class="flex items-start">
                   <AcademicCapIcon class="flex-shrink-0 h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                   <span class="text-gray-600 dark:text-gray-300">
                     ALX 12-Month Software Engineering Alumni
                   </span>
                </li>
              </ul>
              <a
                href="/Developer-Resume.pdf"
                download
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 transition-colors w-full sm:w-auto"
              >
                Download Resume
                <DownloadIcon class="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedBackground from '../components/AnimatedBackground.vue'
import TimelineItem from '../components/TimelineItem.vue'
import Terminal from '../components/Terminal.vue'

import {
  LightBulbIcon,
  ScaleIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapMarkerIcon,
  BriefcaseIcon,
  DownloadIcon,
  CameraIcon,
  MountainIcon,
  BookOpenIcon,
  MusicalNoteIcon,
} from '@heroicons/vue/24/outline'

gsap.registerPlugin(ScrollTrigger)

const activeTab = ref('bio')
const showTerminal = ref(false)

const toggleTerminal = () => {
  showTerminal.value = !showTerminal.value
}

const timeline = ref([
  { date: '2022', title: 'Started coding journey', description: 'Began exploring web technologies and coding fundamentals.' },
  { date: '2023', title: 'Full Stack Training', description: 'Enrolled in 12-month ALX Software Engineering program, mastered fundamentals and modern stack.' },
  { date: '2023', title: 'Junior Developer', description: 'Landed first job, contributing to production code and developing UI components.' },
  { date: '2023-Present', title: 'Full Stack Engineer', description: 'Design and implement scalable applications, mentoring junior engineers, and growing my expertise daily.' }
])

const hobbies = ref([
  { name: 'Photography', icon: CameraIcon, description: 'Capturing stories through the viewfinder and freezing moments in time.' },
  { name: 'Hiking', icon: MountainIcon, description: 'Exploring nature, challenging myself, and staying physically active.' },
  { name: 'Reading', icon: BookOpenIcon, description: 'Diving into books — from technology to psychology — to broaden my knowledge and perspectives.' },
  { name: 'Music', icon: MusicalNoteIcon, description: 'Creating, listening, and appreciating all kinds of musical expression.' }
])

onMounted(() => {
  // Animations can be initialized here if needed.
})
</script>

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
