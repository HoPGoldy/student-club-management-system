import { getCookie } from './api.js'
import router from './router.js'

export const session$ = {
    token: ''
}

export const checkSession = function() {
    return new Promise(resolve => {
        let token = getCookie('token')
        if (token === '') {
            router.push('/login')
        }
        else {
            Object.assign(session$, { token })
        }

        resolve()
    })
}

export default {
    data() {
        return {
            session: session$
        }
    }
}