<template>
  <canvas
    ref="canvas"
    @mousewheel="onMouseWheel"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @click="onMouseClick"
    @dblclick="onDoubleClick"
    @mouseout="onMouseOut"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDragDrop"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
  />
</template>

<script>
export default {
  name: 'SmolituxCanvas',
  data() {
    return {
      browserCanvasContext: null,
      containerDragStarted: false,
      floatingObjectDragStarted: false,
      containerBeingDragged: null,
      viewPortBeingDragged: false,
      ignoreNextClick: false,
      mouseDownContainer: null,
      lastContainerMouseOver: null,
      dragVector: {
        downX: 0,
        downY: 0,
        upX: 0,
        upY: 0
      },
      mouse: {
        position: {
          x: 0,
          y: 0
        },
        action: ''
      },
      shortcutNumbers: new Map()
    }
  },
  mounted() {
    this.initialize()
  },
  beforeDestroy() {
    this.finalize()
  },
  methods: {
    initialize() {
      this.browserResized()
      this.initializeBrowserCanvas()
    },
    finalize() {
      this.shortcutNumbers = undefined
      this.mouse = undefined
    },
    browserResized() {
      const canvas = this.$refs.canvas
      if (!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.position = 'absolute'
      canvas.style.left = '0px'
      canvas.style.top = '0px'
    },
    initializeBrowserCanvas() {
      const canvas = this.$refs.canvas
      if (!canvas) return

      this.browserCanvasContext = canvas.getContext('2d')
    },
    onMouseWheel(event) {
      this.$emit('mouse-wheel', event)
    },
    onMouseDown(event) {
      this.dragVector.downX = event.pageX
      this.dragVector.downY = event.pageY
      this.$emit('mouse-down', event)
    },
    onMouseUp(event) {
      this.dragVector.upX = event.pageX
      this.dragVector.upY = event.pageY
      this.$emit('mouse-up', event)
    },
    onMouseMove(event) {
      this.mouse.position.x = event.pageX
      this.mouse.position.y = event.pageY
      this.$emit('mouse-move', event)
    },
    onMouseClick(event) {
      if (this.ignoreNextClick) {
        this.ignoreNextClick = false
        return
      }
      this.$emit('mouse-click', event)
    },
    onDoubleClick(event) {
      this.$emit('double-click', event)
    },
    onMouseOut(event) {
      this.$emit('mouse-out', event)
    },
    onDragEnter(event) {
      this.$emit('drag-enter', event)
    },
    onDragLeave(event) {
      this.$emit('drag-leave', event)
    },
    onDragOver(event) {
      event.preventDefault()
      this.$emit('drag-over', event)
    },
    onDragDrop(event) {
      event.preventDefault()
      this.$emit('drag-drop', event)
    },
    onKeyDown(event) {
      this.$emit('key-down', event)
    },
    onKeyUp(event) {
      this.$emit('key-up', event)
    }
  }
}
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
