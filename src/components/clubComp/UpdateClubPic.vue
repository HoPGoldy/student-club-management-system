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
            span.title 首页宣传图配置
        .func-content()
            el-upload.upload-demo(action='https://jsonplaceholder.typicode.com/posts/', :on-preview='handlePreview', :on-remove='handleRemove', drag :file-list='fileList', list-type='picture')
                i.el-icon-upload
                .el-upload__text 将文件拖到此处，或
                    em 点击上传
                .el-upload__tip(slot='tip') 只能上传jpg/png文件，且不超过500kb
</template>

<script>
export default {
    name: 'UpdateClubPic',
    data: () => ({
        joinApplyDatas: []
    }),
    methods: {
        fetch() {
            this.$get('/v1/club/getJoinApplyById', {
                clubId: this.session.permission.clubId
            }).then(resp => {
                // console.log(resp)
                this.joinApplyDatas = resp.data
            })
        },
        dealApply(memberId, opinion) {
            this.$post('/v1/club/dealJoinApply', {
                memberId: memberId,
                clubId: this.session.permission.clubId,
                opinion: opinion
            }).then(resp => {
                this.$message({
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
                this.fetch()
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
