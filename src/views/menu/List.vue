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
      <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.id" bordered >
       <span slot="type" slot-scope="text">
              <a-tag
              v-if="text==0"
              color="green">
                目录
               </a-tag>
              <a-tag
                   v-if="text==1"
                   color="red">
                菜单
               </a-tag>
      </span>
          <span slot="myicon" slot-scope="text">
            <a-icon :type="text"/>
      </span>
        <template slot="operation" slot-scope="record">
            <a  @click="() => add({parentId:record.object.parentId})">添加</a>
            <a-divider type="vertical" />
            <a  @click="() => edit(record)">编辑</a>
            <a-divider type="vertical" />
          <a  @click="() => deletelog(record)">删除</a>
        </template>
      </a-table>
        </a-spin>
        <menuForm ref="modal" @ok="handleOk"/><!--新建窗口-->
    </div>
  </div>
</template>
<script>
    const columns = [
        { title: '名称', width: 150, dataIndex: 'object.name', key: 'object.name', fixed: 'left' },
        { title: '菜单类型', dataIndex: 'object.type', key: 'object.type',  scopedSlots: { customRender: 'type' }, },
        { title: '路径', dataIndex: 'object.url', key: 'object.url' },
        { title: '图标', dataIndex: 'object.icon', key: 'object.icon' ,scopedSlots: { customRender: 'myicon' },},
        { title: '权限', dataIndex: 'object.perms', key: 'object.perms' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const formcolumns = [
        { title: 'id', type :'hidden',dataIndex: 'menuId', key: 'menuId' },
        { title: 'id', type :'hidden',dataIndex: 'parentId', key: 'parentId' },
        { title: '类型',type:'radio', width: 30, dataIndex: 'type', key: 'type' ,
            data: [{label:'目录',value:0}, {label:'菜单',value:1}, {label:'api',value:2}],},
        { title: '名称', type:'input',required:true, dataIndex: 'name', key: 'name' },
        { title: '路径', type:'input',required:false, dataIndex: 'url', key: 'url' },
        { title: '权限', type:'input', required:false,dataIndex: 'perms', key: 'perms' },
        { title: '图标', type:'input', required:true,dataIndex: 'icon', key: 'icon' },
        { title: '排序', type:'input', required:true,dataIndex: 'orderNum', key: 'orderNum' },
    ];
    import menuForm from '@/components/userForm/menuForm'
    import API from '../../api/api_menu'
    export default {
        components: {

            menuForm,


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
            handleOk () {
                this.handleSearch(1)
            },
            add (record) {

                this.$refs.modal.add(formcolumns,record)
            },
            edit (record) {

                this.$refs.modal.edit(formcolumns,record.object)
            },
            handleSearch: function (val) {

                let that = this
                that.page = val
                that.loading=true;
                let params = {
                    limit: 10,
                    username: that.filters.name,
                    page: val
                }
                API.menus(params).then(res => {
                    let reg=new RegExp("\"children\":"+"\\[\\],","g")//g代表全部

                    that.rows = JSON.parse(JSON.stringify(res).replace(reg,""))//去除空children
                    that.loading=false;

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