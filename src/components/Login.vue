<template>
    <div class="div-login">
        <div class="div-header">
            <h2>后台系统登录</h2>
        </div>
        <div v-if="loginResult.code" class="div-info">
            <el-alert :title="loginResult.msg" :type="loginResult.code==200?'success':'error'" show-icon :closable="false">
            </el-alert>
        </div>
        <el-form :model='ruleLogin' :rules='rulesLogin' ref="loginForm" class="login-form">
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleLogin.username" auto-complete="off">
                    <template slot="prepend"><i class="iconfont icon-people icon24"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleLogin.password" auto-complete="off">
                    <template slot="prepend"><i class="iconfont icon-lock icon24"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="checkcode">
                <el-input type="text" :maxlength="5"  v-model="ruleLogin.checkcode" auto-complete="off">
                    <template slot="prepend">验证</template>
                    <template  slot="append"><img  id="captchaImg" @click="refreshImg" style="display:block;" :src="imgSrc"></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'systemLogin',
    data() {
        let validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('用户名不为空！'));
            }
            callback();
        };
        let validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不为空！'));
            }
            callback();
        };
        let validateCheckcode = (rule, value, callback) => {
            if (value === '' || value.length != 5) {
                callback(new Error('验证码错误！'));
            }
            callback();
        };
        return {
            loginResult: {
                code: '',
                msg: '',
                data:null
            },
            ruleLogin: {
                username: '',
                password: '',
                checkcode: ''
            },
            rulesLogin: {
                username: [{ validator: validateUsername, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }],
                checkcode: [{ validator: validateCheckcode, trigger: 'blur' }]
            },
            imgSrc: 'http://localhost/images/kaptcha.jpg',
            control:  false,
            errorCount:0
           
        }


    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post('/system/login',this.ruleLogin).then((res)=>{
                        this.resetResult();
                        this.loginResult = res.data;
                        switch(this.loginResult.code){
                            case "200":
                                //登陆成功操作
                                this.errorCount=0;
                                break;
                            case "412":
                            case "420":
                                ++this.errorCount;
                                if(this.errorCount>0&&this.errorCount%3==0){
                                    this.refreshImg();
                                }
                                break;
                            default:
                                break;

                        }
                    }).catch((err)=>{
                        console.log(err);
                        this.resetResult();
                        this.loginResult.code=500;
                        this.loginResult.msg="网络请求发生错误，请刷新后重试。";
                    });

                } else {
                    //不提交
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.loginResult.code = '';
            this.$refs[formName].resetFields();
        },
        refreshImg(){
            if(this.control){
                clearTimeout(this.control);
            }
            this.control = setTimeout(()=>{
                this.imgSrc = this.imgSrc.split('?')[0]+'?t='+new Date().getTime();
            },500);       
        },resetResult(){
            this.loginResult={
                code: '',
                msg: '',
                data:null
            }
        }
    },
    mounted:function(){
        let pnode=document.getElementById("captchaImg").parentNode;
        pnode.style.paddingLeft = pnode.style.paddingRight=0;
    },
    components:{

    }

}
</script>
<style scoped>

.div-login {
    width: 300px;
    height: 380px;
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px;
    border: solid 1px #58B7FF;
    font-weight: bold;
}

.div-info {
    margin-bottom: 10px;
}
</style>
