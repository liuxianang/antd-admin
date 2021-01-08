<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider collapsible v-model="collapsed">
            <div class="logo" ><a><img src="../assets/logo.svg" style="padding-left:8px; height: 32px;"><span style="color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
    vertical-align: middle;" v-if="!collapsed">Ant Design</span></a></div>
            <a-menu
                    :defaultSelectedKeys="['1']"
                    :defaultOpenKeys="['2']"
                    mode="inline"
                    theme="dark"
                    @click="menclick">
                <template v-for="item in menus">
                        <a-menu-item v-if="!item.children" :path="item.path" :key="item.id"  >
                            <a-icon type="pie-chart" />
                            <span>{{item.name}}</span>
                        </a-menu-item>
                    <a-sub-menu  v-if="item.children"  :path="item.path" :key="item.id" >
                        <span slot="title"><a-icon :type="item.iconCls" /> <span>{{item.name}}</span></span>
                      <a-menu-item v-for="childrenitem in item.children" :path="childrenitem.path"  :key="childrenitem.id">
                        <a-icon :type="childrenitem.iconCls" />
                        <span>{{childrenitem.name}}</span>
                    </a-menu-item></a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" >
                <div class="user-wrapper">
                    <div class="content-box">
                        <a href="https://blog.csdn.net/u010740917" target="_blank">
                    <span class="action">
                         <a-icon type="question-circle-o"></a-icon>
                    </span>
                        </a>
                        <notice-icon class="action"/>
                        <JWChat  ref ="modal" ></JWChat>
                        <a-dropdown>
            <span class="action ant-dropdown-link user-dropdown-menu">
                <a-avatar class="avatar" size="small" src="https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png"/>
                <span>{{nickname}}</span>
                </span>
                            <a-menu slot="overlay" class="user-dropdown-menu-wrapper" >
                                <a-menu-item key="0">
                                    <a href="javascript:;" @click="jumpTo('个人中心','101','/user/center')">
                                        <a-icon type="user"/>
                                        <span>个人中心</span>
                                    </a>
                                </a-menu-item>
                                <a-menu-item key="1">
                                    <a href="javascript:;" @click="jumpTo('账户设置','102','/user/settings')">
                                        <a-icon type="setting"/>
                                        <span>账户设置</span>
                                    </a>
                                </a-menu-item>
                                <a-menu-divider/>
                                <a-menu-item key="3">
                                    <a href="javascript:;" @click="logout">
                                        <a-icon type="logout"/>
                                        <span>退出登录</span>
                                    </a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </div>
            </a-layout-header>
            <a-layout-content style="margin: 0 10px">
                    <div :style="{ padding: '14px', background: '#fff', minHeight: '660px' }">
                        <a-icon type="close" style="float:right" @click="closeAlltabs"/>
                        <template>
                            <a-tabs hideAdd v-model="activeKey" type="editable-card" @edit="onEdit" @tabClick="tabclick">
                                <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
                                </a-tab-pane>
                                </a-tabs>
                            <router-view ></router-view>
                        </template>
                    </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    import API from "../api/api_user";
    import NoticeIcon from '@/components/NoticeIcon'
    import JWChat from '@/components/NoticeIcon/JWChat'

    export default {
        components: {
            NoticeIcon,
            JWChat
        },
        data() {
            const panes = [
                { title: '主页', content: '/Home', key: 'Home' ,closable: false},
            ];
            return {
                activeKey: panes[0].key,
                panes,
                routerkey:'',
                nickname:'',
                menus: [],
                newTabIndex: 0,
                collapsed: false,
            };
        },
        methods: {
            menclick({item,key}) {
                //alert(item.$vnode.data.props.children[0].text)获取菜单名字
                console.log(">>>>>>>>>>>>aaaa");
                let istabexist=false;
                this.panes.forEach((pane) => {
                    if (pane.key ==key+"") {
                        istabexist = true;
                    }
                });
                if(istabexist){
                    this.activeKey=key+"";
                    this.$router.push({ path: item.$vnode.data.attrs.path+""});

                }else
                    {
                        this.addtab(item.$vnode.data.props.children[1].children[0].text+"",item.$vnode.data.attrs.path,key+"")

                    }
            },
            jumpTo(name,key,path) {
                //alert(item.$vnode.data.props.children[0].text)获取菜单名字
                let istabexist=false;
                this.panes.forEach((pane) => {
                    if (pane.key ==key+"") {
                        istabexist = true;
                    }
                });
                if(istabexist){
                    this.activeKey=key+"";
                    this.$router.push({ path: path+""});
                }else
                {
                    this.addtab(name+"",path,key+"")
                }
            },
            tabclick(key) {
                let path;
                this.panes.forEach((pane) => {
                    if (pane.key === key) {
                        path=pane.content
                    }
                });
                this.$router.push({ path: path});
            },

            onEdit(targetKey, action) {
                this[action](targetKey);
            },
            addtab(name,path,key) {
                const panes = this.panes;
                const activeKey = key;
                panes.push({ title: name, content: path, key: key });
                this.$router.push({ path: path});
                this.panes = panes;
                this.activeKey = activeKey;
            },
            remove(targetKey) {
                let activeKey = this.activeKey;
                let lastIndex;
                this.panes.forEach((pane, i) => {
                    if (pane.key === targetKey) {
                        lastIndex = i - 1;
                    }
                });
                const panes = this.panes.filter(pane => pane.key !== targetKey);
                if (panes.length && activeKey === targetKey) {
                    if (lastIndex >= 0) {
                        activeKey = panes[lastIndex].key;
                    } else {
                        activeKey = panes[0].key;
                    }
                }
                this.panes = panes;
                this.activeKey = activeKey;
            },
            closeAlltabs() {
                this.panes=[
                    { title: '主页', content: '/Home', key: 'Home' ,closable: false},
                ];
                this.activeKey = "Home";
                this.$router.push({ path:"/Home"});
            },
            logout() {
                let that = this;
                this.$confirm({
                    title: '提示',
                    content: '真的要注销登录吗',
                    onOk() {
                        that.loading = true;
                        //
                        localStorage.removeItem("access-token");
                        localStorage.removeItem("menus")
                        API.logout('').then(function () {
                            that.$notification.open({ message: '已注销登录',});
                        })
                        that.$router.push({name:"login"}); //用go刷新
                    },
                    onCancel() {},
                });

            },/*加载聊天*/
            webSocket(name) {
                const that = this;
                if (typeof (WebSocket) == 'undefined') {
                    that.$message.info('当前浏览器无法接收实时报警信息，请使用谷歌浏览器！');
                } else {
                    // 获取token保存到vuex中的用户信息，此处仅适用于本项目，注意删除或修改
                    // 实例化socket，这里我把用户名传给了后台，使后台能判断要把消息发给哪个用户，其实也可以后台直接获取用户IP来判断并推送
                    const socketUrl = 'ws://127.0.0.1:8005/imserver/'+name;
                    this.socket = new WebSocket(socketUrl);
                    // 监听socket打开
                    this.socket.onopen = function () {
                        console.log('浏览器WebSocket已打开');
                    };
                    // 监听socket消息接收
                    this.socket.onmessage = function (msg) {
                        console.log(msg);
                        let msgs = JSON.parse(msg.data);//将json字符串转换成json对象
                        if(msgs.isfalg){
                            that.$refs.modal.bindEnteroutitem(msg.data)
                            that.$message.info('你有一条新消息');
                        }else {
                            that.$refs.modal.bindEnterout(msg.data)
                        }
                        if(msgs.online){
                            that.$refs.modal.online()
                            that.$message.info('新用户上线');
                        }

                    };
                    // 监听socket错误
                    this.socket.onerror = function () {
                        that.$notify({
                            title: '错误',
                            message: '服务器错误，无法接收实时报警信息',
                            type: 'error',
                            duration: 0
                        });
                    };
                // 监听socket关闭
                    this.socket.onclose = function () {
                        console.log('WebSocket已关闭');
                    }

                }
            }
        },
        mounted() {

            this.menus = JSON.parse(window.localStorage.getItem('menus'));
            // if (user) {
            //   user = JSON.parse(user);
            //   this.nickname = user.nickname || '';
            // }
            let that = this;
            API.tokenUser().then(function (result) {
                that.nickname = result.username
                /*加载聊天*/
                that.webSocket(result.userId);
            }).catch(
                () => {
                    localStorage.removeItem("access-token");
                    that.$router.go("/login"); //用go刷新
                }
            );

        }
    };
</script>

<style lang="less" >
    #components-layout-demo-side .logo {
        height: 32px;
        background: #002140;
        margin: 16px;
    }
 .user-wrapper {
        float: right;
        height: 100%;

        .action {
            cursor: pointer;
            padding: 0 12px;
            display: inline-block;
            transition: all 0.3s;
            height: 100%;
            color: rgba(0, 0, 0, 0.65);

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }

            .avatar {
                margin: 20px 8px 20px 0;
                color: #1890ff;
                background: hsla(0, 0%, 100%, 0.85);
                vertical-align: middle;
            }

            .icon {
                font-size: 16px;
                padding: 4px;
            }
        }
    }
</style>

