<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const canvas = ref(null)

let scene, camera, renderer, composer, cells = [], connections = [], group, clock

const createCell = () => {
  const geometry = new THREE.SphereGeometry(0.5, 16, 16)
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 70%)`),
    transparent: true,
    opacity: 0.5
  })
  const cell = new THREE.Mesh(geometry, material)
  cell.position.set(
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 40
  )
  cell.userData.velocity = new THREE.Vector3(
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01
  )
  return cell
}

const updateConnections = () => {
  connections.forEach(line => scene.remove(line))
  connections = []

  for (let i = 0; i < cells.length; i++) {
    for (let j = i + 1; j < cells.length; j++) {
      const dist = cells[i].position.distanceTo(cells[j].position)
      if (dist < 6) {
        const geom = new THREE.BufferGeometry().setFromPoints([
          cells[i].position,
          cells[j].position
        ])
        const mat = new THREE.LineBasicMaterial({
          color: new THREE.Color('white'),
          transparent: true,
          opacity: 0.2 + (1 - dist / 6) * 0.4
        })
        const line = new THREE.Line(geom, mat)
        connections.push(line)
        scene.add(line)
      }
    }
  }
}

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 50

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2, 0.4, 0.6
  ))

  group = new THREE.Group()
  clock = new THREE.Clock()

  for (let i = 0; i < 80; i++) {
    const cell = createCell()
    group.add(cell)
    cells.push(cell)
  }

  scene.add(group)
}

const animate = () => {
  const elapsed = clock.getElapsedTime()
  group.rotation.y = Math.sin(elapsed * 0.05) * 0.5

  cells.forEach(cell => {
    cell.position.add(cell.userData.velocity)

    // Soft bounce
    if (Math.abs(cell.position.x) > 20) cell.userData.velocity.x *= -1
    if (Math.abs(cell.position.y) > 20) cell.userData.velocity.y *= -1
    if (Math.abs(cell.position.z) > 20) cell.userData.velocity.z *= -1

    // Pulse
    const scale = 1 + Math.sin(elapsed * 2 + cell.position.x) * 0.2
    cell.scale.set(scale, scale, scale)
  })

  updateConnections()
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
  renderer?.dispose()
  cells.forEach(c => c.geometry.dispose())
})
</script>

<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
</template>
