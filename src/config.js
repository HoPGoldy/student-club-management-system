export default {
    activityState: [{
        content: '审批中',
        type: 'warning'
    }, {
        content: '筹备中',
        type: 'success'
    }, {
        content: '进行中',
        type: ''
    }, {
        content: '已结束',
        type: 'info'
    }],
    servers: {
        mock: 'https://easy-mock.com/mock/5cadfead29a8d4218251754e/student-club-management-system',
        local: 'http://localhost:3000',
        productionHttp: 'http://39.96.47.189:3000',
        productionHttps: 'https://hopgoldy.cn:3031'
    },
    levelMap: {
        1: '普通用户',
        2: '社团管理员',
        3: '社联管理员'
    },
    // 社团随机图片共多少张
    maxPicNum: 7
}