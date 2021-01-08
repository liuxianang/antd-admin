<template>
  <div>
    <div  class="ant-advanced-search-form">
      <!--工具条-->

      <a-form  layout="inline" :model="filters">
        <a-row :gutter="24">
          <a-col  :span="20">
            <a-form-item label="名字">
              <a-input v-model="filters.name" placeholder="用户名/姓名/昵称" style="min-width: 240px;"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col  :span="4">
            <a-form-item>
              <a-button type="primary" @click="handleSearch(1)">查询</a-button>
              <a-button  @click="() => filters = {}">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-spin :spinning="loading">
      <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.cid" bordered>
          <span slot="author" slot-scope="text">
              <a-tag color="green">{{text}}</a-tag></span>
        <template slot="operation" slot-scope="record">
          <a  @click="() => deletelog(record)">删除</a>
        </template>
        <span slot="allowComment" slot-scope="text">
              <a-tag v-if= "text==1" color="orange">开启</a-tag></span>
        <span slot="status" slot-scope="text">
              <a-tag  v-if= "text==1" color="blue">发布</a-tag></span>
        <span slot="allowFeed" slot-scope="text">
              <a-tag v-if= "text==1" color="red">是</a-tag>
              <a-tag v-if= "text!=1" color="gray">否</a-tag>
        </span>

      </a-table>
      </a-spin>
    </div>
  </div>
</template>
<script>
    const columns = [
        { title: '标题', width: 200, dataIndex: 'title', key: 'title', fixed: 'left' },
        { title: '作者', dataIndex: 'author', key: 'author' , scopedSlots: { customRender: 'author' }},
        { title: '最近修改时间', dataIndex: 'gtmModified', key: 'gtmModified' },
        { title: '评论数量', dataIndex: 'hits', key: 'hits' },
        { title: '状态', dataIndex: 'status', key: 'status' ,scopedSlots: { customRender: 'status' }},
        { title: '允许订阅', dataIndex: 'allowComment', key: 'allowComment',scopedSlots: { customRender: 'allowComment' } },
        { title: '开启评论', dataIndex: 'allowFeed', key: 'allowFeed' ,scopedSlots: { customRender: 'allowFeed' }},

        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    import API from '../../api/api_blog'
    export default {
        data() {
            return {
                filters: {
                    name: ""
                },
                loading:true,
                expand: false,
                form: this.$form.createForm(this, { name: 'advanced_search' }),
                rows:[],
                pagination:{

                    total:0,

                    pageSize: 10,

                },
                columns,
            };
        },
        methods: {
            handleSearch (val) {

                let that = this;
                that.page=val;
                that.loading=true;
                let params = {
                    limit: 10,
                    username:that.filters.name,
                    page:val
                }
                API.list(params).then(res => {
                    if (res.code === 0) {
                        that.pagination.total=res.page.total;
                        that.rows = res.page.rows;
                        that.loading=false;
                    }
                })

            },
            handleTableChange(pagination) {
                this.handleSearch(pagination.current)
            },
            deletelog(record){
                let that = this

                API.remove({id: record.id}).then(res => {
                    if (res.code === 0) {
                        that.handleSearch(1)
                    }
                })
            }},
        mounted() {
            this.handleSearch(1);
        }
    };
</script>
<style>
  .ant-advanced-search-form {
    padding: 14px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 6px;
  }
</style>