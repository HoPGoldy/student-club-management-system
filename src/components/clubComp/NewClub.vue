
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
        span.title 新建社团
    .content
        el-form(ref='newClubForm' :rules="rules" :model='form', label-width='80px')
            el-form-item(label='社团名称' prop="clubName")
                el-input(v-model='form.clubName')
            el-form-item(label='社团介绍' prop="introduce")
                el-input(type="textarea" v-model='form.introduce' :autosize="{ minRows: 5, maxRows: 10}")
        el-button(style="width:49%;" type='primary', @click='submitConfirm') 提交新社团申请！
        el-button(style="width:49%;" @click="cancelSubmit") 取消
    el-dialog(title="新社团申请书" :visible.sync="confrimVisable")
        div 在提交请求后，社联管理员将会审核你提交的信息，在确认无误后，您的社团将被建立，而您将会被自动分配为该社团的管理员，接下是您作为负责人将要管理的内容
        br
        li 1. 社团建立后，您应该及时的填写该社团的规章制度
        li 2. 您将会负责新活动的管理以及新消息的推送
        li 3. 您应该及时处理同学的加入社团和退出社团请求
        br
        div 你确认要提交新社团申请么？
        el-row(style="margin-top:32px")
            el-button(style="width:49%;" type='primary', @click='onSubmit') 我确定
            el-button(style="width:49%;" @click="cancelSubmit") 再想想
</template>

<script>
export default {
    name: 'NewClub',
    data() {
        return {
            form: {
                clubName: '',
                introduce: '',
            },
            rules: {
                clubName: [{ required: true, message: '请输入社团名称', trigger: 'blur' }],
                introduce: [{ required: true, message: '请输入社团简介', trigger: 'blur' }],
            },
            confrimVisable: false
        }
    },
    methods: {
        submitConfirm() {
            this.$refs.newClubForm.validate((valid) => {
                if (valid) {
                    this.confrimVisable = !this.confrimVisable
                }
            })
        },
        onSubmit() {
            let postData = {
                organizerId: this.session.token,
                clubName: this.form.clubName,
                introduce: this.form.introduce,
            }
            this.$post('/v1/federation/sendNewClubApply', postData).then(resp => {
                this.$message({
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
            })
            
            this.$router.back()
        },
        cancelSubmit() {
            this.$confirm('确认放弃？所有内容将被丢弃').then(() => {
                this.$router.back()
            })
        },
        fetch() {
            this.$get('/v1/club/getMemberById', {
                    clubId: this.session.permission.clubId
            }).then(resp => {
                this.clubMember = resp.data
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
