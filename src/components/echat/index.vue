<template>
  <div class="chatPage" :style="setStyle">
        <div class="taleBox" ref="scrollNode">
     <chatList :list="taleList" @click="bindEvent" :config="{width,height:talkHeight}" />
    </div>


    <div class="toolBox">
      <tools :tools="toolConfig" class="tools" @emoji="bindEmoji" />
      <EnterBox @submit="enter" v-model="msg" />
    </div>


  </div>
</template>

<script>
import EnterBox from './enterBox.vue'
import chatList from './chatList.vue'
import tools from './tools.vue'
export default {
  name: "JwChat",
  components: { EnterBox, chatList, tools },
  props: {
    taleList: {
      type: Array,
      default: () => ([])
    },
    scroll: {
      type: Number,
      default: -1
    },
    height: {
      default: '500px'
    },
    width: {
      default: '550px'
    },
    value: {
      default: ''
    },
    toolConfig: {
      type: Object,
      default: () => ({
        show: ['file', 'video', 'img'],
        callback: Function
      })
    }
  },
  data () {
    return {
      msg: '',
    }
  },
  watch: {
    scroll (newVal) {
      if (typeof (newVal) === 'number') {
        this.setScroll(newVal)
      }
    },
    value: {
      handler () {
        this.msg = this.value;
      },
      immediate: true
    },
    msg: {
      handler () {
        this.$emit('input', this.msg);
      },
      immediate: true
    }
  },
  computed: {
    setStyle () {
      let height = this.height
      let width = this.width
      if (`${height}`.match(/\d$/)) {
        height += 'px'
      }
      if (`${width}`.match(/\d$/)) {
        width += 'px'
      }
      const style = { height, width }
      return style
    },
    talkHeight () {
      let height = this.height
      if (`${height}`.match(/\d$/)) {
        height -= 140
      } else
        height = `calc(${height} - 140px)`
      return height
    },
  },
  methods: {
    bindEvent (play) {
      this.$emit('clickTalk', play)
    },
    bindEmoji (emoji) {
      this.msg = emoji
    },
    enter (msg) {
      this.$emit('enter', msg)
    }
  },
}
</script>
<style lang="scss" scoped>
.chatPage {
  margin: 0 auto;
  position: relative;
  background: #fff;
  overflow: hidden;
}
.taleBox {
  height: calc(100% - 140px);
  min-height: 100px;
  overflow: hidden;
}
.toolBox {
  height: 140px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>