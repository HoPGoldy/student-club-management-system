import Vue from 'vue'
import router from './router.js'
import config from './config.js'
import Qs from 'qs'

const axios = require('axios')

export let getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

axios.interceptors.request.use(axiosConfig => {
    if(getCookie('token')  === ''){
        console.log('需要登陆')
        router.push('/login')
    }

    return axiosConfig
})

export const $get = (path, params = {}, server='productionHttps') => {
    let url = /http/.test(path) ? path : config.servers[server] + path
    return axios({ url, params, method: 'get' })
}

export const $post = (path, data = {}, server='productionHttps') => {
    data = Qs.stringify(data)
    let url = /http/.test(path) ? path : config.servers[server] + path
    return axios({ url, data, method: 'post' })
}

export const $delete = (path, data = {}, server='productionHttps') => {
    let url = /http/.test(path) ? path : config.servers[server] + path
    return axios({ url, data, method: 'delete' })
}

Vue.use({
    install(Vue) {
        Vue.prototype.$get = $get
        Vue.prototype.$post = $post
        Vue.prototype.$delete = $delete
    }
})