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
                <a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :scroll="{ x: 1500 }"
                         :rowKey="record=> record.id">
                    <template slot="operation" slot-scope="record">
                        <a @click="() => handleEdit(formcolumns,record)">编辑</a>
                        <a-divider type="vertical"/>
                        <a @click="() => remove(record)">删除</a>
                    </template>
                    <span slot="streetname" slot-scope="text">
                        <ellipsis :length="24" tooltip>{{ text }}</ellipsis>
                    </span>
                </a-table>
                <addForm ref="createModal" @ok="addhandleOk"/><!--新建窗口-->
                <editForm ref="modal" @ok="edithandleOk"/><!--编辑窗口-->
            </a-spin>
        </div>
    </div>
</template>
<script>
    const columns = [
                    {title: '订单号', dataIndex: 'orderid', key: 'orderid' ,fixed: 'left'},
                    {title: '用户号', dataIndex: 'userid', key: 'userid'},
                    {title: '产品号', dataIndex: 'productid', width: 150, key: 'productid'},
                    {title: '名称', dataIndex: 'productname', width: 150, key: 'productname'},
                    {title: '价格', dataIndex: 'productprice', width: 150, key: 'productprice'},
                    {title: '数量', dataIndex: 'productnum',  width: 150,key: 'productnum'},
                    {title: '图片', dataIndex: 'productimg', width: 150, key: 'productimg'},
                    {title: '总价格', dataIndex: 'totalprice', width: 150, key: 'totalprice'},
                    {title: '详细地址', dataIndex: 'streetname', width: 350, key: 'streetname', scopedSlots: { customRender: 'streetname' }},
                    {title: '邮编地址', dataIndex: 'postname',  width: 150,key: 'postname'},
                    {title: '邮编号', dataIndex: 'postcode', width: 150, key: 'postcode'},
                    {title: '电话', dataIndex: 'tel', width: 150, key: 'tel'},
                    {title: '单价', dataIndex: 'itemprice', width: 150, key: 'itemprice'},
                    {title: '配送费', dataIndex: 'discount', width: 150, key: 'discount'},
                    {title: '店铺优惠', dataIndex: 'shipprice', width: 150,key: 'shipprice'},
                    {title: '运险费', dataIndex: 'freightrisk', width: 150, key: 'freightrisk'},
                    {title: '创建时间', dataIndex: 'createdate', width: 150, key: 'createdate'},
                    {title: '支付状态', dataIndex: 'ifpay', width: 150, key: 'ifpay'},
                {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            scopedSlots: {customRender: 'operation'},
        },
    ];
    const formcolumns = [
                    {title: '订单号',type:'input', dataIndex: 'orderid', key: 'orderid'},
                    {title: '用户号',type:'input', dataIndex: 'userid', key: 'userid'},
                    {title: '产品id',type:'input', dataIndex: 'productid', key: 'productid'},
                    {title: '产品名字',type:'input', dataIndex: 'productname', key: 'productname'},
                    {title: '产品价格',type:'input', dataIndex: 'productprice', key: 'productprice'},
                    {title: '产品数',type:'input', dataIndex: 'productnum', key: 'productnum'},
                    {title: '产品图片',type:'input', dataIndex: 'productimg', key: 'productimg'},
                    {title: '总价',type:'input', dataIndex: 'totalprice', key: 'totalprice'},
                    {title: '详细地址',type:'input', dataIndex: 'streetname', key: 'streetname'},
                    {title: '邮编名',type:'input', dataIndex: 'postname', key: 'postname'},
                    {title: '邮编号',type:'input', dataIndex: 'postcode', key: 'postcode'},
                    {title: '电话',type:'input', dataIndex: 'tel', key: 'tel'},
                    {title: '单价',type:'input', dataIndex: 'itemprice', key: 'itemprice'},
                    {title: '配送费',type:'input', dataIndex: 'discount', key: 'discount'},
                    {title: '优惠价格',type:'input', dataIndex: 'shipprice', key: 'shipprice'},
                    {title: '运险费',type:'input', dataIndex: 'freightrisk', key: 'freightrisk'},
                    {title: '创建时间',type:'input', dataIndex: 'createdate', key: 'createdate'},
                    {title: '是否已支付',type:'input', dataIndex: 'ifpay', key: 'ifpay'},
            ];
    import addForm from '@/components/Form/addForm'
    import editForm from '@/components/Form/editForm'
    import API from '../../api/api_orderlist'
    import  Ellipsis  from '@/components/Ellipsis'
    export default {
        components: {
            addForm,
            editForm,
            Ellipsis
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