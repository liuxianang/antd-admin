<template>
  <div class="ant-pro-pages-account-projects-cardList">
    <a-list  :data-source="data" :grid="{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card class="ant-pro-pages-account-projects-card" hoverable>
          <img slot="cover" :src="item.cover" :alt="item.title" />
          <a-card-meta :title="item.title">
            <template slot="description">
              <ellipsis :length="50">{{ item.description }}</ellipsis>
            </template>
          </a-card-meta>
          <div class="cardItemContent">
            <span>{{ item.updatedAt | fromNow }}</span>
            <div class="avatarList">
              <avatar-list size="mini">
                <avatar-list-item
                  v-for="(member, i) in item.members"
                  :key="`${item.id}-avatar-${i}`"
                  :src="member.avatar"
                  :tips="member.name"
                />
              </avatar-list>
            </div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
    import moment from 'moment'
    import  AvatarList from '@/components/AvatarList'
    import Ellipsis from '@/components/Ellipsis'
    const AvatarListItem = AvatarList.AvatarItem
export default {
  name: 'Project',
    components: {
        AvatarList,
        Ellipsis,
        AvatarListItem

    },
  data () {
    return {
      data: [{id:1,avatar:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          star:777, percent:222 ,message: 222,like:111,
          description:"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
          title:'Alipay',owner:'付小小',href:'https://ant.design',updatedAt:'2015-12-14 08:08:31',
          members: [
          {
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
              name: '曲丽丽',
              id: 'member1'
          },
          {
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
              name: '王昭君',
              id: 'member2'
          },
          {
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
              name: '董娜娜',
              id: 'member3'
          }
      ], cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png'}
      ],
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
      fromNow (date) {
          return moment(date).fromNow()
      }
  },



}
</script>

<style lang="less" scoped>
  .ant-pro-pages-account-projects-cardList {
    margin-top: 24px;

    /deep/ .ant-card-meta-title {
      margin-bottom: 4px;
    }

    /deep/ .ant-card-meta-description {
      height: 44px;
      overflow: hidden;
      line-height: 22px;
    }

    .cardItemContent {
      display: flex;
      height: 20px;
      margin-top: 16px;
      margin-bottom: -4px;
      line-height: 20px;

      > span {
        flex: 1 1;
        color: rgba(0,0,0,.45);
        font-size: 12px;
      }

      /deep/ .ant-pro-avatar-list {
        flex: 0 1 auto;
      }
    }
  }
</style>
