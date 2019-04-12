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
        span.title 新建活动
    .content
        el-form(ref='newActivityForm' :rules="rules" :model='form', label-width='80px')
            el-form-item(label='活动名称' prop="name")
                el-input(v-model='form.name')
            el-form-item(label='活动地点' prop="place")
                el-input(v-model='form.place')
            el-form-item(label='活动简介' prop="introduce")
                el-input(v-model='form.introduce')
            el-form-item(label='活动说明' prop="content")
                el-input(type="textarea" :autosize="{ minRows: 3, maxRows: 10}" v-model='form.content')
            el-form-item(label='活动时间' prop="date")
                el-date-picker(v-model='form.date' type='daterange' align='right' unlink-panels='' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期')
            el-form-item(label='参与成员' prop="member")
                el-transfer(v-model='form.member' :data='clubMember' :titles="['未参加人员', '参加人员']")
        el-button(style="width:48%;" type='primary', @click='onSubmit') 立即创建
        el-button(style="width:48%;" @click="cancelSubmit") 取消

</template>

<script>
export default {
    name: 'NewActivity',
    data() {
        return {
            form: {
                name: '',
                place: '',
                introduce: '',
                content: '',
                date: '',
                member: []
            },
            rules: {
                name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                place: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
                introduce: [{ required: true, message: '请输入活动简介', trigger: 'blur' }],
                content: [{ required: true, message: '请输入活动说明', trigger: 'blur' }],
                date: [{ required: true, message: '请选择活动日期', trigger: 'blur' }],
                member: [{ required: true, message: '请输入参加人员', trigger: 'blur' }]
            },
            clubMember: []
        }
    },
    methods: {
        onSubmit() {
            this.$confirm('确认提交？该申请将提交至社联审核，您可在活动详情页中查看审核状态').then(() => {
                console.log('提交', this.form)
                this.$router.back()
            })
        },
        cancelSubmit() {
            this.$confirm('确认放弃？所有内容将被丢弃').then(() => {
                this.$router.back()
            })
        },
        fetch() {
            this.$get('/v1/club/getMemberById').then(resp => {
                this.clubMember = resp.data.data
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
