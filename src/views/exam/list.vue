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
      <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.studentId">
        <template slot="operation" slot-scope="record">

          <a  @click="() => deletelog(record)">删除</a>

        </template>
        <span slot="studentName" slot-scope="text">
              <a-tag color="green">{{text}}</a-tag></span>
      </a-table>
      </a-spin>
    </div>
  </div>
</template>
<script>
    const columns = [
        { title: '学号', width: 100,dataIndex: 'studentId', key: 'studentId' , fixed: 'left' },
        { title: '姓名', dataIndex: 'studentName', key: 'studentName'  , scopedSlots: { customRender: 'studentName' }},
        { title: '班级', dataIndex: 'stydentGrade', key: 'stydentGrade' },
        { title: '化学', dataIndex: 'chemistry', key: 'chemistry' },
        { title: '历史', dataIndex: 'history', key: 'history' },
        { title: '地理', dataIndex: 'geography', key: 'geography' },
        { title: '政治', dataIndex: 'government', key: 'government' },
        { title: '数学', dataIndex: 'mathematics', key: 'mathematics' },
        { title: '物理', dataIndex: 'physical', key: 'physical' },
        { title: '生物', dataIndex: 'biology', key: 'biology' },
        { title: '英语', dataIndex: 'english', key: 'english' },
        { title: '语文', dataIndex: 'chinese', key: 'chinese' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    import API from '../../api/api_exam'
    export default {
        data() {
            return {
                filters: {
                    name: ""
                },
                expand: false,
                form: this.$form.createForm(this, { name: 'advanced_search' }),
                rows:[],
                loading:true,
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
                        that.pagination.total=res.page.total
                        that.rows = res.page.rows
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