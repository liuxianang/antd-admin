<template>
    <div>
        <div class="ant-advanced-search-form">
            <!--工具条-->
            <a-form layout="inline" :model="filters">
                <a-row :gutter="24">
                    <a-col :span="20">
                        <a-form-item label="名字">
                            <a-input v-model="filters.jobName" placeholder="用户名/姓名/昵称" style="min-width: 240px;"
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
                        <a-tag v-if="record.jobStatus==0" color="green" @click="() => changeJobStatus(record)">启动</a-tag>
                        <a-tag v-if="record.jobStatus==1" color="red" @click="() => changeJobStatus(record)">暂停</a-tag>
                        <a-divider type="vertical"/>
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
                    {title: 'id', dataIndex: 'id', key: 'id'},
                    {title: '表达式', dataIndex: 'cronExpression', key: 'cronExpression'},
                    {title: '任务类', dataIndex: 'beanClass', key: 'beanClass'},
                    {title: '任务分组', dataIndex: 'jobGroup', key: 'jobGroup'},
                    {title: '任务名称', dataIndex: 'jobName', key: 'jobName'},
                {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            scopedSlots: {customRender: 'operation'},
        },
    ];
    const formcolumns = [
                    {title: 'id',type:'hidden', dataIndex: 'id', key: 'id'},
                    {title: '表达式',type:'input', dataIndex: 'cronExpression', key: 'cronExpression'},
                    {title: '任务类',type:'input', dataIndex: 'beanClass', key: 'beanClass'},
                    {title: '任务分组',type:'input', dataIndex: 'jobGroup', key: 'jobGroup'},
                    {title: '任务名称',type:'input', dataIndex: 'jobName', key: 'jobName'},
            ];
    import addForm from '@/components/Form/addForm'
    import editForm from '@/components/Form/editForm'
    import API from '../../api/api_job'

    export default {
        components: {
            addForm,
            editForm
        },
        data() {
            return {
                filters: {
                    jobName: ""
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
            changeJobStatus( record) {
                let that = this
                if(record.jobStatus==0){
                API.changeJobStatus({id: record.id,cmd:"start"}).then(res => {
                    if(res.code === 0){
                        this.$message.success(res.msg)
                        that.handleSearch(1)
                    }
                })
                }else{
                    API.changeJobStatus({id: record.id,cmd:"stop"}).then(res => {
                        if(res.code === 0){
                            this.$message.success(res.msg)
                            that.handleSearch(1)
                        }
                    })
                }
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
                    jobName: that.filters.jobName,
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
            console.log('>>>33333');
            this.handleSearch(1);
        }
    }
</script>
<style>

</style>