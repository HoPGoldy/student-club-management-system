<style lang="stylus" scoped>
.container
    width 100%
.func
    width 100%
    border 1px solid #e6e6e6
    margin 16px
    .clearfix
        text-align left
        .title
            font-size 24px
            font-weight bolder
            padding-bottom 16px
    .el-button
        heigth 35px
        line-height 35px
</style>

<template lang="pug">
.container
    el-card.func(class="box-card" shadow="hover")
        .clearfix(slot="header")
            span.title 推送通知
            el-button(style="float: right; width:80px; padding: 3px" type="primary" size="medium" @click="sendMessage()") 提交
        .func-content(style="text-align:left")
            el-form(ref='newMessageForm' :rules="rules" :model='newMessageForm', label-width='80px')
                el-form-item(label='通知名称' prop="title")
                    el-input(v-model='newMessageForm.title')
                el-form-item(label='通知内容' prop="content")
                    el-input(type="textarea" :autosize="{ minRows: 3, maxRows: 10}" v-model='newMessageForm.content')
                el-form-item(label='推送成员' prop="member")
                    el-transfer(v-model='newMessageForm.member' :data='clubMember' :titles="['未推送人员', '推送人员']")
</template>

<script>
export default {
    name: 'SendMessage',
    data: () => ({
        newMessageForm: {
            title: '',
            content: '',
            member: []
        },
        rules: {
            name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
            content: [{ required: true, message: '请输入活动说明', trigger: 'blur' }],
            member: [{ required: true, message: '请选择要推送的人员', trigger: 'blur' }]
        },
        clubMember: []
    }),
    methods: {
        sendMessage() {
            this.$refs.newMessageForm.validate((valid) => {
                if (valid) {
                    console.log(this.newMessageForm)
                    this.$confirm('确认推送新通知').then(resp => {
                        let postData = JSON.parse(JSON.stringify(this.newMessageForm))
                        postData.clubId = this.session.permission.clubId
                        postData.authorId = this.session.token
                        postData.member = JSON.stringify(this.newMessageForm.member)

                        this.$post('/v1/new/sendMessage', postData).then(resp => {
                            this.$message({
                                message: resp.data.msg,
                                type: resp.data.state ? 'success' : 'error',
                                showClose: true
                            })
                        })
                    })
                }
            })
        },

        fetch() {
            // console.log(this.session.permission.clubId)
            this.$get('/v1/club/getMemberById', {
                clubId: this.session.permission.clubId
            }).then(resp => {
                // console.log(resp)
                this.clubMember = resp.data
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
