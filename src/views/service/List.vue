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
                <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange"
                         :rowKey="record=> record.status">
                    <span slot="application" slot-scope="text"><a-tag color="cyan">{{text}}</a-tag></span>

                </a-table>
            </a-spin>
        </div>
    </div>
</template>
<script>
    const columns = [
        {title: '序号', width: 100, customRender: (text, record, index) => `${index + 1}`, fixed: 'left'},
        {title: 'Application', dataIndex: 'application', key: 'application',scopedSlots: { customRender: 'application' },},
        {title: 'AMIs', dataIndex: 'amis', key: 'amis'},
        {title: 'Availability Zones', dataIndex: 'availabilityZones', key: 'availabilityZones'},
        {title: 'Status', dataIndex: 'status', key: 'status'},

    ];

    import API from '../../api/api_service'

    export default {
        data() {
            return {
                filters: {
                    name: ""
                },
                expand: false,
                loading: true,
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
            handleSearch(val) {

                let that = this
                that.page = val
                that.loading = true;
                let params = {
                    limit: 10,
                    username: that.filters.name,
                    page: val
                }
                API.list(params).then(res => {
                    if (res.code === 0) {
                        that.pagination.total = res.page.total
                        that.rows = res.page.rows
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