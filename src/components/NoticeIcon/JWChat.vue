<template>
    <a-popover
            v-model="visible"
            trigger="click"
            placement="bottomRight"
            overlayClassName="header-notice-wrapper"
            :getPopupContainer="() => $refs.noticeRef.parentElement"
            :autoAdjustOverflow="true"
            :arrowPointAtCenter="true"
            :overlayStyle="{ width: '800px', top: '50px' }"
    >
        <template slot="content">
            <a-spin :spinning="loading">
                <div v-if="JwChatindex">
                    <JwChatindex
                            :config="config"
                            :taleList="list"
                            @enter="bindEnter"
                            v-model="inputMsg"
                            :toolConfig="tool"
                            @clickTalk="talkEvent">
                        <!-- <JwChat-rightbox class="rightSlot" :config="rightConfig" @click="rightClick" /> -->
                        <rightList class="rightSlot" :config="info" @click="bindClick"/>
                    </JwChatindex>
                </div>
                <div v-if="JwChatitem">
                    <JwChatitem
                            :config="configitem"
                            :taleList="listitem"
                            @enter="bindEnteritem"
                            v-model="inputMsg"
                            :toolConfig="tool"
                            @clickTalk="talkEventitem">
                        <!-- <JwChat-rightbox class="rightSlot" :config="rightConfig" @click="rightClick" /> -->
                    </JwChatitem>
                </div>
            </a-spin>
        </template>
        <span @click="fetchNotice" class="header-notice" ref="noticeRef">
      <a-badge count="0">
        <a-icon style="font-size: 16px; padding: 4px" type="qq"/>
      </a-badge>
    </span>
    </a-popover>
</template>

