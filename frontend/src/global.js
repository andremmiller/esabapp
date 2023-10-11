import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'http://10.4.20.37:3000'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}


// export function showError(e) {
//     if(e && e.response && e.response.data) {
//         Vue.toasted.global.defaultError({ msg : e.response.data })
//     } else if(typeof e === 'string') {
//         Vue.toasted.global.defaultError({ msg : e })
//     } else {
//         Vue.toasted.global.defaultError()
//     }
// }

export default { baseApiUrl, showError, userKey }