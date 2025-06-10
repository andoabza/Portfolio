<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)

let scene, camera, renderer, nodes = [], edges = [], group, clock

const NODE_COUNT = 80
const EDGE_DISTANCE = 12

const createNode = () => {
  const geo = new THREE.SphereGeometry(0.5, 12, 12)
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`hsl(${Math.random() * 360}, 80%, 70%)`)
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 40
  )
  return mesh
}

const createEdges = () => {
  const lines = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].position.distanceTo(nodes[j].position)
      if (dist < EDGE_DISTANCE) {
        const geom = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position,
          nodes[j].position
        ])
        const mat = new THREE.LineBasicMaterial({
          color: new THREE.Color('cyan'),
          transparent: true,
          opacity: 0.15
        })
        lines.push(new THREE.Line(geom, mat))
      }
    }
  }
  return lines
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

  clock = new THREE.Clock()
  group = new THREE.Group()

  for (let i = 0; i < NODE_COUNT; i++) {
    const node = createNode()
    nodes.push(node)
    group.add(node)
  }

  edges = createEdges()
  edges.forEach(e => group.add(e))

  scene.add(group)
}

const animate = () => {
  const t = clock.getElapsedTime()
  const scale = 1 + Math.sin(t * 1.5) * 0.05
  group.scale.set(scale, scale, scale)

  group.rotation.y += 0.001
  group.rotation.x = Math.sin(t * 0.2) * 0.05

  edges.forEach(edge => {
    edge.material.opacity = 0.1 + 0.05 * Math.sin(t * 5 + edge.id)
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
  nodes.forEach(n => n.geometry.dispose())
})
</script>

<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
</template>
