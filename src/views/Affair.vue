<style lang="stylus" scoped>
.container
    display flex
    flex-direction column
    align-items center
.func-list
    width 50%
    display flex
    flex-flow column wrap
    justify-content center
    align-items center
    .func
        width 100%
        border 1px solid #e6e6e6
        margin 16px
        .clearfix
            text-align left
        .el-button
            heigth 35px
            line-height 35px
.regulation-input
    margin 8px
    width 90%
.title
    font-size 24px
    font-weight bolder
    padding-bottom 16px
</style>

<template lang="pug">
.container 
    .func-list
        el-card.func(class="box-card" shadow="hover")
            .clearfix(slot="header")
                span.title {{funcList[0].title}}
                el-button(style="float: right; padding: 3px 0" type="text" @click="editData(0)") 修改
            .func-content()
                div(v-for="line in funcList[0].data") {{line}}
        // el-card.func(class="box-card" shadow="hover")
        //     .clearfix(slot="header")
        //         span.title {{funcList[1].title}}
        //         el-button(style="float: right; padding: 3px 0" type="text" @click="editData(1)") 修改
        //     .func-content()
        //         div(v-for="line in funcList[1].data") {{line[0]}} - {{line[1]}}
        send-message
        join-club
        exit-club
    el-dialog(title="规章制度编辑" :visible.sync="visibles[0]")
        el-input.regulation-input(v-for="line, index in funcList[0].data" type="textarea" v-model="funcList[0].data[index]" autosize)
        el-button(type="primary" @click="submitRegulation") 提交
    // el-dialog(title="人员安排编辑" :visible.sync="visibles[1]")
    //     el-form(label-width="120px")
    //         el-form-item(v-for="line, index in funcList[1].data" :label="line[0]")
    //             el-input(v-model="funcList[1].data[index][1]")
    //         el-form-item(label-width="0px")
    //             el-button(type="primary" @click="submitPeople") 提交
</template>

<script>
import SendMessage from '@/components/clubComp/SendMessage'
import JoinClub from '@/components/clubComp/JoinClub'
import ExitClub from '@/components/clubComp/ExitClub'
export default {
    name: 'Affair',
    data: () => ({
        funcList: [
            {
                title: '规章制度',
                getPath: '/v1/club/getRegulationById',
                data: []
            },
            // {
            //     title: '人员安排',
            //     getPath: '/v1/club/getPeopleById',
            //     data: []
            // }
        ],
        // 是否展示编辑页面 第一个是规章制度 第二个是人员安排
        visibles: [ false, false ],
    }),
    components: { SendMessage, JoinClub, ExitClub }, 
    methods: {
        editData(funcIndex) {
            this.$set(this.visibles, funcIndex, !this.visibles[funcIndex])
        },
        submitRegulation() {
        //     console.log('提交', this.session.permission.clubId, this.funcList[0].data)
            
            this.$post('/v1/club/setRegulation', {
                clubId: this.session.permission.clubId,
                regulation: JSON.stringify(this.funcList[0].data)
            }).then(resp => {
                this.$message({
                    showClose: true,
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
            })
            this.$set(this.visibles, 0, false)
        },
        submitPeople() {
            // console.log('提交', this.funcList[1].data)
            this.$set(this.visibles, 1, false)
        },
        fetch() {
            this.funcList.map((item, index) => {
                this.$get(item.getPath, {
                    clubId: this.session.permission.clubId
                }).then(resp => {
                    // console.log(resp)
                    this.funcList[index].data = resp.data
                })
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