<script>
    import JwChatindex from '@/components/ChatInterface/index';
    import JwChatitem from '@/components/echat/indexitem';
    import rightList from '@/components/RightList/index';
    import API from "../../api/api_userChatmsg";

    export default {
        name: 'HeaderNotice',
        components: {
            JwChatindex,
            rightList,
            JwChatitem,
        },
        data() {
            return {
                JwChatindex: true,
                JwChatitem: false,
                num: 5000,
                inputMsg: '',
                listitem: [
                    {
                        "date": "2020/04/25 21:19:07",
                        "text": {"text": "你好"},
                        "mine": false,
                        "name": "留恋人间不羡仙",
                        "img": require('../../assets/avatar2.jpg')
                    },],
                list: [
                    {
                        "date": "2020/04/25 21:19:07",
                        "text": {"text": "起床不"},
                        "mine": false,
                        "name": "留恋人间不羡仙",
                        "img": require('../../assets/avatar2.jpg')
                    },
                    {
                        "date": "2020/04/25 21:19:07",
                        "text": {"text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>"},
                        "mine": false,
                        "name": "只盼流星不盼雨",
                        "img": require('../../assets/avatar2.jpg')
                    },
                    {
                        "date": "2020/04/25 21:19:07",
                        "text": {"text": "<img data-src='/image/three.jpeg'/>"},
                        "mine": false,
                        "name": "只盼流星不盼雨",
                        "img": require('../../assets/avatar2.jpg')
                    },
                    {
                        "date": "2020/04/16 21:19:07",
                        "text": {"text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />"},
                        "mine": true,
                        "name": "JwChat",
                        "img": require('../../assets/avatar2.jpg')
                    },
                ],
                tool: {
                    show: ['file', 'history', 'img', ['文件1', '', '美图']],
                    callback: this.toolEvent
                },

                quickConfig: {
                    nav: ['快捷回复', '超级回复'],
                    showAdd: true,
                    maxlength: 200,
                    showHeader: true,
                    showDeleteBtn: true,
                },
                info: {
                    img: '/image/cover.png',
                    listTip: '当前在线',
                    notice: '最简单、最便捷',
                    list: []
                },
                configitem: {
                    img: require('../../assets/avatar2.jpg'),
                    name: 'test1',
                    userid:'',
                    dept: '小白部',
                    callback: this.bindCover
                },
                config: {
                    img: require('../../assets/avatar2.jpg'),
                    name: 'JwChat',
                    dept: '最简单、最便捷',
                    callback: this.bindCover
                },
                loading: false,
                visible: false
            }
        },
        methods: {
            change() {
                this.num++
            },
            talkEvent(play) {
                console.log(play)
            },
            talkEventitem(play) {
                console.log(">>>>>>>>>" + play)
            },
            bindClick(play) {

              /*  console.log(play)*/

               this.configitem.userid= play.userId
                this.configitem.name=play.value
                this.user = JSON.parse(window.localStorage.getItem('user'));
               if(play.userId==this.user.userId){
                   this.$message.info('请选择其他人私聊，本人不能私聊');
               }else{
                   this.JwChatindex = false,
                       this.JwChatitem = true;
                API.getchatmylist({chatstate: 1, chatid: play.userId,userid:this.user.userId}).then(res => {
                    if (res.code == 0) {
                        this.listitem = res.data
                    }
                });
                //加载我的私聊

               }
            },
            online(){
                let that = this
                API.getuseronline({chatstate: 0, chatid: that.user.userId}).then(res => {
                    if (res.code == 0) {
                        that.info.list = res.data
                    }
                });
                //加载在线用户
            },

            bindEnter() {

                const msg = this.inputMsg
                if (!msg) return;
                let that = this
                that.user = JSON.parse(window.localStorage.getItem('user'));
                API.pushmsgall({chatstate: 0, chatid:  that.user.userId, msg: msg,chatname:that.user.name}).then(res => {
                    if (res.code == 0) {
                        that.list = res.data
                    }
                })
            },
            bindEnterout(mymsg) {
                const msg = mymsg
                if (!msg) return;
                let msgO = JSON.parse(msg);//将json字符串转换成json对象
                this.user = JSON.parse(window.localStorage.getItem('user'));
                let mymine
                console.log(">>>>>>>>>" + this.user.userId)
                console.log(">>>>>>>>>" + msgO.userid)
                if(this.user.userId==msgO.userid){
                    mymine=true
                }else{
                    mymine=false
                }

                const msgObj = {
                    "date": "2020/05/20 23:19:07",
                    "text": {"text": msgO.msg},
                    "mine": mymine,
                    "name": msgO.username,
                    "img": require('../../assets/avatar2.jpg')
                }
                this.list.push(msgObj)
            },
            bindEnteroutitem(mymsg) {
                const msg = mymsg
                if (!msg) return;
                let msgO = JSON.parse(msg);//将json字符串转换成json对象
                this.user = JSON.parse(window.localStorage.getItem('user'));


                const msgObj = {
                    "date": "2020/05/20 23:19:07",
                    "text": {"text": msgO.msg},
                    "mine": msgO.mymine,
                    "name": msgO.username,
                    "img": require('../../assets/avatar2.jpg')
                }
                this.listitem.push(msgObj)
            },
            bindEnteritem() {
                const msg = this.inputMsg
                if (!msg) return;
                let that = this
                that.user = JSON.parse(window.localStorage.getItem('user'));
                API.pushmsg({chatstate: 0, chatid:  that.user.userId+","+that.configitem.userid, msg: msg,chatname:that.user.name}).then(res => {
                    if (res.code == 0) {
                        that.list = res.data
                    }
                })
            },
            toolEvent(type) {
                console.log('tools', type)
            },
            bindCover(type) {
                console.log('header', type)
                this.JwChatindex = true,
                    this.JwChatitem = false;
            },
            rightClick(type) {
                console.log('rigth', type)
            },
            bindTalk(play) {
                console.log('talk', play)
            },
            changeNum() {
                this.num += 1
            },
            fetchNotice() {
                if (!this.visible) {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                    }, 2000)
                } else {
                    this.loading = false
                }
                this.visible = !this.visible
            },
            getchatinfo() {
                let that = this
                that.user = JSON.parse(window.localStorage.getItem('user'));

                    API.getchatlist({chatstate: 0, chatid: that.user.userId}).then(res => {
                        if (res.code == 0) {
                            that.list = res.data
                        }
                    });
                //加载群聊信息

                    API.getuseronline({chatstate: 0, chatid: that.user.userId}).then(res => {
                        if (res.code == 0) {
                            that.info.list = res.data
                        }
                    });
                //加载在线用户

                API.getnotice({chatstate: 0, chatid: that.user.userId}).then(res => {
                    if (res.code == 0) {
                        that.info.notice = res.page.rows[0].notice
                    }
                });
                //加载用户公告
                },
        },
        mounted() {
            this.getchatinfo();
        }
    }

</script>

<style lang="css">
    .header-notice-wrapper {
        top: 50px !important;
    }
</style>
<style lang="less" scoped>
    .header-notice {
        display: inline-block;
        transition: all 0.3s;

        span {
            vertical-align: initial;
        }
    }

    .rightSlot {
        width: 100%;
        height: 100%;
        overflow: hidden;
        flex-direction: column;
    }

    .active {
        color: red;
    }

    * {
        padding: 0;
        margin: 0;
    }

    body {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-image: linear-gradient(to bottom right, #7a88ff, #7affaf);
    }

    #app {
        height: 100vh;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
