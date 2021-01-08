<template><div>
    <a-layout-header></a-layout-header>
    <a-layout-content> <div class="login-container">
        <a-form
                id="formLogin"
                class="user-layout-login"
                ref="formLogin"
                :form="form">
            <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
            <a-form-item>
                <a-input
                        size="large"
                        type="text"
                        placeholder="账户: admin"
                        v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }], validateTrigger: 'change'}
              ]"
                >
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                        size="large"
                        type="password"
                        autocomplete="false"
                        placeholder="密码: 123456"
                        v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
                >
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
            </a-form-item>

                <div class="form-group" style="display: flex;" v-show="isShow">
                                         <div>
                                             <input type="text" id="code" v-model="code" class="code"  placeholder="请输入您的验证码" />
                                        </div>
                                      <div class="login-code" @click="refreshCode">
                                <!--验证码组件-->
                                 <s-identify :identify-code="identifyCode"></s-identify>
                                 </div>
                 </div>

        </a-form>
        <a-form-item>
            <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
            <router-link
                    :to="{ name: 'recover', params: { user: 'aaa'} }"
                    class="forge-password"
                    style="float: right;"
            >忘记密码</router-link>
        </a-form-item>
        <a-form-item style="margin-top:24px">
            <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                    @click.native.prevent="handleLogin"
            >确定</a-button>
        </a-form-item>
    </div></a-layout-content>
    <a-layout-footer></a-layout-footer>
</div>
</template>

<script>
    import API from "../../api/api_user";
    import SIdentify from '@/components/VerCode/sidentify'


    export default {
        components: { SIdentify },
        data () {
            return {
                identifyCodes: "1234567890",
                identifyCode: "",
                code:"",//text框输入的验证码
                isShow:false,//验证码功能开关
                isLoginError : false,
                form: this.$form.createForm(this), // 只有这样注册后，才能通过表单拉取数据
                state: {
                    time: 60,
                    loginBtn: false,
                }
            }
        },
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },

            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                console.log(this.identifyCode);
            },
            handleLogin(){
                let that = this;
                this.state.loginBtn = true
                if(that.code==that.identifyCode||!that.isShow){
                this.form.validateFields((err, values) => {
                    API.login({username: values.username, pwd:values.password })
                        .then(response => {
                            if (response && response.code === 0) {
                                localStorage.setItem("user", JSON.stringify(response.user)),
                                localStorage.setItem("access-token", response.token),
                                    localStorage.setItem("menus", JSON.stringify(response.router)),
                                    localStorage.setItem("perms", JSON.stringify(response.perms)),
                                    that.$router.push({path: "/main"})
                                setTimeout(() => {
                                    this.$notification.success({
                                        message: '欢迎',
                                        description: `欢迎回来`
                                    })
                                }, 1000)
                            } else {
                                this.isLoginError=true
                                that.$notification.open({
                                    message: '错误',
                                    description:
                                        '用户名或密码错误',
                                    icon:<a-icon type="close-circle" style="color: #ff0000"/>,
                                });
                            }
                        })
                        .finally(() => {
                            setTimeout(() => {this.state.loginBtn = false},500)
                        })
                    if (err) {
                        // 这里做逻辑处理
                        setTimeout(() => {
                            this.state.loginBtn = false
                        }, 1000)
                    }
                });
            }else{
                    this.$notification.success({
                        message: '验证码',
                        description: `验证码错误`
                    })
                    setTimeout(() => {
                        this.state.loginBtn = false
                    }, 1000)

                }
            }
        },
        mounted(){
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },

}
</script>
<style lang="less" scoped>

    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;

        position: relative;
        margin: 160px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
        background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
        background: -webkit-gradient(
                linear,
                0% 0%,
                0% 100%,
                from(#ace),
                to(#00c1de)
        ); /*谷歌*/
        background: -webkit-linear-gradient(
                top,
                #ace,
                #00c1de,

        ); /*Safari5.1 Chrome 10+*/
        background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
        button.login-button {
            padding: 0 15px;
            font-size: 16px;
            height: 40px;
            width: 100%;
        }
    }

    .ant-layout-footer,
    .ant-layout-header {
        background: #f0f2f5;
        color: #fff;

    }
    .ant-layout-content{
        background: #f0f2f5;
        color: #fff;
        background-image: url(../../assets/background.svg);
    }

    .code{
        width:124px;
         height:31px;
        border:1px solid rgba(186,186,186,1);
                 }
    .login-code{
        cursor: pointer;
                   }
</style>
