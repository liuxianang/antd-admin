<template>
  <div class="toolsBox">
    <div class="web__tools">
        <a-popover v-model="visible" trigger="click">
          <a slot="content">
            <div class="emjioBox">
            <ul class="emjio">
              <li v-for="item in Object.keys(emoji)" :key="item" @click="selectEmit(item)">
                <a v-if="emoji[item]&&emoji[item].position" :style="emojiStyle(item)"></a>
                <a v-else-if="emoji[item].length<5">{{emoji[item]}}</a>
                <img v-else :src="emoji[item]" />
              </li>
            </ul>
          </div></a>
          <a-button icon="meh" >
          </a-button>

        </a-popover>

      <template v-for="(item,k) in showkeys()">
        <span
          v-if="toolConfig[item]"
          :key="item"
          :style="item=='history'&&'flex-grow: 100;text-align: right;'"
        >
          <span @click="bindButton(item)">
            <JwChaticon :type="toolConfig[item].icon" :title="setTitle(item,k)" />
          </span>
        </span>
        <i :key="item" v-else :class="item" @click="bindButton(item)"></i>
      </template>
    </div>
  </div>
</template>

<script>
    import JwChaticon from '@/components/Icon/index';
export default {
  name: "JwChat-tools",
    components: {
        JwChaticon,
    },
  props: {
    tools: {
      type: Object,
      default: () => {
        return {

          show: [],
          showEmoji: false,
          callback: () => { }
        }
      }
    }
  },
  data () {
    return {
        visible:false,
        emoji: {
          "/::)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif",
          "/::~": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/1.gif",
          "/::B": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/2.gif",
          "/::|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/3.gif",
          "/:8-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/4.gif",
          "/::<": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/5.gif",
          "/::$": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/6.gif",
          "/::X": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/7.gif",
          "/::Z": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/8.gif",
          "/::'(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/9.gif",
          "/::-|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/10.gif",
          "/::@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/11.gif",
          "/::P": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/12.gif",
          "/::D": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/13.gif",
          "/::O": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/14.gif",
          "/::(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/15.gif",
          "/::+": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/16.gif",
          "/:--b": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/17.gif",
          "/::Q": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/18.gif",
          "/::T": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/19.gif",
          "/:,@P": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/20.gif",
          "/:,@-D": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/21.gif",
          "/::d": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/22.gif",
          "/:,@o": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/23.gif",
          "/::g": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/24.gif",
          "/:|-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/25.gif",
          "/::!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/26.gif",
          "/::L": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/27.gif",
          "/::>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/28.gif",
          "/::,@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/29.gif",
          "/:,@f": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/30.gif",
          "/::-S": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/31.gif",
          "/:?": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/32.gif",
          "/:,@x": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/33.gif",
          "/:,@@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/34.gif",
          "/::8": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/35.gif",
          "/:,@!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/36.gif",
          "/:!!!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/37.gif",
          "/:xx": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/38.gif",
          "/:bye": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/39.gif",
          "/:wipe": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/40.gif",
          "/:dig": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/41.gif",
          "/:handclap": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/42.gif",
          "/:&-(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/43.gif",
          "/:B-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/44.gif",
          "/:<@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/45.gif",
          "/:@>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/46.gif",
          "/::-O": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/47.gif",
          "/:>-|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/48.gif",
          "/:P-(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/49.gif",
          "/::'|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/50.gif",
          "/:X-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/51.gif",
          "/::*": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/52.gif",
          "/:@x": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/53.gif",
          "/:8*": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/54.gif",
          "/:pd": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/55.gif",
          "/:<W>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/56.gif",
          "/:beer": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/57.gif",
          "/:basketb": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/58.gif",
          "/:oo": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/59.gif",
          "/:coffee": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/60.gif",
          "/:eat": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/61.gif",
          "/:pig": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/62.gif",
          "/:rose": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif",
          "/:fade": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/64.gif",
          "/:showlove": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/65.gif",
          "/:heart": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/66.gif",
          "/:break": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/67.gif",
          "/:cake": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/68.gif",
          "/:li": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/69.gif",
          "/:bome": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/70.gif",
          "/:kn": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/71.gif",
          "/:footb": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/72.gif",
          "/:ladybug": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/73.gif",
          "/:shit": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/74.gif",
          "/:moon": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/75.gif",
          "/:sun": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/76.gif",
          "/:gift": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/77.gif",
          "/:hug": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/78.gif",
          "/:strong": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif",
          "/:weak": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/80.gif",
          "/:share": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/81.gif",
          "/:v": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/82.gif",
          "/:@)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif",
          "/:jj": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/84.gif",
          "/:@@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/85.gif",
          "/:bad": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/86.gif",
          "/:lvu": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/87.gif",
          "/:no": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/88.gif",
          "/:ok": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/89.gif",
          "/:love": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/90.gif",
          "/:<L>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/91.gif",
          "/:jump": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/92.gif",
          "/:shake": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/93.gif",
          "/:<O>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/94.gif",
          "/:circle": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/95.gif",
          "/:kotow": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/96.gif",
          "/:turn": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/97.gif",
          "/:skip": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/98.gif",
          "/:oY": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/99.gif",
          ":smile:": {
          "panel": "6AfH8",
              "position": "2px 2px"
      },
          ":mask:": {
          "panel": "6AfH8",
              "position": "-30px 2px"
      },
          ":joy:": {
          "panel": "6AfH8",
              "position": "-62px 2px"
      },
          ":stuck_out_tongue_closed_eyes:": {
          "panel": "6AfH8",
              "position": "-94px 2px"
      },
          ":flushed:": {
          "panel": "6AfH8",
              "position": "-126px 2px"
      },
          ":scream:": {
          "panel": "6AfH8",
              "position": "-158px 2px"
      },
          ":pensive:": {
          "panel": "6AfH8",
              "position": "-190px 2px"
      },
          ":unamused:": {
          "panel": "6AfH8",
              "position": "-222px 2px"
      },
          "[Hey]": {
          "panel": "6AfH8",
              "position": "-254px 2px"
      },
          "[Facepalm]": {
          "panel": "6AfH8",
              "position": "-286px 2px"
      },
          "[Smirk]": {
          "panel": "6AfH8",
              "position": "-318px 2px"
      },
          "[Smart]": {
          "panel": "6AfH8",
              "position": "-350px 2px"
      },
          "[Concerned]": {
          "panel": "6AfH8",
              "position": "-382px 2px"
      },
          "[Yeah!]": {
          "panel": "6AfH8",
              "position": "-414px 2px"
      },
          ":ghost:": {
          "panel": "6AfH8",
              "position": "-446px 2px"
      },
          ":pray:": {
          "panel": "6AfH8",
              "position": "2px -30px"
      },
          ":muscle:": {
          "panel": "6AfH8",
              "position": "-30px -30px"
      },
          ":tada:": {
          "panel": "6AfH8",
              "position": "-62px -30px"
      },
          ":gift:": {
          "panel": "6AfH8",
              "position": "-94px -30px"
      },
          "[Packet]": {
          "panel": "6AfH8",
              "position": "-126px -30px"
      },
          "[好的]": "👌",
          "[加油]": "💪️"
      },

      toolConfig: {
        'file': { icon: 'icon-wenjian', title: '文件' },
        'video': { icon: 'icon-shipin', title: '视频' },
        'img': { icon: 'icon-xiangce', title: '图片' },
        'hongbao': { icon: 'icon-hongbao', title: '红包' },
        'more': { icon: 'icon-gengduo', title: '更多' },
        'history': { icon: 'icon-lishi', title: '历史' },
      },
      newTitle: null
    }
  },
  methods: {
      hide() {
          console.log(111);
          this.visible = false;
      },
    showEmoji () {
      const { showEmoji = false } = this.tools || {}
      return showEmoji
    },
    showkeys () {
      let keys = Object.keys(this.toolConfig)
      const { show = [] } = this.tools || {}
      if (show.length > 0) {
        let _key = []
        let h = false
        show.forEach(i => {
          if (this.isArray(i)) {
            this.newTitle = i
            return
          }
          if (i === 'history') {
            h = true
          } else {
            _key.push(i)
          }
        })
        if (h) _key.push('history')
        keys = _key
      }
      return keys
    },
    setTitle (key, index) {
      let title = ''
      if (this.newTitle) {
        title = this.newTitle[index] || ''
      }
      if (!title) {
        title = this.toolConfig[key].title
      }
      return title
    },
    isArray (target) {
      return Object.prototype.toString.call(target) === '[object Array]';
    },
    selectEmit (type) {
      this.$emit('emoji', type)
      this.visible=false
    },
    bindButton (type) {
        this.tools.callback && this.tools.callback(type)
        const { showEmoji = true } = this.tools || {}
        return showEmoji

    },
    emojiStyle (item) {
      const emojiitem = this.emoji[item]
      if (!emojiitem) return {}
      return {
        display: 'inline-block',
        background: `url('https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/6AfH8-r.png')  no-repeat`,
        width: `28px`,
        height: `28px`,
        'background-position': emojiitem.position,
      }
    },
  },
}
</script>

<style  scoped>
.toolsBox {
  position: relative;
}
.web__tools {
  text-align: left;
  padding-left: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 30px;
}
i {
  margin-right: 12px;
  font-size: 20px;
  color: #888a91;
}
i:hover {
  color: #76b1f9;
}
.emjioBox {
  background: #fff;
  height: 150px;
  width: 300px;
  overflow: auto;
  text-align: left;
}
.emjioBox .emjio {
  padding: 0;
}
.emjioBox li {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
}
</style>