<style lang="stylus" scoped>
.container
    height 100%
    width 100%
    background-image url('../../images/LoginBackground.jpg')
.login-box
    position fixed
    top calc(50% - 200px)
    left calc(50% - 175px)
    width 350px
    height 340px

    background-color rgba(255, 255, 255, 0.9)
    border 3px solid #888
    border-radius 10px
    padding 16px
    .title
        font-size 35px
        font-weight bolder
        margin 10px 0px 40px 0px
.el-form-item
    margin 20px 10px 20px 0px
.el-button
    width 80%
    margin 10px
</style>

<template lang="pug">
.container 
    .login-box
        .title 社团管理系统
        el-form(ref="loginForm" :model="loginData" :rules="formRules" label-width="80px")
            el-form-item(label="用户名" prop="username")
                el-input(v-model="loginData.username")
            el-form-item(label="密码" prop="password")
                el-input(v-model="loginData.password")
            el-button(type="primary" @click="onSubmit('loginForm')") 登入系统
            el-button(@click="onRegist") 注册用户
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        loginData: {
            username: '',
            password: ''
        },
        formRules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
        }
    }),
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log('提交信息', this.loginData)

                    // 暂定登陆成功
                    this.$router.push('/main/UserCenter')
                    document.cookie += 'token=123321'
                }
                else {
                    this.$message.warning('请正确填写信息')
                    
                }
            })
            
        },
        onRegist() {
            console.log('跳转至注册页面')
        }
    }
}
</script>
