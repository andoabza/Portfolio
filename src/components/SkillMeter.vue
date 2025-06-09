<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    validator: value => value >= 0 && value <= 100
  },
  color: {
    type: String,
    default: 'primary'
  }
})

const meter = ref(null)

onMounted(() => {
  gsap.fromTo(meter.value, 
    { width: '0%' },
    { 
      width: `${props.level}%`,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    }
  )
})
</script>

<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="font-medium text-gray-900 dark:text-gray-100">{{ name }}</span>
      <span class="text-sm text-gray-500">{{ level }}%</span>
    </div>
    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div 
        ref="meter"
        class="h-full rounded-full"
        :class="`bg-${color}-500`"
        :style="{ width: '0%' }"
      />
    </div>
  </div>
</template>