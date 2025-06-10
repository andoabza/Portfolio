<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)

let scene, camera, renderer, coreMesh, particleGroup, techLabels, clock
let particles = []
const techNames = ['HTML', 'CSS', 'JavaScript', 'Vue', 'Node', 'Three.js', 'React', 'MongoDB', 'Docker', 'TypeScript']

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 30)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 1)

  clock = new THREE.Clock()

  // Core Sphere (Your Identity)
  const coreGeometry = new THREE.IcosahedronGeometry(2, 1)
  const coreMaterial = new THREE.MeshBasicMaterial({ color: '#00ffff', wireframe: true })
  coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
  scene.add(coreMesh)

  // Particle Group
  particleGroup = new THREE.Group()
  scene.add(particleGroup)

  const particleGeo = new THREE.SphereGeometry(0.1, 8, 8)
  const particleMat = new THREE.MeshBasicMaterial({ color: '#7f00ff' })

  for (let i = 0; i < 200; i++) {
    const particle = new THREE.Mesh(particleGeo, particleMat)
    const angle = Math.random() * Math.PI * 2
    const radius = 10 + Math.random() * 10
    particle.userData = {
      angle,
      radius,
      speed: 0.001 + Math.random() * 0.002
    }
    particle.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 10,
      Math.sin(angle) * radius
    )
    particleGroup.add(particle)
    particles.push(particle)
  }

  // Tech Label Sprites
  techLabels = new THREE.Group()
  techNames.forEach((name, i) => {
    const label = createTextLabel(name)
    const angle = (i / techNames.length) * Math.PI * 2
    const radius = 8
    label.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    techLabels.add(label)
  })
  scene.add(techLabels)
}

const createTextLabel = (text) => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#00ffff'
  ctx.font = 'bold 32px monospace'
  ctx.fillText(text, 10, 40)

  const texture = new THREE.CanvasTexture(canvas)
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true })
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(4, 1, 1)
  return sprite
}

const animate = () => {
  const elapsed = clock.getElapsedTime()

  coreMesh.rotation.y += 0.002

  particles.forEach((p) => {
    p.userData.angle += p.userData.speed
    p.position.x = Math.cos(p.userData.angle) * p.userData.radius
    p.position.z = Math.sin(p.userData.angle) * p.userData.radius
  })

  techLabels.rotation.z = elapsed * 0.2
  particleGroup.rotation.y = elapsed * 0.1

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
  background-color: black;
}
</style>
