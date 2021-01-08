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
				<template slot="operation" slot-scope="record">
					<a  @click="() => openimg(record.id)">查看流程图</a>
					<a-divider type="vertical" />
					<a  @click="() => remove(record.deploymentId)">删除</a>
					<a-divider type="vertical" />
					<a  @click="() => startProcess(record.key)">创建流程</a>
				</template>
			</a-table>
            <ImgActiviti ref="modal"/><!--新建窗口-->
			</a-spin>
		</div>
	</div>
</template>
<script>
    const columns = [
        { title: '序号', width: 100, customRender:(text,record,index)=>`${index+1}`, fixed: 'left' },
        { title: '部署id', dataIndex: 'deploymentId', key: 'deploymentId' },
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: '关键字', dataIndex: 'key', key: 'key' },
        { title: '流程名', dataIndex: 'deploymentName', key: 'deploymentName' },
        { title: '资源名字', dataIndex: 'resourceName', key: 'resourceName' },
        { title: '资源图片', dataIndex: 'diagramresourcename', key: 'diagramresourcename' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 250,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    import ImgActiviti from '@/components/Activiti/ImgActiviti'
    import API from '../../api/api_activiti'
    export default {
        components: {
            ImgActiviti,
        },
        data() {
            return {
                filters: {
                    name: ""
                },
                loading:true,
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

            openimg (id) {

                this.$refs.modal.openimg(id)
            },
            startProcess: function (key) {
                let that = this
                API.startProcess({processDefiKey: key}).then(res => {
                    if (res.code === 0) {
                        that.$message.success(res.msg)
                    }
                })
            },
            remove: function (id) {
                let that = this
                API.remove({id: id}).then(res => {
                    if (res.code === 0) {
                        that.handleSearch(that.page)
                    }
                })
            },
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
                        that.pagination.total=res.data.total
                        that.rows = res.data.rows
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