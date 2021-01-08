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
        <!--列表-->
        <div class="table-operator">
            <a-spin :spinning="loading">
                <a-button type="primary" icon="plus" @click="() => handleAdd(formcolumns)">新建</a-button>
                <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange"
                         :rowKey="record=> record.id">
                    <template slot="operation" slot-scope="record">
                        <a @click="() => handleEdit(formcolumns,record)">编辑</a>
                        <a-divider type="vertical"/>
                        <a @click="() => remove(record)">删除</a>
                    </template>
                </a-table>
                <addForm ref="createModal" @ok="addhandleOk"/><!--新建窗口-->
                <editForm ref="modal" @ok="edithandleOk"/><!--编辑窗口-->
            </a-spin>
        </div>
    </div>
</template>
<script>
    const columns = [
                    {title: '用户id', dataIndex: 'userid', key: 'userid'},
                    {title: '用户名称', dataIndex: 'username', key: 'username'},
                    {title: '用户密码', dataIndex: 'userpwd', key: 'userpwd'},
                    {title: '我的头像', dataIndex: 'myphoto', key: 'myphoto'},
                {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            scopedSlots: {customRender: 'operation'},
        },
    ];
    const formcolumns = [
                    {title: '用户id',type:'input', dataIndex: 'userid', key: 'userid'},
                    {title: '用户名称',type:'input', dataIndex: 'username', key: 'username'},
                    {title: '用户密码',type:'input', dataIndex: 'userpwd', key: 'userpwd'},
                    {title: '我的头像',type:'input', dataIndex: 'myphoto', key: 'myphoto'},
            ];
    import addForm from '@/components/Form/addForm'
    import editForm from '@/components/Form/editForm'
    import API from '../../api/api_shop_user'

    export default {
        components: {
            addForm,
            editForm
        },
        data() {
            return {
                filters: {
                    name: ""
                },
                loading: true,
                rows: [],
                pagination: {
                    total: 0,
                    pageSize: 10,
                },
                columns,
                formcolumns
            };
        },
        methods: {
            addhandleOk(values) {
                API.add(values).then(res => {

                    if(res.code==0) {
                    this.$message.success('保存成功')

                }else{
                    this.$message.success('保存失败')

                }
                console.log('form values主', res)
                this.handleSearch(1)
            })
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
            handleEdit(formcolumns, record) {
                this.$refs.modal.edit(formcolumns,record)
            },
            handleAdd(formcolumns) {
                this.$refs.createModal.add(formcolumns)
            },
            handleSearch(val) {
                let that = this
                that.page = val
                that.loading = true;
                let params = {
                    limit: 10,
                    name: that.filters.name,
                    page: val
                }
                API.list(params).then(res => {
                    if(res.code === 0){
                    that.pagination.total = res.page.total
                    that.rows = res.page.rows
                    that.loading = false;
                }
            })
            },
            handleTableChange(pagination) {
                this.handleSearch(pagination.current)
            },
            remove(record) {
                let that = this
                API.remove({id: record.id}).then(res => {
                    if(res.code === 0){
                    that.handleSearch(1)
                }
            })
            }
        },
        mounted() {
            this.handleSearch(1);
        }
    }
</script>
<style>

</style>