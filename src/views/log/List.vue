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
    <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.id" bordered >
        <span slot="methodShow" slot-scope="text">
        <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
      </span>
        <template slot="operation" slot-scope="record">
            <a  @click="() => deletelog(record)">删除</a>
        </template>
    </a-table>
    </a-spin>
</div>
    </div>
</template>
<script>
    const columns = [
        { title: '用户', width: 100, dataIndex: 'username', key: 'username', fixed: 'left' },
        { title: '用时', dataIndex: 'time', key: 'time' },
        { title: '操作时间', dataIndex: 'gmtCreate', key: 'gmtCreate' },
        { title: '方法', dataIndex: 'method', key: 'method',  width: 150,
            scopedSlots: { customRender: 'methodShow' },},
        { title: 'ip', dataIndex: 'ip', key: 'ip' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    import  Ellipsis  from '@/components/Ellipsis/Ellipsis'
    import API from '../../api/api_log'
    export default {
        components: {

            Ellipsis,

        },
        data() {
            return {
                loading:true,
                filters: {
                    name: ""
                },
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