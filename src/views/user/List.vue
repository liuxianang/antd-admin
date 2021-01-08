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
    <div class="table-operator">
      <a-spin :spinning="loading">
      <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.userId" bordered >
        <template slot="operation" slot-scope="record">
            <a  @click="() => edit(record)">编辑</a>
            <a-divider type="vertical" />
          <a  @click="() => deletelog(record)">删除</a>
        </template>
      </a-table>
        <userForm ref="modal" @ok="handleSearch(1)"/><!--新建窗口-->
      </a-spin>
    </div>
  </div>
</template>
<script>
    const columns = [
        { title: '序号',width: 30,  dataIndex: 'userId', key: 'userId' , fixed: 'left'},
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '性别', dataIndex: 'sex', key: 'sex' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '出生日期', dataIndex: 'birth', key: 'birth' },
        { title: '地址', dataIndex: 'addr', key: 'addr' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const formcolumns = [
        { title: 'id', type :'hidden',dataIndex: 'userId', key: 'userId' },
        { title: '用户名',type:'input', width: 30, dataIndex: 'username', key: 'username'  ,
           },
        { title: '姓名', type:'input', dataIndex: 'name', key: 'name' },
        { title: '出生日期', type:'input', dataIndex: 'birth', key: 'birth' },
        { title: '邮箱', type:'input', dataIndex: 'email', key: 'email' },
        { title: '角色', type:'checkbox', dataIndex: 'roleIds', key: 'roleIds',
            data: [{label:'目录',value:'0'}, {label:'菜单',value:'1'}, {label:'api',value:'2'}],},
    ];
    import userForm from '@/components/userForm/userForm'
    import API from "../../api/api_user";
    export default {
        components: {
            userForm,
        },
        data() {
            return {
                filters: {
                    name: ""
                },
                loading:true,
                formcolumns,
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
            edit (record) {

                this.$refs.modal.edit(formcolumns,record)
            },
            handleSearch (val) {

                let that = this
                that.page=val
                that.loading=true;
                let params = {
                    limit: 10,
                    username:that.filters.name,
                    page:val
                }
                API.findList(params).then(res => {
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