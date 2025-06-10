<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)

let scene, camera, renderer, clock, meshGroup
let geometry, material, points, lines
const gridSize = 30
const waveAmplitude = 2
const waveFrequency = 0.3

const init = () => {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 10, 25)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 1)

  clock = new THREE.Clock()

  // Geometry setup: grid points
  geometry = new THREE.BufferGeometry()
  const positions = []
  const colors = []
  const indices = []

  const color1 = new THREE.Color('#00ffff') // neon cyan
  const color2 = new THREE.Color('#7f00ff') // neon purple

  // Generate grid points in XZ plane
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      const x = (i - gridSize / 2)
      const z = (j - gridSize / 2)
      const y = 0 // initial flat plane, y will animate as wave

      positions.push(x, y, z)

      // color gradient based on position
      const lerpFactor = i / gridSize
      const color = color1.clone().lerp(color2, lerpFactor)
      colors.push(color.r, color.g, color.b)
    }
  }

  // Create indices for connecting lines (horizontal and vertical grid lines)
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const idx = i * (gridSize + 1) + j

      // horizontal line
      indices.push(idx, idx + 1)
      // vertical line
      indices.push(idx, idx + gridSize + 1)
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setIndex(indices)

  // Points material (glowing nodes)
  material = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)

  // Lines for connections
  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.4,
  })

  lines = new THREE.LineSegments(geometry, lineMaterial)
  scene.add(lines)
}

const animate = () => {
  const elapsed = clock.getElapsedTime()
  const positions = geometry.attributes.position.array

  // Animate Y positions with wave function
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      const idx = 3 * (i * (gridSize + 1) + j)
      const x = positions[idx]
      const z = positions[idx + 2]
      positions[idx + 1] = Math.sin(elapsed * 2 + x * waveFrequency + z * waveFrequency) * waveAmplitude
    }
  }

  geometry.attributes.position.needsUpdate = true

  // Slight slow rotation for dynamic camera feel
  scene.rotation.y = elapsed * 0.1

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  renderer.dispose()
})
</script>

<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
</template>

<style scoped>
canvas {
  background: black;
  display: block;
}
</style>
