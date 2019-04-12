<style lang="stylus" scoped>
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
.club-list
    width 60%
    .club
        text-align left
        .title
            margin-bottom 16px
            font-size 24px
            font-weight bolder
        .enter
            float right
            margin 5px 16px
            font-size 16px
            cursor pointer
        .introduce
            font-size 16px
        .member-num
            font-size 16px
            font-weight bolder
</style>

<template lang="pug">
.container
    .header
        span.title 社团列表
        span 挑选自己喜欢的社团并加入他！
    .club-list
        el-collapse(v-model="activeNames" accordion)
            el-collapse-item(v-for="clubItem, index in clubDatas" :title="clubItem.name" :name="index")
                .club
                    div
                        span.title {{clubItem.name}}
                        el-button.enter(size="small" @click="enterClub(clubItem.id)") 点此进入社团详情页 >
                    .introduce {{clubItem.introduce}}
                    div
                        span 社团人数 
                        span.member-num {{clubItem.memberNum}}
</template>

<script>
export default {
    name: 'ClubList',
    data: () => ({
        activeNames: [],
        clubDatas: []
    }),
    methods: {
        enterClub(clubId) {
            console.log('访问社团', clubId)
            this.$router.push(`/main/ClubPage/${clubId}`)
        }
    },
    mounted() {
        this.$get('/v1/club/getList').then(resp => {
            this.clubDatas = resp.data.data
            this.clubDatas.map((item, index) => {
                if (this.activeNames.length < 3) {
                    this.activeNames.push(index)
                }
            })
        })
    }
}
</script>
