<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)
let scene, camera, renderer, clock, helixGroup

const techGenes = [
  'HTML', 'CSS', 'JavaScript', 'Vue',
  'React', 'Node.js', 'Express', 'MongoDB',
  'PostgreSQL', 'Docker', 'GraphQL', 'TypeScript',
  'Three.js', 'Vite', 'TailwindCSS', 'OpenAI'
]

const createGeneLabel = (text, color) => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.font = 'bold 28px monospace'
  ctx.fillText(text, 10, 40)

  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(3, 0.8, 1)
  return sprite
}

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 25)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)

  clock = new THREE.Clock()
  helixGroup = new THREE.Group()

  const turns = 5
  const spacing = 1.4
  const radius = 4

  for (let i = 0; i < techGenes.length; i++) {
    const angle = i * Math.PI / 4
    const y = i * spacing - (techGenes.length * spacing) / 2

    const left = createGeneLabel(techGenes[i], '#00ffff')
    const right = createGeneLabel(techGenes[i], '#ff00ff')

    left.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
    right.position.set(-Math.cos(angle) * radius, y, -Math.sin(angle) * radius)

    helixGroup.add(left)
    helixGroup.add(right)

    const connectorGeo = new THREE.CylinderGeometry(0.05, 0.05, radius * 2, 8)
    const connectorMat = new THREE.MeshBasicMaterial({ color: '#444444' })
    const connector = new THREE.Mesh(connectorGeo, connectorMat)
    connector.position.set(0, y, 0)
    connector.rotation.z = angle
    helixGroup.add(connector)
  }

  scene.add(helixGroup)
}

const animate = () => {
  const t = clock.getElapsedTime()
  helixGroup.rotation.y = t * 0.3
  helixGroup.rotation.x = Math.sin(t * 0.1) * 0.1
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
