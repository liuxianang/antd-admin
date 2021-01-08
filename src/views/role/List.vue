<template>
    <div>
        <div class="ant-advanced-search-form">
            <!--工具条-->

            <a-form layout="inline" :model="filters">
                <a-row :gutter="24">
                    <a-col :span="20">
                        <a-form-item label="名字">
                            <a-input v-model="filters.name" placeholder="用户名/姓名/昵称" style="min-width: 240px;"
                            ></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-item>
                            <a-button type="primary" @click="handleSearch(1)">查询</a-button>
                            <a-button>重置</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div>
            <a-spin :spinning="loading">
            <a-button type="primary" icon="plus" @click="$refs.modal.add(formcolumns)">新建</a-button>
            <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.roleId" bordered >
                <template slot="operation" slot-scope="record">
                    <a @click="() => edit(record)">编辑</a>
                    <a-divider type="vertical"/>
                    <a @click="() =>Delete(record)">删除</a>
                </template>
            </a-table>
            <roleForm ref="modal" @ok="handleOk"/><!--新建窗口-->
            </a-spin>
        </div>
    </div>
</template>
<script>
    const columns = [
        {title: '角色名', width: 100, dataIndex: 'roleName', key: 'roleName', fixed: 'left'},
        {title: '备注', dataIndex: 'remark', key: 'remark'},

        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            scopedSlots: {customRender: 'operation'},
        },
    ];
    const formcolumns = [
        {title: 'id', type: 'hidden', dataIndex: 'roleId', key: 'roleId'},
        {
            title: '角色名', type: 'input', width: 30, dataIndex: 'roleName', key: 'roleName',
        },
        {title: '备注', type: 'input', dataIndex: 'remark', key: 'remark'},
        {title: '权限', type: 'tree', dataIndex: 'menuIds', key: 'menuIds'},


    ];
    import roleForm from '@/components/userForm/roleForm'
    import API from '../../api/api_role';

    export default {
        components: {

            roleForm,


        },
        data() {
            return {
                formcolumns,
                filters: {
                    name: ""
                },
                loading:true,
                expand: false,
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                rows: [],
                pagination: {

                    total: 0,
                    pageSize: 10,

                },
                columns,
                menus:[]
            };
        },
        methods: {
            handleOk () {
                this.handleSearch(1)
            },
            edit(record) {

                this.$refs.modal.edit(formcolumns, record)
            },
            handleSearch(val) {

                let that = this
                that.page = val
                that.loading=true;
                let params = {
                    limit: 10,
                    username: that.filters.name,
                    page: val
                }
                API.findList(params).then(res => {

                    that.pagination.total = res.total
                    that.rows = res.rows
                    that.loading=false;

                })

            },
            handleTableChange(pagination) {
                this.handleSearch(pagination.current)
            },
            Delete(record) {
                let that = this

                API.remove({id:record.roleId}).then(res => {
                    if (res.code === 0) {
                        that.handleSearch(1)
                    }
                })
            }
        },
        mounted() {

            this.handleSearch(1);
            this.$nextTick(function () {

            })
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