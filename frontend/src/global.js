import Vue from 'vue'

export const userKey = '__knowledge_user'
//export const baseApiUrl = 'http://' + process.env.VUE_APP_BASE_API_HOST + ':3000' // nao vai funcionar; variavel de ambiente é setada no servidor
//export const baseApiUrl = 'http://localhost:3000' //casa
//export const baseApiUrl = 'http://esabapp_backend:3000' //docker nao vai funcionar, requisicao sai do browser de quem esta acessando. Deve ser um endereço acessível (localhost??)
export const baseApiUrl = 'http://localhost:3000'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }