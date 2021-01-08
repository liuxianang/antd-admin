<template>
  <a-modal
    title="编辑"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" >

        <div  v-for="item in editcolumns" :key="item.key">
          <div v-if="item.type=='hidden'"><!--隐藏输入框格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    style="display:none"
            >
              <a-input type ="hidden" v-decorator="[item.key]" />
            </a-form-item>
          </div>
          <div v-if="item.type=='input'"><!--输入框格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-input v-decorator="[item.key, {rules: [{required: true,  message: '请输入数据'}]}]" />

            </a-form-item>
          </div>
          <div v-if="item.type=='disInput'"><!--只读输入框格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-input v-decorator="[item.key, {rules: [{required: true,  message: '请输入数据'}]}]" disabled/>

            </a-form-item>
          </div>
          <div v-if="item.type=='select'"><!--下拉选择格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-select  v-decorator="[item.key,]" style="width: 240px">
                <a-select-option v-for="selectitem in item.data" :key="selectitem.value">{{selectitem.text}}</a-select-option>
              </a-select>

            </a-form-item>
          </div>
          <div v-if="item.type=='disSelect'"><!--下拉选择格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-select  v-decorator="[item.key,]" style="width: 240px" disabled>
                <a-select-option v-for="selectitem in item.data" :key="selectitem.value">{{selectitem.text}}</a-select-option>
              </a-select>

            </a-form-item>
          </div>
          <div v-if="item.type=='radio'"><!--单选格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >
              <a-radio-group :options="item.data" />

            </a-form-item>
          </div>
          <div v-if="item.type=='tree'"><!--树格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >
              <a-tree
                      checkable
                      @expand="onExpand"
                      :expandedKeys="expandedKeys"
                      :autoExpandParent="autoExpandParent"

                      v-model="checkedKeys"
                      @select="onSelect"
                      :selectedKeys="selectedKeys"
                      :treeData="treeData"
              />

            </a-form-item>
          </div>
        </div>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
        editcolumns: [],
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
      close () {
          this.$emit('close')
          this.visible = false
      },
    edit (formcolumns,record) {
      let  that=this
        this.editcolumns=formcolumns
        console.log(formcolumns)
        this.visible = true
        let para={}
        formcolumns.forEach((pane) => {
            Object.keys(record).forEach(function(key){
                if(key==pane.key){
                    console.log(pane.key)
                    that.$set(para, key,record[key])//根据生成属性设置对应的值
                }
            })
        })
        console.log(para)
        this.$nextTick(() => {
        this.form.setFieldsValue(
            para
        )})

    },
    handleSubmit () {
        const _this = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
            // 验证表单没错误

            if (!err) {
                    _this.$emit('ok',values)
                _this.close()
            }
        })
    },
    handleCancel () {
      this.visible = false
    }
  }
};
</script>
