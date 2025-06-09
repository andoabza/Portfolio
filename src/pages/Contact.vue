<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from 'emailjs-com'
import AnimatedBackground from '../components/AnimatedBackground.vue'

gsap.registerPlugin(ScrollTrigger)

const formRef = ref(null)
const isLoading = ref(false)
const isSuccess = ref(false)
const isError = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/andoabza',
    handle: '@andoabza'
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/andooabza',
    handle: 'in/andooabza'
  },
  // {
  //   name: 'Twitter',
  //   icon: 'twitter',
  //   url: 'https://twitter.com/abdoabza',
  //   handle: '@abdoabza'
  // },
  {
    name: 'Email',
    icon: 'mail',
    url: 'mailto:terbu102@gmail.com',
    handle: 'terbu102@gmail.com'
  }
]

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  // Show a temporary notification
  const notification = document.createElement('div')
  notification.textContent = 'Copied to clipboard!'
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
  document.body.appendChild(notification)
  setTimeout(() => {
    document.body.removeChild(notification)
  }, 2000)
}

const sendEmail = async (e) => {
  e.preventDefault()
  isLoading.value = true
  isSuccess.value = false
  isError.value = false

  try {
    await emailjs.sendForm(
      'service_e83kkze',
      'template_o3a22dj',
      e.target,
      'QY9sEX8woF6u4oMkZ'
    )
    
    isSuccess.value = true
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error('Failed to send email:', error)
    isError.value = true
  } finally {
    isLoading.value = false
    
    // Reset messages after 5 seconds
    setTimeout(() => {
      isSuccess.value = false
      isError.value = false
    }, 15000)
  }
}

onMounted(() => {
  // Initialize EmailJS
  emailjs.init('QY9sEX8woF6u4oMkZ')

  // Animate form elements
  gsap.utils.toArray('.form-element').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: formRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  })

  // Animate social cards
  gsap.utils.toArray('.social-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      x: i % 2 === 0 ? -20 : 20,
      duration: 0.8,
      delay: i * 0.15,
      scrollTrigger: {
        trigger: '#contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  })
})
</script>

<template>
  <section id="contact" ref="formRef" class="py-20 px-4 sm:px-6 lg:px-8 -z-10">
    <AnimatedBackground />
    
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Get In Touch
        </h2>
        <p class="section-subtitle">
          Have a project in mind or want to connect? Reach out!
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class=" rounded-xl shadow-lg overflow-hidden">
          <div class="p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Me a Message
            </h3>
            
            <form @submit.prevent="sendEmail" class="space-y-6">
              <div v-if="isSuccess" class="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
                <p>Thanks for your message! I'll get back to you soon.</p>
              </div>
              
              <div v-if="isError" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
                <p>Oops! There was an error submitting the form. Please try again.</p>
              </div>

              <div class="form-element">
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-colors duration-300"
                  placeholder="John Doe"
                >
              </div>

              <div class="form-element">
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-colors duration-300"
                  placeholder="you@example.com"
                >
              </div>

              <div class="form-element">
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-colors duration-300"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <div class="form-element bg-grey-800">
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full  flex justify-center items-center"
                >
                  <span v-if="!isLoading">Send Message</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Contact Information -->
        <div>
          <div class=" rounded-xl shadow-lg overflow-hidden h-full">
            <div class="p-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div class="space-y-4">
                <div 
                  v-for="(link, index) in socialLinks"
                  :key="index"
                  class="social-card group relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-300 border border-gray-200 dark:border-gray-600"
                >
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-300 group-hover:bg-white dark:group-hover:bg-primary-800 transition-colors duration-300">
                      <component :is="link.icon" class="h-6 w-6" />
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                        {{ link.name }}
                      </h4>
                      <p class="text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {{ link.handle }}
                      </p>
                    </div>
                  </div>
                  <div class="absolute top-4 right-4 flex space-x-2">
                    <a
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-2 rounded-full bg-white dark:bg-gray-600 shadow hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-300"
                      :aria-label="`Open ${link.name}`"
                    >
                      <component :is="'external-link'" class="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </a>
                    <button
                      @click="copyToClipboard(link.handle)"
                      class="p-2 rounded-full bg-white dark:bg-gray-600 shadow hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-300"
                      aria-label="Copy to clipboard"
                    >
                      <component :is="'clipboard-copy'" class="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Let's Work Together
                </h4>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                  I'm currently available for freelance work and full-time positions. If you have a project that needs creative solutions, I'd love to hear about it.
                </p>
                <div class="flex flex-wrap gap-3">
                  <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                    Available for Freelance
                  </span>
                  <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    Open to Full-time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-h-9 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>