import Repository from './Repository'

const resource = '/solicitacoes_coletivas'

export default {
    create(payload){
        //return Repository.post(`${resource}`, payload);
        // const servidorId = payload.servidor;
        // delete payload.servidor;
        // return Repository.post(`${resource}/${servidorId}`, payload);

        return Repository.post(`${resource}`, payload);
    },

    get(idSolicitacaoColetiva) {
        return Repository.get(`${resource}/${idSolicitacaoColetiva}`)
    },

    addParticipantes(id, estudantes) {
        estudantes.forEach(element => {
            console.log(element.usuario.nome)
        });
        return Repository.put(`${resource}/${id}/addParticipantes`, estudantes)
        },
    assinar(id, senha){
        return Repository.put(`${resource}/assinar/${id}`, senha)
    },

    excluirParticipante(id, estudante) {
        return Repository.put(`${resource}/${id}/excluir-participante`, estudante);
    },

    atualizarAtividadeComplementarColetiva(id, solicitacao) {
        return Repository.put(`${resource}/${id}`, solicitacao);
    },

}