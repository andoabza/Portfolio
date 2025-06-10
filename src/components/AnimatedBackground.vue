<script setup>
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)
let scene, camera, renderer, clock, helixGroup, raycaster, mouse

const techGenes = [
  { name: 'HTML', desc: 'Markup language for structuring web pages' },
  { name: 'CSS', desc: 'Styling and layout for web design' },
  { name: 'JavaScript', desc: 'Programming language for interactivity' },
  { name: 'Vue', desc: 'Progressive JavaScript framework' },
  { name: 'React', desc: 'UI library for building interfaces' },
  { name: 'Node.js', desc: 'JavaScript runtime for backend' },
  { name: 'Express', desc: 'Web framework for Node.js' },
  { name: 'MongoDB', desc: 'NoSQL database system' },
  { name: 'PostgreSQL', desc: 'Relational database system' },
  { name: 'Docker', desc: 'Containerization platform' },
  { name: 'GraphQL', desc: 'API query language' },
  { name: 'TypeScript', desc: 'Typed superset of JavaScript' },
  { name: 'Three.js', desc: '3D library for the web' },
  { name: 'Vite', desc: 'Frontend build tool' },
  { name: 'TailwindCSS', desc: 'Utility-first CSS framework' },
  { name: 'OpenAI', desc: 'AI research organization' },
]

const hoveredGene = reactive({ index: null, x: 0, y: 0 })

// Create label sprite with text
const createGeneLabel = (text, color) => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = color
  ctx.font = 'bold 28px monospace'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 10, canvas.height / 2)
  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(3, 0.8, 1)
  return sprite
}

const geneObjects = []
const geneScales = []

// Setup scene and objects
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
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  const spacing = 1.4
  const radius = 4

  for (let i = 0; i < techGenes.length; i++) {
    const angle = i * Math.PI / 4
    const y = i * spacing - (techGenes.length * spacing) / 2

    const left = createGeneLabel(techGenes[i].name, '#00ffff')
    const right = createGeneLabel(techGenes[i].name, '#ff00ff')

    left.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
    right.position.set(-Math.cos(angle) * radius, y, -Math.sin(angle) * radius)

    // Start scale at zero for scroll animation
    left.scale.set(0, 0, 0)
    right.scale.set(0, 0, 0)

    helixGroup.add(left)
    helixGroup.add(right)

    geneObjects.push(left, right)
    geneScales.push(0, 0)

    // Connector rods
    const connectorGeo = new THREE.CylinderGeometry(0.05, 0.05, radius * 2, 8)
    const connectorMat = new THREE.MeshBasicMaterial({ color: '#444444' })
    const connector = new THREE.Mesh(connectorGeo, connectorMat)
    connector.position.set(0, y, 0)
    connector.rotation.z = angle
    helixGroup.add(connector)
  }

  scene.add(helixGroup)
}

// Animate and render scene
const animate = () => {
  const elapsed = clock.getElapsedTime()
  helixGroup.rotation.y = elapsed * 0.3
  helixGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.1

  // Neon glow pulse by modulating opacity of gene labels
  geneObjects.forEach((sprite, idx) => {
    const pulse = 0.6 + 0.4 * Math.sin(elapsed * 3 + idx)
    sprite.material.opacity = pulse
  })

  // Animate genes scale based on scroll (simple approximation)
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
  geneObjects.forEach((sprite, idx) => {
    const targetScale = Math.min(1, Math.max(0, scrollPercent * techGenes.length * 2 - idx / 2))
    sprite.scale.lerp(new THREE.Vector3(targetScale * 3, targetScale * 0.8, 1), 0.1)
  })

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

// Handle mouse movement for hover detection
const onMouseMove = (event) => {
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}
window.addEventListener('mousemove', onMouseMove)

// Check hover with raycaster and update popup info position
const checkHover = () => {
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(geneObjects)

  if (intersects.length > 0) {
    const obj = intersects[0].object
    const index = geneObjects.indexOf(obj)
    if (index !== -1) {
      hoveredGene.index = Math.floor(index / 2)
      const canvasBounds = renderer.domElement.getBoundingClientRect()
      hoveredGene.x = ((mouse.x + 1) / 2) * canvasBounds.width
      hoveredGene.y = ((-mouse.y + 1) / 2) * canvasBounds.height
      return
    }
  }
  hoveredGene.index = null
}

// Resize handler
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
  // Use animation frame to regularly check hover
  const hoverLoop = () => {
    checkHover()
    requestAnimationFrame(hoverLoop)
  }
  hoverLoop()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  renderer?.dispose()
})
</script>

<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-auto" />
  <transition name="fade">
    <div
      v-if="hoveredGene.index !== null"
      class="popup"
      :style="{ left: hoveredGene.x + 'px', top: hoveredGene.y + 'px' }"
    >
      <strong>{{ techGenes[hoveredGene.index].name }}</strong>
      <p>{{ techGenes[hoveredGene.index].desc }}</p>
    </div>
  </transition>
</template>

<style scoped>
canvas {
  background: black;
  display: block;
}

.popup {
  position: fixed;
  background: rgba(0, 255, 255, 0.85);
  color: black;
  padding: 12px 16px;
  border-radius: 8px;
  pointer-events: none;
  transform: translate(-50%, -100%);
  max-width: 200px;
  font-family: monospace;
  font-size: 14px;
  user-select: none;
  box-shadow: 0 0 10px #00ffffaa;
  transition: background 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
