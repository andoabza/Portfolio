<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)

let scene, camera, renderer, group, clock
let angle = 0

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, window.innerWidth > 768 ? 60 : 30)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 1)

  clock = new THREE.Clock()

  group = new THREE.Group()
  scene.add(group)

  const voxelSize = window.innerWidth > 768 ? 1.3 : 0.8
  const spacing = window.innerWidth > 768 ? 1.5 : 1.0
  const geometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize)
  const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, emissive: 0x3366ff, emissiveIntensity: 0.6 })

  for (let x = -3; x <= 3; x++) {
    for (let y = -3; y <= 3; y++) {
      for (let z = -3; z <= 3; z++) {
        if (Math.random() < 0.6) continue
        const cube = new THREE.Mesh(geometry, material.clone())
        cube.position.set(x * spacing, y * spacing, z * spacing)
        group.add(cube)
      }
    }
  }

  const light = new THREE.PointLight(0x99ccff, 1.5)
  light.position.set(5, 10, 10)
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(0x404040)
  scene.add(ambientLight)
}

const animate = () => {
  const elapsed = clock.getElapsedTime()

  group.rotation.y = window.scrollY / 500
  group.rotation.x = Math.sin(elapsed * 0.5) * 0.3
  group.rotation.z = Math.cos(elapsed * 0.5) * 0.3

  group.children.forEach((child, i) => {
    child.scale.setScalar(1 + 0.3 * Math.sin(elapsed * 2 + i))
    child.material.emissiveIntensity = 0.5 + 0.5 * Math.sin(elapsed * 2 + i)
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
  background-color: transparent;
}
</style>
