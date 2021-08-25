import Repository from './Repository'
const resource = '/solicitacoes'

export default {
    getByAutenticacao() {
        return Repository.get(`${resource}/solicitacoes`);
    },

    create(solicitacoes) {
        return Repository.post(`${resource}`, solicitacoes)
    },
}
