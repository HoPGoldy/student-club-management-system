
<style scoped lang="stylus">
.container
    display flex
    flex-direction column
    align-items center
    .header
        width 60%
        display flex
        flex-flow row nowrap
        align-items center
        justify-content space-between
        padding-bottom 16px
        border-bottom 2px solid #888
        .title
            font-size 24px
            font-weight bolder
    .content
        padding 32px
        width 60%
        text-align left
</style>

<template lang="pug">
.container
    .header
        span.title 个人信息修改
    .content
        el-form(ref='userInfoForm' :rules="rules" :model='userInfoForm', label-width='80px')
            el-form-item(label='密码' prop="password")
                el-input(v-model='userInfoForm.password' type="password")
            el-form-item(label='姓名' prop="name")
                el-input(v-model='userInfoForm.name')
            el-form-item(label='性别' prop="sex")
                el-radio(v-model='userInfoForm.sex', :label='1') 男
                el-radio(v-model='userInfoForm.sex', :label='0') 女
            el-form-item(label='电话' prop="phone")
                el-input(v-model='userInfoForm.phone')
            el-form-item(label='邮箱' prop="email")
                el-input(v-model='userInfoForm.email')
        el-row(style="margin-top:32px")
            el-button(style="width:49%;" type='primary', @click='onSubmit') 修改个人信息
            el-button(style="width:49%;" @click="cancelSubmit") 放弃修改
</template>

<script>
export default {
    name: 'UserSetting',
    data() {
        return {
            userInfoForm: {
                password: '',
                sex: '',
                name: '',
                phone: '',
                email: '',
                userId: null
            },
            rules: {
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
            }
        }
    },
    methods: {
        onSubmit() {
            this.userInfoForm.userId = this.session.token
            this.$post('/v1/user/updatePersonlInfo', this.userInfoForm).then(resp => {
                this.$message({
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
            })
            
            this.$router.back()
        },
        cancelSubmit() {
            this.$confirm('确认放弃？所有未保存的内容都将被丢弃').then(() => {
                this.$router.back()
            })
        },
        fetch() {
            this.$get('/v1/user/getPersonlInfo', {
                    userId: this.session.token
            }).then(resp => {
                // console.log(resp)
                this.userInfoForm = resp.data
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
