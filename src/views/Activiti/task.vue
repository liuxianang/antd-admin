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

                            <a-button @click="() => filters = {}">重置</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div>
            <a-spin :spinning="loading">
                <a-table ref="table" :columns="columns" :dataSource="rows" :pagination="pagination"
                         @change="handleTableChange" :rowKey="record=> record.id" bordered>
                    <template slot="operation" slot-scope="record">
                        <a @click="() => opentrackimg(record.pProcessInstanceId,record.processDefinitionId)">查看流程图</a>

                        <a-divider type="vertical"/>
                        <a @click="() => Applicationprocess(record)">申请流程</a>
                    </template>
                </a-table>
            </a-spin>
            <ImgtrackActiviti ref="modal"/><!--新建窗口-->
            <activiti-application ref="modalapp" @ok="handleOk"/><!--新建窗口-->
        </div>
    </div>
</template>
<script>
    const columns = [
        {title: '序号', width: 100, customRender: (text, record, index) => `${index + 1}`, fixed: 'left'},
        {title: '任务id', dataIndex: 'id', key: 'id'},
        {title: '任务名称', dataIndex: 'name', key: 'name'},
        {title: '创建人', dataIndex: 'creater', key: 'creater'},
        {title: '流程定义id', dataIndex: 'processDefinitionId', key: 'processDefinitionId'},
        {title: '流程id', dataIndex: 'pProcessInstanceId', key: 'pProcessInstanceId'},
        {title: '资源名字', dataIndex: 'resourceName', key: 'resourceName'},
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 250,
            scopedSlots: {customRender: 'operation'},
        },
    ];
    const formcolumns = [
        {title: '任务id', type: 'hidden', dataIndex: 'taskid', key: 'taskid'},
        {
            title: '请假类型', type: 'select', dataIndex: 'leave_type', key: 'leave_type',
            data: [{text: '病假', value: 'bingjia'}, {text: '事假', value: 'shijia'}, {text: '产假', value: 'caijia'}],
        },
        {title: '请假理由', type: 'input', dataIndex: 'reason', key: 'reason'},


    ];
    const formcolumnsBX = [
        {title: '任务id', type: 'hidden', dataIndex: 'taskid', key: 'taskid'},

        {title: '报销金额', type: 'input', dataIndex: 'money', key: 'money'},


    ];
    import ImgtrackActiviti from '@/components/Activiti/ImgtrackActiviti'
    import ActivitiApplication from '@/components/Activiti/ActivitiApplication'
    import API from '../../api/api_activiti'

    export default {
        components: {
            ImgtrackActiviti,
            ActivitiApplication
        },
        data() {
            return {
                filters: {
                    name: ""
                },
                loading: true,
                formcolumns,
                formcolumnsBX,
                expand: false,
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                rows: [],
                pagination: {

                    total: 0,

                    pageSize: 10,

                },
                columns,
            };
        },
        methods: {
            handleOk() {
                this.handleSearch(1)
            },
            opentrackimg(pProcessInstanceId, processDefinitionId) {

                this.$refs.modal.opentrackimg(pProcessInstanceId, processDefinitionId)
            },
            Applicationprocess: function (record) {
                if (record.name == '费用报销申请') {
                    this.$refs.modalapp.Applicationprocess(this.formcolumnsBX, record.id)
                }
                else {
                    this.$refs.modalapp.Applicationprocess(this.formcolumns, record.id)
                }

            },
            handleSearch(val) {
                let that = this
                that.page = val
                that.loading = true;
                let params = {
                    limit: 10,
                    username: that.filters.name,
                    page: val
                }
                API.listtask(params).then(res => {
                    if (res.code === 0) {
                        that.pagination.total = res.data.total
                        that.rows = res.data.rows
                        that.loading = false;
                    }
                })

            },
            handleTableChange(pagination) {
                this.handleSearch(pagination.current)
            },
            deletelog(record) {
                let that = this

                API.remove({id: record.id}).then(res => {
                    if (res.code === 0) {
                        that.handleSearch(1)
                    }
                })
            }
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