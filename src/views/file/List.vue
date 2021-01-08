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
      <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.id" bordered>

        <img  slot="image" :src="text" slot-scope="text" width="50" height="50">
        <span slot="tags" slot-scope="text">
      <a-tag
              v-if="text==1"
              color="green">
      图片
      </a-tag>
    </span>
        <template slot="operation" slot-scope="record">
          <a  @click="() =>  handleEdit(formcolumns,record)">编辑  </a>
          <a  @click="() => deletelog(record)">删除</a>
        </template>
      </a-table>
        <fileForm ref="modal"  @ok="edithandleOk"/><!--新建窗口-->
      </a-spin>
    </div>
  </div>
</template>
<script>
    const columns = [
        { title: '预览', width: 100, dataIndex: 'url', key: 'url', fixed: 'left' , scopedSlots: { customRender: 'image' },},
        { title: '类型', dataIndex: 'type', key: 'type' ,scopedSlots: { customRender: 'tags' } },
        { title: '路径', width: 150,dataIndex: 'url', key: 'url2' },
        { title: '创建日期', dataIndex: 'createDate', key: 'createDate' },

        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const formcolumns = [
        {title: 'id',type:'hidden', dataIndex: 'id', key: 'id'},
        {title: '图片地址',type:'upload', dataIndex: 'url', key: 'url'},
        {title: '类型',type:'input', dataIndex: 'type', key: 'type'},
        {title: '创建时间',type:'input', dataIndex: 'createDate', key: 'createDate'},
    ];
    import fileForm from '@/components/filefrom/fileForm'
    import API from '../../api/api_file'
    export default {
        components: {
            fileForm,
        },
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
                formcolumns
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
                API.files(params).then(res => {
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
            },
            handleEdit(formcolumns, record) {
                this.$refs.modal.edit(formcolumns,record)
            },
            edithandleOk(values) {

                API.edit(values).then(res => {
                    if(res.code==0) {
                        this.$message.success('保存成功')
                    }else{
                        this.$message.success('保存失败')
                    }
                    console.log('form values主', res)
                    this.handleSearch(1)
                })
            },
            },
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