<template>
    <a-modal
            title="编辑"
            :width="640"
            :visible="visible"
            :confirmLoading="confirmLoading"
            @ok="handleSubmit"
            @cancel="handleCancel"
    >
        <a-input v-model="paperid" type="hidden"></a-input>
        <a-tree
                checkable
                @expand="onExpand"
                :expandedKeys="expandedKeys"
                :autoExpandParent="autoExpandParent"
                v-model="checkedKeys"
                :treeData="treeData"
        />
    </a-modal>
</template>

<script>

    import API from '../../api/api_exam'

    export default {

        data() {
            return {
                expandedKeys: [],
                autoExpandParent: true,
                checkedKeys: [],
                selectedKeys: [],
                treeData:[],
                paperid:"",
                visible:false,
                confirmLoading:false
            }
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val);
            },
        },
        methods: {
            onExpand(expandedKeys) {
                console.log('onExpand', expandedKeys);
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys;
                this.autoExpandParent = false;
            },
            onCheck(checkedKeys) {
                console.log('onCheck', checkedKeys);
                this.checkedKeys = checkedKeys;
            },


            edit(val) {
                let that = this;

                that.paperid = val
                API.getquestionall({id: val}).then(function (result) {

                    that.checkedKeys = result.checkedkey
                    let reg=new RegExp("\"label\":","g")//g代表全部
                    let reg1=new RegExp("\"id\":","g")//g代表全部
                    that.treeData = JSON.parse(JSON.stringify(result.exam).replace(reg,"\"title\":").replace(reg1,"\"key\":"))
                    that.visible = true

                })
            },

            handleSubmit() {
                let that = this
                const {form: {validateFields}} = this
                this.confirmLoading = true
                validateFields((errors, values) => {
                    if (!errors) {
                        this.visible = false
                        this.confirmLoading = false
                        let params = Object.assign(values);
                        if (this.okmethod == "add") {
                            params.menuIds = this.checkedKeys
                            API.add(params).then(function (res) {
                                that.$emit('ok', values)
                                that.$message.success(res.msg)
                            })
                        } else {
                            params.menuIds = this.checkedKeys
                            API.update(params.id, params).then(function (res) {
                                that.$emit('ok', values)
                                that.$message.success(res.msg)
                            })
                        }

                    } else {
                        this.confirmLoading = false
                    }
                })
            },
            handleCancel() {
                this.visible = false
            }


        },

    }
</script>
