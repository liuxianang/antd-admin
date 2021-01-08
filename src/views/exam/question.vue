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
                <a-row>
                    <a-col :span="4">
                        <a-tree :tree-data="treeData"   @select="onSelect">
                        </a-tree>
                    </a-col>
                    <a-col :span="20">
                        <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange"
                                 :rowKey="record=> record.id">
                <span slot="type" slot-scope="text">
                <a-tag v-if="text==0" color="green">单选题</a-tag>
                <a-tag v-if="text==1" color="red">多选题</a-tag>
                <a-tag v-if="text==2" color="orange">简答题</a-tag>
                </span>
                            <span slot="answer" slot-scope="text">
                        <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
                    </span>
                            <span slot="analysis" slot-scope="text">
                        <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
                    </span>
                            <span slot="mytitle" slot-scope="text">
                        <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
                    </span>
                            <span slot="simpleTitle" slot-scope="text">
                        <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
                    </span>
                            <template slot="operation" slot-scope="record">
                                <a @click="() => handleEdit(formcolumns,record)">编辑</a>
                                <a-divider type="vertical"/>
                                <a @click="() => remove(record)">删除</a>
                            </template>
                        </a-table>
                    </a-col>
                </a-row>


                <addForm ref="createModal" @ok="addhandleOk"/><!--新建窗口-->
                <editForm ref="modal" @ok="edithandleOk"/><!--编辑窗口-->
            </a-spin>
        </div>
    </div>
</template>
<script>
    const columns = [
                    {title: '序号', dataIndex: 'id', key: 'id'},
                    {title: '题目类型', dataIndex: 'type', key: 'type',scopedSlots: { customRender: 'type' }},
                    {title: '题目分值', dataIndex: 'score', key: 'score'},
                    {title: '题目答案', dataIndex: 'answer', key: 'answer' , scopedSlots: { customRender: 'answer' }},
                    {title: '题目解析', dataIndex: 'analysis', key: 'analysis', scopedSlots: { customRender: 'analysis' }},
                    {title: '题干', dataIndex: 'title', key: 'title',scopedSlots: { customRender: 'mytitle' }},
                    {title: '简要题干', dataIndex: 'simpleTitle', key: 'simpleTitle',scopedSlots: { customRender: 'simpleTitle' }},
                {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            scopedSlots: {customRender: 'operation'},
        },
    ];
    const formcolumns = [
                    {title: 'id',type:'hidden', dataIndex: 'id', key: 'id'},
                    {title: '问题类型',type:'select', dataIndex: 'type', key: 'type',  data: [{text:'多选题',value:'1'}, {text:'简答题',value:'2'},{text:'单选题',value:'0'}],},
                    {title: 'content',type:'hidden', dataIndex: 'content', key: 'content'},
                    {title: '分数',type:'input', dataIndex: 'score', key: 'score'},
                    {title: '答案',type:'input', dataIndex: 'answer', key: 'answer'},
                    {title: '问题解析',type:'input', dataIndex: 'analysis', key: 'analysis'},
                    {title: '选项一',type:'input', dataIndex: 'optionA', key: 'optionA'},
                    {title: '选项二',type:'input', dataIndex: 'optionB', key: 'optionB'},
                    {title: '选项三',type:'input', dataIndex: 'optionC', key: 'optionC'},
                    {title: '选项四',type:'input', dataIndex: 'optionD', key: 'optionD'},
                    {title: '题干',type:'input', dataIndex: 'title', key: 'title'},
                    {title: '简要题干',type:'input', dataIndex: 'simpleTitle', key: 'simpleTitle'},
            ];
    import addForm from '@/components/examForm/QuestionaddForm'
    import editForm from '@/components/Form/editForm'
    import API from '../../api/api_question'
    import  Ellipsis  from '@/components/Ellipsis'
    export default {
        components: {
            addForm,
            editForm,
            Ellipsis
        },
        data() {
            return {
                treeData: [
                        {
                            title: '科目',
                            key: '',
                            children: [
                            ],
                        },
                    ],

                filters: {
                    name: "",
                    simpleTitle:""
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
            onSelect(selectedKeys) {
                this.filters.simpleTitle=selectedKeys.toString()
                this.handleSearch(1);
            },
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
                if(record.type==2){
                    formcolumns[6].type="hidden"
                    formcolumns[7].type="hidden"
                    formcolumns[8].type="hidden"
                    formcolumns[9].type="hidden"
                    formcolumns[2].type="hidden"
                }else{
                    formcolumns[2].type="hidden"
                    formcolumns[6].type="input"
                    formcolumns[7].type="input"
                    formcolumns[8].type="input"
                    formcolumns[9].type="input"
                }
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
                    simpleTitle:that.filters.simpleTitle,
                    page: val
                }
                API.list(params).then(res => {
                    if(res.code === 0){
                    that.pagination.total = res.page.total
                    that.rows = res.page.rows
                    that.treeData[0]=res.tree
                        console.log('form values主', that.treeData)
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