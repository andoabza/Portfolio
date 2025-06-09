import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = () => {
  const setupAnimations = () => {
    gsap.utils.toArray('[data-animate]').forEach(element => {
      const animationType = element.dataset.animate
      
      switch (animationType) {
        case 'fade':
          gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1
          })
          break
          
        case 'slide-left':
          gsap.from(element, {
            x: -100,
            opacity: 0,
            duration: 1
          })
          break
          
        case 'slide-right':
          gsap.from(element, {
            x: 100,
            opacity: 0,
            duration: 1
          })
          break
          
        default:
          gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1
          })
      }
    })
  }

  onMounted(() => {
    setupAnimations()
  })
}