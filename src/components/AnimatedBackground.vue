<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const canvas = ref(null)

let scene, camera, renderer, composer, particles, geometry, material, clock

const init = () => {
  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 30

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  // Make sure background is transparent
  renderer.setClearColor(0x000000, 0)

  // Post-processing
  composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, 0.4, 0.85
  )
  composer.addPass(bloomPass)

  // Particles
  geometry = new THREE.BufferGeometry()
  const particleCount = 1000
  const posArray = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
  material = new THREE.PointsMaterial({
    size: 0.2,
    color: new THREE.Color('#8b5cf6'),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Animation clock
  clock = new THREE.Clock()
}

const animate = () => {
  const elapsedTime = clock.getElapsedTime()

  particles.rotation.x = elapsedTime * 0.1
  particles.rotation.y = elapsedTime * 0.05

  composer.render()
  requestAnimationFrame(animate)
}

const handleResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  // Clean up Three.js resources
  if (renderer) {
    renderer.dispose()
  }
  if (geometry) {
    geometry.dispose()
  }
  if (material) {
    material.dispose()
  }
})
</script>

<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none" />
</template>