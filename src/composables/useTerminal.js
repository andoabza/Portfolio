import { ref } from 'vue'

export const useTerminal = () => {
  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => Object.entries(commands)
        .map(([cmd, { description }]) => `${cmd.padEnd(15)}${description}`)
        .join('\n')
    },
    about: {
      description: 'About me',
      execute: () => `I'm a passionate FullStack developer with expertise in Vue.js, Node.js, and modern web technologies.`
    },
    skills: {
      description: 'List my technical skills',
      execute: () => 'Vue.js • React • Node.js • TypeScript • Python • Docker • AWS'
    },
    contact: {
      description: 'Get my contact information',
      execute: () => 'Email: hello@example.com\nGitHub: github.com/yourusername\nLinkedIn: linkedin.com/in/yourprofile'
    },
    clear: {
      description: 'Clear terminal history',
      execute: () => {
        history.value = []
        return ''
      }
    }
  }

  const input = ref('')
  const history = ref([
    { type: 'output', text: 'Welcome to my interactive terminal!\nType "help" to see available commands.' }
  ])

  const executeCommand = () => {
    const cmdText = input.value.trim()
    if (!cmdText) return

    history.value.push({ type: 'command', text: cmdText })

    const [cmd, ...args] = cmdText.split(' ')
    const command = commands[cmd.toLowerCase()]

    if (command) {
      const output = command.execute(args)
      if (output) {
        history.value.push({ type: 'output', text: output })
      }
    } else {
      history.value.push({ type: 'output', text: `Command not found: ${cmd}\nType "help" for available commands.` })
    }

    input.value = ''
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const cmdText = input.value.trim()
      const matchingCommands = Object.keys(commands).filter(c => c.startsWith(cmdText))
      if (matchingCommands.length === 1) {
        input.value = matchingCommands[0]
      }
    }
  }

  return {
    commands,
    input,
    history,
    executeCommand,
    handleKeyDown
  }
}