<style lang="stylus" scoped>
.container
    display flex
    flex-direction column
    align-items center
    .header
        width 70%
        display flex
        flex-flow row nowrap
        align-items center
        justify-content space-between
        padding-bottom 16px
        border-bottom 2px solid #888
        .money
            font-size 24px

    .content
        width 70%
</style>

<template lang="pug">
.container 
    .header
        .money
            span 当前社团经费剩余 
            span(style="font-weight:bolder;") ￥{{moneyValue}}
        .opreation(v-if="!clubId")
            el-button(type="success" @click="setDialog(true)") 收入
            el-button(type="warning" @click="setDialog(false)") 支出
    .content
        el-table(:data="financeData")
            el-table-column(prop="value" label="金额")
            el-table-column(prop="type" label="类型")
            el-table-column(prop="date" label="日期")
            el-table-column(prop="info" label="用途")
    el-dialog(:title="moneyForm.title" :visible.sync="moneyFormVisable" width="30%" )
        el-form(:rules="rules" :model='moneyForm', label-width='80px' style="text-align:left;")
            el-form-item(label='金额' prop="value")
                el-input-number(v-model="moneyForm.value" :min="1")
            el-form-item(label='说明' prop="introduce")
                el-input(type="textarea" :autosize="{ minRows: 1, maxRows: 10}" v-model='moneyForm.introduce')
        el-button(style="width:48%;" type='primary', @click='onSubmit') 确定
</template>

<script>
export default {
    name: 'Finance',
    data: () => ({
        financeData: [],
        moneyValue: 0,
        moneyForm: {
            title: '',
            value: 0,
            introduce: ''
        },
        clubId: undefined,
        moneyFormVisable: false,
        showOperation: true,
        isIncome: true,
        rules: {
            value: [{ required: true, message: '请输入金额', trigger: 'blur' }],
            introduce: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
        },
    }),
    methods: {
        setDialog(isIncome) {
            this.moneyFormVisable = !this.moneyFormVisable
            this.isIncome = isIncome
            this.$set(this.moneyForm, 'title', isIncome ? '收入' : '支出')
        },
        onSubmit() {
            this.$confirm('确认提交？').then(resp => {
                let postData = {
                    value: this.moneyForm.value,
                    mode: this.isIncome ? 'add' : 'reduce',
                    introduce: this.moneyForm.introduce,
                    clubId: this.session.permission.clubId
                }
                this.$post('/v1/finance/newDeal', postData).then(resp => {
                    this.$message({
                        type: resp.data.state ? 'success' : 'error',
                        message: resp.data.msg,
                        showClose: true
                    })
                    this.fetch()
                })
                this.moneyFormVisable = false
            })
        },
        fetch() {
            this.$get('/v1/club/getFinanceById', {
                    clubId: this.clubId || this.session.permission.clubId
            }).then(resp => {
                this.financeData = resp.data
            })
            this.$get('/v1/club/getInfoById', {
                    clubId: this.clubId || this.session.permission.clubId
            }).then(resp => {
                this.moneyValue = resp.data.money

                if (this.moneyValue < 0 && !this.clubId) {
                    this.$alert('社团剩余经费不足，请注意保持收支平衡', '经费不足', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    })
                }
            })
        }
    },
    mounted() {
        this.clubId = this.$route.query.clubId
        this.fetch()
    }
}
</script>
