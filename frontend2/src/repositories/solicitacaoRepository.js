import Repository from './Repository'

const resource = '/solicitacoes'

export default {
    create(payload){
        return Repository.post(`${resource}`, payload);
    },
    getSolicitacao(id){
        return Repository.get(`${resource}/${id}`);
    },
    
    updateSolicitacao(id, solicitcao){
        return Repository.put(`${resource}/${id}`, solicitcao);
    },

    analisarAtividade(idSolicitacao, idAtividade, status){
        return Repository.put(`${resource}/${idSolicitacao}/atividades/${idAtividade}`, status);
    },

    findAllByEstudante(){
        return Repository.get(`${resource}` + '/estudante');
    },

    delete(id){
        return Repository.delete(`${resource}/${id}`);
    }
}