<script setup>
import { ref, onMounted, watch } from 'vue'
import * as THREE from 'three'
import { RadarChart } from 'react-vis'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  is3D: {
    type: Boolean,
    default: false
  }
})

const chartRef = ref(null)

// 2D Radar Chart implementation would go here
// For actual implementation, you might want to use a charting library
// like Chart.js, D3.js, or react-vis with Vue wrappers

// 3D Radar Chart implementation
const init3DChart = () => {
  if (!chartRef.value) return

  // Clear previous render
  while (chartRef.value.firstChild) {
    chartRef.value.removeChild(chartRef.value.firstChild)
  }

  const width = chartRef.value.clientWidth
  const height = chartRef.value.clientHeight

  // Scene setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(width, height)
  chartRef.value.appendChild(renderer.domElement)

  // Create radar geometry
  const createSpoke = (length, angle) => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([
      0, 0, 0,
      length * Math.cos(angle), length * Math.sin(angle), 0
    ])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    return geometry
  }

  const createRing = (radius, segments) => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), 0)
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))
    return geometry
  }

  // Add radar guides
  const ringMaterial = new THREE.LineBasicMaterial({ color: 0x444444 })
  const spokeMaterial = new THREE.LineBasicMaterial({ color: 0x666666 })

  // Add rings
  for (let i = 1; i <= 5; i++) {
    const ring = new THREE.Line(
      createRing(i / 5, 32),
      ringMaterial
    )
    scene.add(ring)
  }

  // Add spokes
  const spokeCount = props.data.length
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * Math.PI * 2
    const spoke = new THREE.Line(
      createSpoke(1, angle),
      spokeMaterial
    )
    scene.add(spoke)
  }

  // Add data points
  const points = []
  props.data.forEach((item, i) => {
    const angle = (i / spokeCount) * Math.PI * 2
    const radius = item.value / 100
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)

    const geometry = new THREE.SphereGeometry(0.05, 16, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(x, y, 0)
    scene.add(sphere)
    points.push(new THREE.Vector3(x, y, 0))
  })

  // Add connecting lines
  if (points.length > 2) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    geometry.setIndex([...Array(points.length).keys(), 0]) // Close the shape
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, linewidth: 2 })
    )
    scene.add(line)
  }

  // Animation
  const animate = () => {
    requestAnimationFrame(animate)
    scene.rotation.z += 0.005
    renderer.render(scene, camera)
  }
  animate()

  // Handle resize
  const handleResize = () => {
    camera.aspect = chartRef.value.clientWidth / chartRef.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(chartRef.value.clientWidth, chartRef.value.clientHeight)
  }
  window.addEventListener('resize', handleResize)

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    chartRef.value?.removeChild(renderer.domElement)
  })
}

watch(() => props.is3D, (val) => {
  if (val) {
    init3DChart()
  } else {
    // Initialize 2D chart
  }
}, { immediate: true })
</script>

<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>