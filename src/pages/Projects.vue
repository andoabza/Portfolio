<script setup>
import { ref, computed } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import AnimatedBackground from '../components/AnimatedBackground.vue'

useScrollAnimation()

const projects = ref([
  {
    title: 'Ethiotravel Platform',
    description: 'A fully functional travel app.',
    technologies: ['Vue 3', 'Nuxt.js', 'Node.js', 'MongoDB', 'Python'],
    image: 'ethiotravel-photo.png',
    links: [
      { label: 'Live Demo', url: 'https://ethiotravel.vercel.app' },
      { label: 'View Code', url: 'https://github.com/andoabza/ethiotravel' }
    ],
    features: ['Address with filters', 'Map', 'User dashboard', 'Places']
  },
  {
    title: 'Cloud Management App',
    description: 'Kanban-style cloud tool with real-time features.',
    technologies: ['React', 'Laravel', 'Nodejs', 'Tailwind CSS', 'WebSockets'],
    image: 'cloudytech-photo.png',
    links: [
      { label: 'Live Demo', url: 'https://cloudy.42web.io' },
      { label: 'View Code', url: 'https://github.com/andoabza/Cloudytech' }
    ],
    features: ['Cloud interface', 'Real-time updates', 'Team collaboration', 'Tracking']
  },
  {
    title: 'Betna',
    description: 'Online House Renting App.',
    technologies: ['Vite', 'React', 'Nodejs', 'Tailwind CSS'],
    image: 'betna.webp',
    links: [
      { label: 'Live Demo', url: 'https://betna.vercel.app' },
      { label: 'View Code', url: 'https://github.com/andoabza/Betna' }
    ],
    features: ['Search', 'Property Filtering', 'Dark mode', 'Optimized performance']
  }
])

const filters = ref(['All', 'Vue', 'Node.js', 'Laravel', 'React'])
const activeFilter = ref('All')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects.value
  return projects.value.filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase().includes(activeFilter.value.toLowerCase())
    )
  )
})

// Dynamically load project image with fallback
function getImagePath(filename) {
  try {
    return new URL(`../assets/images/${filename}`, import.meta.url).href
  } catch (e) {
    console.warn(`Missing image: ${filename}`)
    return new URL(`../assets/images/placeholder.png`, import.meta.url).href
  }
}
</script>

<template>
  <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 relative">
    <AnimatedBackground />

    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16" data-animate="fade">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Some of my most significant projects with detailed features.
        </p>
      </div>

      <!-- Filter buttons -->
      <div class="flex justify-center mb-12 flex-wrap gap-2" data-animate="fade">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="activeFilter = filter"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
          :class="{
            'bg-primary-600 text-white': activeFilter === filter,
            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': activeFilter !== filter
          }"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-animate="fade">
        <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="getImagePath(project.image)"
              :alt="project.title + ' screenshot'"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div class="flex space-x-3">
                <a
                  v-for="(link, i) in project.links"
                  :key="i"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tech, i) in project.technologies"
                :key="i"
                class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub link -->
      <div class="text-center mt-16" data-animate="fade">
        <a
          href="https://github.com/andoabza"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          View All Projects on GitHub
          <svg class="ml-3 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
