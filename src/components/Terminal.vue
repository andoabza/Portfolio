<script setup>
import { ref, onMounted } from 'vue'
import { useTerminal } from '../composables/useTerminal'

const { 
  commands,
  input,
  history,
  executeCommand,
  handleKeyDown
} = useTerminal()

const terminalRef = ref(null)

onMounted(() => {
  terminalRef.value.scrollTop = terminalRef.value.scrollHeight
})
</script>

<template>
  <div class="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
    <div class="flex items-center px-4 py-3 bg-gray-800">
      <div class="flex space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div class="ml-4 text-sm text-gray-400">terminal</div>
    </div>
    <div 
      ref="terminalRef"
      class="p-4 font-mono text-sm text-gray-100 h-64 overflow-y-auto"
    >
      <div v-for="(item, index) in history" :key="index" class="mb-2">
        <div v-if="item.type === 'command'" class="flex">
          <span class="text-green-400 mr-2">$</span>
          <span>{{ item.text }}</span>
        </div>
        <div v-else class="whitespace-pre-line">{{ item.text }}</div>
      </div>
      <div class="flex items-center">
        <span class="text-green-400 mr-2">$</span>
        <input
          v-model="input"
          @keydown.enter="executeCommand"
          @keydown="handleKeyDown"
          class="bg-transparent border-none outline-none flex-1 text-gray-100 caret-green-400"
          type="text"
          autofocus
        />
      </div>
    </div>
  </div>
</template>