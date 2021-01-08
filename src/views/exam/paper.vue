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
			<a-table :columns="columns" :dataSource="rows" :pagination="pagination" @change="handleTableChange" :rowKey="record=> record.id">
				<template slot="operation" slot-scope="record">

					<a  @click="() => showpaperDialog(record.id)">试卷组装</a>

				</template>
			</a-table>
				<madepaperForm ref="modal" /><!--新建窗口-->
			</a-spin>
		</div>
	</div>
</template>
<script>
    const columns = [
        { title: '序号', width: 100,customRender:(text,record,index)=>`${index+1}`, fixed: 'left' },
        { title: '试卷名称', dataIndex: 'name', key: 'name' },
        { title: '创建时间', dataIndex: 'created', key: 'created' },
        { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
        { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
        { title: '科目名称', dataIndex: 'subjectName', key: 'subjectName' },
        { title: '是否发布', dataIndex: 'publish', key: 'publish' },
        { title: '试卷类型', dataIndex: 'type', key: 'type' },
        { title: '备注', dataIndex: 'remark', key: 'remark' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    import madepaperForm from '@/components/examForm/madepaperForm'
    import API from '../../api/api_exam'
    export default {
        components: {
            madepaperForm,
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
                API.listpaper(params).then(res => {

                        that.pagination.total=res.total
                        that.rows = res.rows
                        that.loading=false;

                })

            },
            handleTableChange(pagination) {
                this.handleSearch(pagination.current)
            },

            showpaperDialog: function (val) {
                this.$refs.modal.edit(val)

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