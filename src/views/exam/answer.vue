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
					<a-button  v-if="record.state==1" type="primary" block  @click="() => examread(record)">在线查阅</a-button>
					<a-button  v-if="record.state==0" type="danger" block  @click="() => examrevise(record)">在线批改</a-button>
				</template>
				<span slot="testPapername" slot-scope="text">
                        <ellipsis :length="14" tooltip>{{ text }}</ellipsis>
                    </span>
			</a-table>
				<examForm ref="modal" @ok="handleSearch(1)"/><!--新建窗口-->
			</a-spin>
		</div>
	</div>
</template>
<script>
    const columns = [
        { title: '序号', width: 100,customRender:(text,record,index)=>`${index+1}`, fixed: 'left' },
        { title: '试卷名称', dataIndex: 'testPapername', key: 'testPapername' , scopedSlots: { customRender: 'testPapername' }  ,width: 100},
        { title: '考生名字', dataIndex: 'studentname', key: 'studentname' ,width: 100},
        { title: '单选题', dataIndex: 'singleChoiceAnswer', key: 'singleChoiceAnswer' },
        { title: '多选题', dataIndex: 'multipleChoiceAnswer', key: 'multipleChoiceAnswer' },
        { title: '简答题（一）', dataIndex: 'shortAnswer1', key: 'shortAnswer1' },
        { title: '简答题（二）', dataIndex: 'shortAnswer2', key: 'shortAnswer2' },
        { title: '简答题（三）', dataIndex: 'shortAnswer3', key: 'shortAnswer3' },
        { title: '简答题（四）', dataIndex: 'shortAnswer4', key: 'shortAnswer4' },
        { title: '简答题（五）', dataIndex: 'shortAnswer5', key: 'shortAnswer5' },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    import  Ellipsis  from '@/components/Ellipsis'
    import examForm from '@/components/examForm/examForm'
    import API from '../../api/api_exam'
    export default {
        components: {
            examForm,
            Ellipsis
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
            examrevise (record) {
                this.$refs.modal.edit(columns,record)
            },
            examread(record) {
                this.$refs.modal.read(columns,record)
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
                API.listanswer(params).then(res => {

                    that.pagination.total=res.total
                    that.rows = res.rows
                    that.loading=false;

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