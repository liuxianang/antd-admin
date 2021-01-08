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
              <a-button >重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-spin :spinning="loading">
      <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.tableName">
         <span slot="createTime" slot-scope="text">
              <a-tag color="green">{{text}}</a-tag></span>
        <template slot="operation" slot-scope="record">
          <a-button @click="generation(record.tableName)"  type="danger">生成代码</a-button>
        </template>
      </a-table>
      </a-spin>
    </div>
  </div>
</template>
<script>
    const columns = [
        { title: '引擎', dataIndex: 'engine', key: 'engine' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', scopedSlots: { customRender: 'createTime' }, },
        { title: '表注释', dataIndex: 'tableComment', key: 'tableComment' },
        { title: '表名', dataIndex: 'tableName', key: 'tableName' },


        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    import API from '../../api/api_generator'
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

                let that = this
                that.page=val
                that.loading=true;
                let params = {
                    limit: 10,
                    username:that.filters.name,
                    page:val
                }
                API.list(params).then(res => {
                    if (res.code === 0) {
                        that.pagination.total = res.data.total
                        that.rows = res.data.rows
                        that.loading=false;
                    }


                })

            },
            handleTableChange(pagination) {
                this.handleSearch(pagination.current)
            },
            generation: function (tableName) {

                var url ="http://localhost:8002"+"/api-admin/common/generator/code/"+tableName ;
                window.open(url);


            }},
        mounted() {
            console.log('>>>222222');
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