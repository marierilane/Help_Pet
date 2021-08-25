import Repository from './Repository'

const resource = '/servidores'

export default {
    create(payload) {
        return Repository.post(`${resource}`, payload)
    },
    eServidor() {
        return Repository.get(`/solicitacoes_coletivas`)
    },
    getServidores() {
        return Repository.get(`${resource}_responsaveis`)
    },
    usuarioServidor() {
        return Repository.get(`/usuarioServidor`)
    },
    getAll() {
        return Repository.get(`${resource}`);
    },
}