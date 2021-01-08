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

                <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange"
                         :rowKey="record=> record.id">
                     <span slot="type" slot-scope="text">
              <a-tag
                      v-if="text==1"
                      color="green">
                爬虫
               </a-tag>
              <a-tag
                      v-if="text==2"
                      color="red">
                自动化测试
               </a-tag>
                           <a-tag
                                   v-if="text==3"
                                   color="blue">
                数据库文档
               </a-tag>
      </span>
                    <template slot="operation" slot-scope="record">
                        <a @click="() => handleEdit(formcolumns,record)">执行</a>

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
        {title: '爬虫名字', dataIndex: 'name', key: 'name'},
        {title: '爬虫类型', dataIndex: 'type', key: 'type',scopedSlots: { customRender: 'type' }},
        {title: '爬虫类', dataIndex: 'classurl', key: 'classurl'},
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            scopedSlots: {customRender: 'operation'},
        },
    ];
    const formcolumns = [
        {title: 'name', type: 'input', dataIndex: 'name', key: 'name'},
        {title: 'age', type: 'input', dataIndex: 'age', key: 'age'},
        {title: 'address', type: 'input', dataIndex: 'address', key: 'address'},
    ];
    import addForm from '@/components/Form/addForm'
    import editForm from '@/components/Form/editForm'
    import API from '../../api/api_seimiCrawler'

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
            handleEdit(formcolumns, record) {
                console.log(formcolumns + ">>>>>>>>>>" + record.type);
                if (record.type == '1') {
                    API.basic();
                } else if (record.type == '2') {
                    API.seleniumhq();
                } else {
                    API.screw();
                }

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

        },
        mounted() {
            this.handleSearch(1);
        }
    }
</script>
<style>

</style>