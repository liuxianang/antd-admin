<template>
  <a-list
    size="large"
    rowKey="id"

    itemLayout="vertical"
    :dataSource="data"
  >
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
   <template slot="actions" >
       <span > <a-icon type="star-o" style="margin-right: 8px"  /> {{item.star}}</span>
       <span > <a-icon type="like-o" style="margin-right: 8px"  />{{item.like}}</span>
       <span ><a-icon type="message" style="margin-right: 8px"  />{{item.message}}</span>
      </template>
        <template slot="actions" >
        <span :key="type">
          <a-icon :type="type" style="margin-right: 8px" />
          {{text}}
        </span>
        </template>
      <a-list-item-meta>
        <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        <template slot="description">
          <span>
            <a-tag>Ant Design</a-tag>
            <a-tag>设计语言</a-tag>
            <a-tag>蚂蚁金服</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content :description="item.description" :owner="item.owner" :avatar="item.avatar" :href="item.href" :updateAt="item.updatedAt" />
    </a-list-item>
    <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
  </a-list>
</template>

<script>

    import ArticleListContent  from '@/components/ArticleListContent'
export default {
  name: 'Article',
    components: {
        ArticleListContent

    },
  data () {
    return {
        actions: [
            { type: 'star-o', text: '156' },
            { type: 'like-o', text: '156' },
            { type: 'message', text: '2' },
        ],
      loading: true,
      loadingMore: false,
      data: [{id:1,avatar:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          star:777, percent:222 ,message: 222,like:111,
          description:"在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
          title:'Alipay',owner:'付小小',href:'https://ant.design',updatedAt:'2015-12-14 08:08:31'
      }],
    }
  },


}
</script>

<style scoped>

</style>
