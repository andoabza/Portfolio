<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  position: {
    type: String,
    default: 'left',
    validator: value => ['left', 'right'].includes(value)
  }
})
</script>

<template>
  <div class="relative lg:flex lg:items-center lg:justify-between mb-8">
    <div 
      class="lg:w-5/12 mb-4 lg:mb-0" 
      :class="{ 'lg:order-1': position === 'left', 'lg:order-3': position === 'right' }"
    >
      <div 
        class="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full"
        :class="{ 'lg:mr-8': position === 'left', 'lg:ml-8': position === 'right' }"
      >
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {{ item.title }}
        </h3>
        <p class="text-primary-600 dark:text-primary-400 font-medium mb-2">
          {{ item.company }}
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          {{ item.description }}
        </p>
      </div>
    </div>
    <!-- Center year marker -->
    <div class="hidden lg:block lg:order-2 lg:w-2/12 lg:px-4">
      <div class="flex items-center justify-center h-full">
        <div class="flex-shrink-0 w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300 border-4 border-white dark:border-gray-900 shadow">
          <component :is="item.icon" class="h-6 w-6" />
        </div>
      </div>
    </div>


    <!-- Right-aligned year (mobile) / left-aligned year (desktop) -->
    <div 
      class="lg:w-5/12 lg:order-3"
      :class="{ 'lg:order-1': position === 'right' }"
    >
      <div class="flex items-center lg:justify-end">
        <div class="lg:hidden flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-white mr-4">
          <component :is="item.icon" class="h-5 w-5" />
        </div>
        <span class="text-lg font-medium text-white">
          {{ item.year }}
        </span>
      </div>
    </div>
  </div>
</template>
