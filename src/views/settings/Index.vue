<template>
    <div class="account-settings-info-main">  <div class="account-settings-info-left"><a-menu>
        <a-menu-item key="/account/settings/base">
            <router-link :to="{ path: '/user/settings/BaseSetting' }">
                基本设置
            </router-link>
        </a-menu-item>
        <a-menu-item key="/account/settings/security">
            <router-link :to="{ path: '/user/settings/Security' }">
                安全设置
            </router-link>
        </a-menu-item>
        <a-menu-item key="/account/settings/binding">
            <router-link :to="{ path: '/user/settings/Binding' }">
                账户绑定
            </router-link>
        </a-menu-item>
        <a-menu-item key="/account/settings/notification">
            <router-link :to="{ path: '/user/settings/Notification' }">
                新消息通知
            </router-link>
        </a-menu-item>
    </a-menu></div>    <div class="account-settings-info-right"><div class="account-settings-info-title">
        <span>{{ $route.name}}</span>
    </div>
        <router-view></router-view>
    </div>
    </div>


</template>

<script>



export default {


  data () {
    return {

    }
  },


}
</script>

<style lang="less" scoped>
    .account-settings-info-main {
        width: 100%;
        display: flex;
        height: 100%;
        overflow: auto;
    .account-settings-info-left {
        border-right: 1px solid #e8e8e8;
        width: 224px;
    }

    .account-settings-info-right {
        flex: 1 1;
        padding: 8px 40px;

        .account-settings-info-title {
            color: rgba(0,0,0,.85);
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            margin-bottom: 12px;
        }
        .account-settings-info-view {
            padding-top: 12px;
        }
    }
    }
</style>
