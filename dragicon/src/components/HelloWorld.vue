<template>
  <div>
    <div
      ref="customerService"
      class="customer-service"
      @touchstart="touchstartHandle('customerService', $event)"
      @touchmove="touchmoveHandle('customerService', $event)"
      @touchend="end('customerService')"
      style="position: fixed; right: 0"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      touch: {
        initialPosition: {},
        movePostion: {}
      },
      element: {
        initialPosition: {},
        movePostion: {}
      },
      nowLeft: ''
    }
  },
  mounted () {

  },
  methods: {
    touchstartHandle (refName, e) {
      console.log(e)
      // 触摸开始
      const touchTarget = e.targetTouches[0]
      // 记录触摸点的坐标（初始位置）
      this.touch.initialPosition = {
        x: touchTarget.clientX,
        y: touchTarget.clientY
      }
      // 记录需要移动的元素坐标（初始位置）
      this.element.initialPosition = {
        x: this.$refs[refName].offsetLeft,
        y: this.$refs[refName].offsetTop
      }
    },
    touchmoveHandle (refName, e) {
      e.preventDefault()
      const touchTarget = e.targetTouches[0]
      // 根据初始touch位置计算移动距离:元素移动位置=元素初始位置+(光标移动后的位置-光标点击时的初始位置)
      let X = this.element.initialPosition.x + (touchTarget.clientX - this.touch.initialPosition.x)
      let Y = this.element.initialPosition.y + (touchTarget.clientY - this.touch.initialPosition.y)
      // 限制可移动距离，不超出可视区域
      const maxWidth = innerWidth - this.$refs[refName].offsetWidth
      const maxHeight = innerHeight - this.$refs[refName].offsetHeight

      X = X <= 0 ? 0 : X >= maxWidth ? maxWidth : X
      Y = Y <= 0 ? 0 : Y >= maxHeight ? maxHeight : Y
      console.log(X, Y)
      this.nowLeft = X
      // 移动元素
      this.$refs[refName].style.left = X + 'px'
      this.$refs[refName].style.top = Y + 'px'
    },
    end (refName) {
      // 吸边处理
      const halfMaxWidth = (innerWidth - this.$refs[refName].offsetWidth) / 2
      const dragDiv = this.$refs[refName]
      if (this.nowLeft > halfMaxWidth) {
        //   右吸边
        dragDiv.style.left =
          document.documentElement.clientWidth -
          parseInt(dragDiv.clientWidth) +
          'px'
      } else {
        // 左吸边
        // dragDiv.style.left = '0px'
        //   右吸边
        dragDiv.style.left =
          document.documentElement.clientWidth -
          parseInt(dragDiv.clientWidth) +
          'px'
      }
      dragDiv.style.top = dragDiv.offsetTop + 'px'
    }
  }
}
</script>
<style scoped lang="scss">
.customer-service {
  background-size: contain;
  border: 2px dotted #f5a7a7;
  height: 100px;
  width: 100px;
  background-repeat: no-repeat;
}
</style>
