<script setup>

import { ref, computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import AnimatedBackground from '../components/AnimatedBackground.vue'



useScrollAnimation()

const projects = ref([
  {
    title: 'Ethiotravel Platform',
    description: 'A full-featured a fully functional travel app.',
    technologies: ['Vue 3', 'Nuxt.js', 'Node.js', 'MongoDB', 'Python'],
    image: '../assets/images/ethiotravel-photo.png',
    links: [
      { label: 'Live Demo', url: 'https://ethiotravel..vercel.app' },
      { label: 'View Code', url: 'https://github.com/andoabza/ethiotravel' }
    ],
    features: [
      'Address with filters',
      'Map',
      'User dashboard',
      'Places'
    ]
  },
  {
    title: 'Cloud Managment App',
    description: 'Kanban-style Cloud tool with real-time collaboration features and Cloud tracking.',
    technologies: ['React', 'Laravel', 'Nodejs', 'Tailwind CSS', 'WebSockets'],
    image: '../assets/images/cloudytech-photo.png',
    links: [
      { label: 'Live Demo', url: 'https://cloudy.42web.io' },
      { label: 'View Code', url: 'https://github.com/andoabza/Cloudytech' }
    ],
    features: [
      'Cloud interface',
      'Real-time updates',
      'Team collaboration',
      'Progress tracking'
    ]
  },
  {
    title: 'Betna',
    description: 'Online House Renting App.',
    technologies: ['Vite', 'React', 'Nodejs', 'Tailwind CSS'],
    image: '../assets/images/Betna.webp',
    links: [
      { label: 'Live Demo', url: 'https://betna.vercel.app' },
      { label: 'View Code', url: 'https://github.com/andoabza/Betna' }
    ],
    features: [
      'Search',
      'Filtering Property',
      'Dark/light mode',
      'Performance optimized'
    ]
  }
]);

const filters = ref(['All', 'Vue', 'Node.js', 'Nuxt', 'Firebase'])
const activeFilter = ref('All')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects.value
  return projects.value.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(activeFilter.value.toLowerCase())
    ))
});
</script>

<template>
  <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8">
    <AnimatedBackground />
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16" data-animate="fade">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Here are some of my most significant projects with detailed case studies.
        </p>
      </div>

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

      <div 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-animate="fade"
      >
        <ProjectCard 
          v-for="(project, index) in filteredProjects"
          :key="index"
          :project="project"
          class="hover:shadow-lg transition-shadow duration-300"
        />
      </div>

      <div class="text-center mt-16" data-animate="fade">
        <a
          href="https://github.com/andoabza"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          View All Projects on GitHub
          <svg class="ml-3 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>