<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillMeter from '../components/SkillMeter.vue'
import SkillRadarChart from '../components/SkillRadarChart.vue'
import AnimatedBackground from '../components/AnimatedBackground.vue'

gsap.registerPlugin(ScrollTrigger)

const skills = ref({
  frontend: [
    { name: 'Vue.js', level: 95, icon: 'vuejs', color: 'green' },
    { name: 'React', level: 85, icon: 'react', color: 'blue' },
    { name: 'TypeScript', level: 90, icon: 'typescript', color: 'blue' },
    { name: 'Tailwind CSS', level: 98, icon: 'tailwindcss', color: 'green' }
  ],
  backend: [
    { name: 'Node.js', level: 92, icon: 'nodejs', color: 'blue' },
    { name: 'Express', level: 88, icon: 'server', color: 'green' },
    { name: 'Python', level: 80, icon: 'python', color: 'blue' },
    { name: 'PostgreSQL', level: 85, icon: 'database', color: 'blue' }
  ],
  devops: [
    { name: 'Docker', level: 85, icon: 'docker', color: 'blue' },
    { name: 'AWS', level: 75, icon: 'aws', color: 'green' },
    { name: 'CI/CD', level: 80, icon: 'cicd', color: 'purple' },
    { name: 'Kubernetes', level: 70, icon: 'kubernetes', color: 'blue' }
  ],
  tools: [
    { name: 'Git', level: 95, icon: 'git', color: 'green' },
    { name: 'VS Code', level: 97, icon: 'vscode', color: 'blue' },
    { name: 'Figma', level: 85, icon: 'figma', color: 'purple' },
    { name: 'Jest', level: 83, icon: 'testing', color: 'green' }
  ]
})

const activeCategory = ref('frontend')
const isChart3D = ref(false)

const radarData = computed(() => {
  return skills.value[activeCategory.value].map(skill => ({
    subject: skill.name,
    value: skill.level,
    fullMark: 100
  }))
})

onMounted(() => {
  // Animate skill meters on scroll
  gsap.utils.toArray('.skill-meter').forEach(meter => {
    gsap.from(meter, {
      width: 0,
      scrollTrigger: {
        trigger: meter,
        start: 'top 80%',
        toggleActions: 'play play play play'
      },
      duration: 0.5,
      ease: 'power3.out'
    })
  })

  // Animate category buttons
  gsap.from('.category-btn', {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: '#skills-section',
      start: 'top 70%'
    }
  })
})

const toggleView = () => {
  isChart3D.value = !isChart3D.value
}
</script>

<template>
  <section id="skills" class="py-20 px-4 sm:px-6 lg:px-8">
    <AnimatedBackground />
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title">
          My Skills
        </h2>
        <p class="section-subtitle">
          Technologies I work with and my proficiency levels
        </p>
      </div>

      <div class="flex justify-center mb-12">
        <div class="inline-flex rounded-lg bg-white dark:bg-gray-800 p-1 shadow-sm">
          <button
            v-for="category in Object.keys(skills)"
            :key="category"
            @click="activeCategory = category"
            class="category-btn px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 capitalize"
            :class="{
              'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300': activeCategory === category,
              'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': activeCategory !== category
            }"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                Skill Breakdown
              </h3>
              <button
                @click="toggleView"
                class="text-sm px-3 py-1 rounded-md  bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                {{ isChart3D ? '2D View' : '3D View' }}
              </button>
            </div>
            
            <SkillRadarChart 
              :data="radarData" 
              :is-3d="isChart3D"
              class="h-64 w-full"
            />
          </div>
        </div>

        <div>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Proficiency Levels
            </h3>
            
            <div v-for="skill in skills[activeCategory]" :key="skill.name" class="mb-4">
              <div class="flex justify-between items-center mb-1">
                <span class="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                  <span class="w-6 h-6 mr-2" :class="`text-${skill.color}-500`">
                    <component :is="skill.icon" class="w-full h-full" />
                  </span>
                  {{ skill.name }}
                </span>
                <span class="text-sm text-gray-500">{{ skill.level }}%</span>
              </div>
              <div class="h-2 rounded-full bg-green-500 overflow-hidden" :class="`w-${skill.level}`">
               <SkillMeter 
  :name="skill.name"
  :level="skill.level"
  :color="skill.color"
/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="category in Object.keys(skills)"
          :key="category"
          class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
        >
          <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-3 capitalize">
            {{ category }}
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in skills[category]"
              :key="skill.name"
              class="px-2 py-1 text-xs rounded-full"
              :class="`bg-${skill.color}-100 dark:bg-${skill.color}-900/30 text-${skill.color}-800 dark:text-${skill.color}-200`"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
