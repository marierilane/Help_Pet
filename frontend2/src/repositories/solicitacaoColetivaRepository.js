import Repository from './Repository'

const resource = '/solicitacoes_coletivas'

export default {
    create(payload){
        return Repository.post(`${resource}`, payload)
    },

    findAllByUsuario(){
        return Repository.get(`${resource}` + '/listar')
    },

    delete(id){
        return Repository.delete(`${resource}/${id}`)
    },

    getSolicitacaoColetiva(idSolicitacaoColetiva) {
        return Repository.get(`${resource}/${idSolicitacaoColetiva}`)
    },

    avaliarSolicitacaoComplementarColetiva(id, avaliacao) {
        return Repository.put(`${resource}/avaliar/${id}`, avaliacao)
    },

    addParticipantes(id, estudantes) {
        estudantes.forEach(element => {
            console.log(element.usuario.nome)
        });
        return Repository.put(`${resource}/${id}/addParticipantes`, estudantes)
    },

    excluirParticipante(id, estudante) {
        return Repository.put(`${resource}/${id}/excluir-participante`, estudante);
    },

}