<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)
let scene, camera, renderer, clock, galaxyGroup

const terminalTexts = [
  'npm run dev',
  'git commit -m "Initial commit"',
  'yarn build',
  'npx vite',
  'node server.js',
  'curl openai.com',
  'ls -la',
  'cd /projects/portfolio',
  'code .',
  'docker-compose up'
]

const createTerminalPlane = (text) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 512
  canvas.height = 128

  // Background
  ctx.fillStyle = '#000000dd'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Text
  ctx.fillStyle = '#00ff88'
  ctx.font = 'bold 24px monospace'
  ctx.fillText(text, 20, 80)

  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(6, 1.5, 1)

  return sprite
}

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 30

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)

  clock = new THREE.Clock()
  galaxyGroup = new THREE.Group()

  for (let i = 0; i < terminalTexts.length; i++) {
    const sprite = createTerminalPlane(terminalTexts[i])
    const angle = Math.random() * 2 * Math.PI
    const radius = 15 + Math.random() * 10
    const y = (Math.random() - 0.5) * 20

    sprite.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    )

    galaxyGroup.add(sprite)
  }

  scene.add(galaxyGroup)
}

const animate = () => {
  const t = clock.getElapsedTime()
  galaxyGroup.rotation.y = t * 0.03

  galaxyGroup.children.forEach((sprite, i) => {
    sprite.material.opacity = 0.8 + Math.sin(t + i) * 0.2
  })

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  renderer?.dispose()
})
</script>

<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
</template>

<style scoped>
canvas {
  background: black;
}
</style>
