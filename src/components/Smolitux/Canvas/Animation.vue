<template>
  <div class="animation-container">
    <smolitux-canvas
      ref="canvas"
      @mouse-wheel="onMouseWheel"
      @mouse-down="onMouseDown"
      @mouse-up="onMouseUp"
      @mouse-move="onMouseMove"
      @mouse-click="onMouseClick"
      @double-click="onDoubleClick"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SmolituxCanvas from './Canvas.vue'

export default {
  name: 'SmolituxAnimation',
  components: {
    SmolituxCanvas
  },
  data() {
    return {
      isRunning: false,
      animationLoop: null,
      fps: 30,
      draggedNode: null,
      scale: 1,
      offset: { x: 0, y: 0 }
    }
  },
  computed: {
    ...mapState('network', ['nodes', 'connections', 'selectedNode'])
  },
  mounted() {
    this.start()
    this.connect()
  },
  beforeDestroy() {
    this.stop()
    this.disconnect()
  },
  methods: {
    ...mapActions('network', [
      'connect',
      'disconnect',
      'addNode',
      'updateNode',
      'removeNode',
      'addConnection',
      'removeConnection',
      'selectNode'
    ]),
    start() {
      if (this.isRunning) return
      this.isRunning = true
      this.animationLoop = setInterval(this.draw, 1000 / this.fps)
    },
    stop() {
      if (!this.isRunning) return
      this.isRunning = false
      if (this.animationLoop) {
        clearInterval(this.animationLoop)
        this.animationLoop = null
      }
    },
    draw() {
      const canvas = this.$refs.canvas
      if (!canvas) return

      const ctx = canvas.$refs.canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.$refs.canvas.width, canvas.$refs.canvas.height)

      // Apply transformations
      ctx.save()
      ctx.translate(this.offset.x, this.offset.y)
      ctx.scale(this.scale, this.scale)

      // Draw connections
      this.connections.forEach(connection => {
        this.drawConnection(ctx, connection)
      })

      // Draw nodes
      this.nodes.forEach(node => {
        this.drawNode(ctx, node)
      })

      ctx.restore()
    },
    drawNode(ctx, node) {
      const radius = node.radius || 20
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
      
      // Different colors for different node types
      switch (node.type) {
        case 'chatbot':
          ctx.fillStyle = '#42b983'
          break
        case 'llm':
          ctx.fillStyle = '#3498db'
          break
        case 'database':
          ctx.fillStyle = '#e74c3c'
          break
        default:
          ctx.fillStyle = '#95a5a6'
      }

      // Highlight selected node
      if (this.selectedNode && this.selectedNode.id === node.id) {
        ctx.lineWidth = 3
        ctx.strokeStyle = '#f1c40f'
      } else {
        ctx.lineWidth = 1
        ctx.strokeStyle = '#2c3e50'
      }

      ctx.fill()
      ctx.stroke()

      if (node.label) {
        ctx.fillStyle = '#2c3e50'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = '12px Arial'
        ctx.fillText(node.label, node.x, node.y)
      }

      // Draw status indicator
      const statusColors = {
        active: '#2ecc71',
        inactive: '#95a5a6',
        error: '#e74c3c'
      }
      if (node.status && statusColors[node.status]) {
        ctx.beginPath()
        ctx.arc(node.x + radius - 5, node.y - radius + 5, 5, 0, 2 * Math.PI)
        ctx.fillStyle = statusColors[node.status]
        ctx.fill()
      }
    },
    drawConnection(ctx, connection) {
      const fromNode = this.nodes.find(n => n.id === connection.from.id)
      const toNode = this.nodes.find(n => n.id === connection.to.id)
      if (!fromNode || !toNode) return

      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.strokeStyle = connection.color || '#95a5a6'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw arrow
      const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x)
      const radius = toNode.radius || 20
      const arrowLength = 15
      const arrowWidth = 8

      const endX = toNode.x - (radius * Math.cos(angle))
      const endY = toNode.y - (radius * Math.sin(angle))

      ctx.beginPath()
      ctx.moveTo(endX, endY)
      ctx.lineTo(
        endX - arrowLength * Math.cos(angle - Math.PI/6),
        endY - arrowLength * Math.sin(angle - Math.PI/6)
      )
      ctx.lineTo(
        endX - arrowLength * Math.cos(angle + Math.PI/6),
        endY - arrowLength * Math.sin(angle + Math.PI/6)
      )
      ctx.closePath()
      ctx.fillStyle = connection.color || '#95a5a6'
      ctx.fill()
    },
    onMouseWheel(event) {
      event.preventDefault()
      const delta = event.deltaY > 0 ? 0.9 : 1.1
      this.scale *= delta
    },
    onMouseDown(event) {
      const canvas = this.$refs.canvas.$refs.canvas
      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left - this.offset.x) / this.scale
      const y = (event.clientY - rect.top - this.offset.y) / this.scale

      // Check if clicked on a node
      const clickedNode = this.nodes.find(node => {
        const dx = node.x - x
        const dy = node.y - y
        return Math.sqrt(dx * dx + dy * dy) < (node.radius || 20)
      })

      if (clickedNode) {
        this.draggedNode = clickedNode
        this.selectNode(clickedNode)
      } else {
        // Start panning
        this.draggedNode = null
        this.selectNode(null)
        canvas.style.cursor = 'grabbing'
      }
    },
    onMouseUp(event) {
      this.draggedNode = null
      this.$refs.canvas.$refs.canvas.style.cursor = 'default'
    },
    onMouseMove(event) {
      if (!this.draggedNode) return

      const movementX = event.movementX / this.scale
      const movementY = event.movementY / this.scale

      this.updateNode({
        id: this.draggedNode.id,
        updates: {
          x: this.draggedNode.x + movementX,
          y: this.draggedNode.y + movementY
        }
      })
    },
    onMouseClick(event) {
      // Handled in onMouseDown for better UX
    },
    onDoubleClick(event) {
      if (this.selectedNode) {
        // Open configuration panel (handled by parent)
        this.$emit('configure-node', this.selectedNode)
      } else {
        // Create new node at click position
        const canvas = this.$refs.canvas.$refs.canvas
        const rect = canvas.getBoundingClientRect()
        const x = (event.clientX - rect.left - this.offset.x) / this.scale
        const y = (event.clientY - rect.top - this.offset.y) / this.scale

        this.addNode({
          id: Date.now(),
          label: 'New Node',
          type: 'chatbot',
          x,
          y,
          status: 'inactive'
        })
      }
    }
  }
}
</script>

<style scoped>
.animation-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

