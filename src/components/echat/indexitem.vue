<template>
  <div>
  <div class="chatPage" style="height: 550px; width: 550px;">
    <div class="main">
      <div class="header">
        <JwChatitem :config="config" @click="bindClick" />
        <slot name="header"></slot>
      </div>
    <div class="taleBox" ref="scrollNode">
      <chatList :list="taleList" @click="bindEvent" :config="{width,height:talkHeight}" />
    </div>


    <div class="toolBox">
      <tools :tools="toolConfig" class="tools" @emoji="bindEmoji" />
      <EnterBox @submit="enter" v-model="msg" />
    </div>
    </div>

  </div>
  </div>
</template>

<script>
    import EnterBox from './enterBox.vue'
    import chatList from './chatList.vue'
    import tools from './tools.vue'
    import JwChatitem from '@/components/UserItem/index';
    export default {
        name: "JwChat",
        components: { EnterBox, chatList, tools ,JwChatitem},
        props: {
            config: {
                type: Object,
                default: () => ({
                    img: 'image/cover.png',
                    name: 'JwChat',
                    dept: '最简单、最便捷',
                    callback: () => { }
                })
            },
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
            bindClick (type) {
                const { callback } = this.config || {}
                if (callback) {
                    callback(type)
                }
            },
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
.header {
    background-color: #409eff;
    display: flex;
    margin: 0 auto;
    padding-left: 12px;
    align-items: center;
    height: 60px;
    position: relative;
    color: #fff;
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