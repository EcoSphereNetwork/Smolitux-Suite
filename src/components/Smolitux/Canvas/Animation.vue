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
      nodes: [],
      connections: []
    }
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    this.stop()
  },
  methods: {
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

      // Draw connections
      this.connections.forEach(connection => {
        this.drawConnection(ctx, connection)
      })

      // Draw nodes
      this.nodes.forEach(node => {
        this.drawNode(ctx, node)
      })
    },
    drawNode(ctx, node) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius || 20, 0, 2 * Math.PI)
      ctx.fillStyle = node.color || '#42b983'
      ctx.fill()
      ctx.stroke()

      if (node.label) {
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.label, node.x, node.y)
      }
    },
    drawConnection(ctx, connection) {
      ctx.beginPath()
      ctx.moveTo(connection.from.x, connection.from.y)
      ctx.lineTo(connection.to.x, connection.to.y)
      ctx.strokeStyle = connection.color || '#666'
      ctx.stroke()
    },
    addNode(node) {
      this.nodes.push(node)
    },
    addConnection(connection) {
      this.connections.push(connection)
    },
    onMouseWheel(event) {
      // Handle zoom
    },
    onMouseDown(event) {
      // Handle drag start
    },
    onMouseUp(event) {
      // Handle drag end
    },
    onMouseMove(event) {
      // Handle node/connection hover
    },
    onMouseClick(event) {
      // Handle node/connection selection
    },
    onDoubleClick(event) {
      // Handle node/connection configuration
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
