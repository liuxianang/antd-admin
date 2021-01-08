<template>
    <a-modal
            title="在线批改"
            :width="640"
            :visible="visible"
            :confirmLoading="confirmLoading"
            @ok="handleSubmit"
            @cancel="handleCancel"
    >
        <a-form :form="form">
            <div>
                <div style="text-align:center"><h2>第一套模拟试卷</h2><span>考生姓名：{{studentName}}</span></div>
                <div>
                    <a-card>
                        <a-timeline v-for="(item,index) in examitim" :key="item.index">
                            <a-timeline-item>
                                <a-card>
                                    <h3>第{{index+1}}题</h3>
                                    <h4>{{item.title}}</h4>
                                    <p>
                                        <a-radio-group v-model="item.answer" :disabled="disabled">
                                            <a-radio value="A">A.{{item.optionA}}</a-radio>
                                            <a-radio value="B">B.{{item.optionB}}</a-radio>
                                            <a-radio value="C">C.{{item.optionC}}</a-radio>
                                            <a-radio value="D">D.{{item.optionD}}</a-radio>
                                        </a-radio-group>
                                    </p>
                                </a-card>
                                <a-card>
                                    <h5><font color="green">正确答案：{{item.modeanswer}}</font><span style="float:right">

                                  <!-- <a-radio-group name="radioGroup" v-model="item.yorN" disabled="true" >

                                    <a-radio value="1">对</a-radio>
                                    <a-radio value="0">错</a-radio>
                                 </a-radio-group>-->
                                    <a-tag v-if="item.yorN==1" color="red"><a-icon type="check"/></a-tag>
                                    <a-tag v-if="item.yorN==0" color="blue"><a-icon type="close"/></a-tag>
                                    分数:  <a-input style="width: 100px" v-model="item.winscore" :disabled="disabled"/></span>
                                    </h5>
                                </a-card>
                            </a-timeline-item>
                        </a-timeline>

                        <a-timeline v-for="(item,index) in examitimtwo" :key="item.index">
                            <a-timeline-item>
                                <a-card>
                                    <h3>第{{index+1}}题</h3>
                                    <h4>{{item.title}}</h4>
                                    <p>
                                        <a-checkbox-group v-model="item.answerduo" :disabled="disabled">
                                            <a-checkbox value="A">A.{{item.optionA}}</a-checkbox>
                                            <a-checkbox value="B">B.{{item.optionB}}</a-checkbox>
                                            <a-checkbox value="C">C.{{item.optionC}}</a-checkbox>
                                            <a-checkbox value="D">D.{{item.optionD}}</a-checkbox>
                                        </a-checkbox-group>
                                    </p>
                                </a-card>
                                <a-card>
                                    <h5><font color="green">正确答案：{{item.modeanswer}}</font> <span style="float:right">
                                 <!--  <a-radio-group name="radioGroup" v-model="item.yorN" disabled="true" type="hidden">
                                    <a-radio value="1">对</a-radio>
                                    <a-radio value="0">错</a-radio>
                                </a-radio-group>-->
                                    <a-tag v-if="item.yorN==1" color="red"><a-icon type="check"/></a-tag>
                                    <a-tag v-if="item.yorN==0" color="blue"><a-icon type="close"/></a-tag>
                                    分数:  <a-input placeholder="" style="width: 100px" v-model="item.winscore" :disabled="disabled"/></span></h5>
                                </a-card>
                            </a-timeline-item>

                        </a-timeline>
                        <a-timeline v-for="(item,index) in examitimthree" :key="item.index">
                            <a-timeline-item>
                                <a-card>
                                    <h3>第{{index+1}}题</h3>
                                    <h4>{{item.title}}</h4>
                                    <p>
                                        <a-input
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder=""
                                                v-model="item.answer" :disabled="disabled">
                                        </a-input>
                                    </p>
                                </a-card>
                                <a-card>
                                    <h5><font color="green">正确答案：{{item.modeanswer}} </font><span style="float:right">
                                    <a-radio-group   name="radioGroup" v-model="item.yorN" :disabled="disabledmore">
                                    <a-radio value="1">对</a-radio>
                                    <a-radio value="0">错</a-radio>
                                </a-radio-group> <a-tag v-if="item.yorN==1" color="red"><a-icon type="check"/></a-tag>
                                    <a-tag v-if="item.yorN==0" color="blue"><a-icon type="close"/></a-tag>
                                    分数:  <a-input placeholder="" style="width: 100px" v-model="item.winscore" :disabled="disabledmore"/></span></h5>
                                </a-card>
                            </a-timeline-item>
                        </a-timeline>
                    </a-card>
                </div>
            </div>
        </a-form>
    </a-modal>
</template>

<script>

    import API from '../../api/api_exam'

    export default {

        data() {
            return {
                disabled:true,
                examitim: [],
                examitimtwo: [],
                examitimthree: [],
                visible: false,
                confirmLoading: false,
                disabledmore:false,
                studentName:"",
                okmethod: "",
                paperid: "",
                form: this.$form.createForm(this),
            }
        }, methods: {
            edit(formcolumns, record) {
                let that = this
                that.visible = true
                that.disabledmore=false
                that.paperid = record.id
                that.studentName=record.studentname
                API.getAnswerpaper({id: record.id}).then(res => {
                    if (res.code == 0) {
                        that.examitim = res.examitim
                        that.examitimtwo = res.examitimtwo
                        that.examitimthree = res.examitimthree
                    }
                })
            },
            read(formcolumns, record) {
                let that = this
                that.visible = true
                that.disabledmore=true
                that.paperid = record.id
                that.studentName=record.studentname
                API.getAnswerpaper({id: record.id}).then(res => {
                    if (res.code == 0) {
                        that.examitim = res.examitim
                        that.examitimtwo = res.examitimtwo
                        that.examitimthree = res.examitimthree
                    }
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
                        let isNO = true;
                        let Score1 = "";
                        let YorN1 = "";
                        this.examitim.forEach((item) => {
                            //遍历prodAllPrice这个字段，并累加
                            Score1 += item.winscore + ",";
                            YorN1 += item.yorN + ","
                        });
                        let Score2 = "";
                        let YorN2 = "";
                        this.examitimtwo.forEach((item) => {
                            //遍历prodAllPrice这个字段，并累加
                            Score2 += item.winscore + ",";
                            YorN2 += item.yorN + ","
                        });
                        let Score3 = "";
                        let YorN3 = "";
                        this.examitimthree.forEach((item) => {
                            //遍历prodAllPrice这个字段，并累加
                            if (item.winscore == null || item.winscore == "" || item.yorN == null) {
                                isNO = false
                            }
                            Score3 += item.winscore + ",";
                            YorN3 += item.yorN + ","
                        });
                        console.log(Score1)
                        if (isNO) {
                            if (this.okmethod == "add") {
                                params.menuIds = this.checkedKeys
                                API.add(params).then(function (res) {
                                    that.$emit('ok', values)
                                    that.$message.success(res.msg)
                                })
                            } else {
                                API.correct({
                                    id: this.paperid,
                                    Score1: Score1,
                                    Score2: Score2,
                                    Score3: Score3,
                                    YorN1: YorN1,
                                    YorN2: YorN2,
                                    YorN3: YorN3
                                }).then(function (res) {
                                    that.$emit('ok', values)
                                    that.$message.success(res.msg)
                                })
                            }
                        } else {
                            that.$message.success("有题目未打分请打分后提交")
                            this.visible = true
                        }
                    } else {
                        this.confirmLoading = false
                    }
                    that.$emit('ok')
                })
            },
            handleCancel() {
                this.visible = false
            }


        },

    }
</script>
