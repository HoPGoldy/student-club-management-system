import { getCookie, $get } from './api.js'
import router from './router.js'
import { reject } from 'when';

export const session$ = {
    token: '',
    permission: {}
}

export const checkSession = function() {
    return new Promise(resolve => {
        let token = getCookie('token')
        if (token === '') {
            router.push('/login')
        }
        else {
            Object.assign(session$, { token })

            $get('/v1/user/getLevel', {
                userId: token
            }).then(resp => {
                if ('state' in resp.data && resp.data.state == false) {
                    reject('获取用户权限失败')
                }
                else {
                    session$.permission = resp.data
                    resolve()
                }
            })
        }
    })
}

export default {
    data() {
        return {
            session: session$
        }
    }
}