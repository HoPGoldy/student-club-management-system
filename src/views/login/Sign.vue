<style lang="stylus" scoped>
.sign
    background-color #fff
    .el-button
        width 90%
</style>

<template lang="pug">
.sign
    el-form(ref='signForm' :rules="formRules" :model='signForm', label-width='80px')
        el-form-item(label='用户名' prop="username")
            el-input(v-model='signForm.username')
        el-form-item(label='密码' prop="password")
            el-input(v-model='signForm.password' type="password")
        el-form-item(label='重复密码' prop="passwordConfirm")
            el-input(v-model='signForm.passwordConfirm' type="password")
        el-form-item(label='性别' prop="sex")
            el-radio(v-model='signForm.sex', label='1') 男
            el-radio(v-model='signForm.sex', label='0') 女
        el-form-item(label='姓名' prop="name")
            el-input(v-model='signForm.name')
        el-form-item(label='电话' prop="phone")
            el-input(v-model='signForm.phone')
        el-form-item(label='邮箱' prop="email")
            el-input(v-model='signForm.email')
        el-button(type="primary" @click="onSign") 注册
</template>

<script>
export default {
    name: 'Sign',
    data: () => ({
        signForm: {
            username: '',
            password: '',
            passwordConfirm: '',
            sex: '',
            name: '',
            phone: '',
            email: ''
        },
        formRules: {
            username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            passwordConfirm: [{ required: true, message: '请重复密码', trigger: 'blur' }],
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        },
    }),
    methods: {
        onSign() {
            if (this.signForm.password === this.signForm.passwordConfirm) {
                this.submitSign()
            }
            else {
                this.$message.error('两次重复的密码不一致')
            }
        },
        submitSign() {
            this.$refs.signForm.validate((valid) => {
                if (valid) {
                    console.log(this.signForm)
                    this.$post('/v1/user/sign', this.signForm).then(resp => {
                        this.$message({
                            message: resp.data.msg,
                            type: resp.data.state ? 'success' : 'error'
                        })
                    })
                    this.$emit('submit-sign', true)
                }
            })
        }
    }
}
</script>
