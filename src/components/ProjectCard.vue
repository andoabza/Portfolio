<template>
  <div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  data-animate="fade"
>
  <div
    v-for="(project, index) in filteredProjects"
    :key="index"
    class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        :src="require(`../assets/images/${project.image}`)"
        :alt="project.title + ' screenshot'"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
      >
        <div class="flex space-x-3">
          <a
            v-for="(link, idx) in project.links"
            :key="idx"
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
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {{ project.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tech, idx) in project.technologies"
          :key="idx"
          class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</div>
  
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>
