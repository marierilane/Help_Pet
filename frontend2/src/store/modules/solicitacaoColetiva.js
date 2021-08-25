import router from "../../router";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import store from "../../store";

let solicitacaoColetivaRepository

const state = {
    solicitacoes_coletivas:[],
    solicitacao_coletiva: {
        cursos: [
            {
                nome: null,
            },
        ],
        servidor: {
            usuario: {},
        },
        estudantes: [],
    },
}

const mutations = {
    SET_SOLICITACOES_COLETIVAS: (state, solicitacoes_coletivas) => {
        state.solicitacoes_coletivas = solicitacoes_coletivas;
    },

    SET_SOLICITACAO_COLETIVA: (state, solicitacao_coletiva) => {
        state.solicitacao_coletiva = solicitacao_coletiva;
    },

    DELETE_SOLICITACAO_COLETIVA: (state, id) => {
        let solicitacoes_coletivas = state.solicitacoes_coletivas.filter(s => s.id != id);
        state.solicitacoes_coletivas = solicitacoes_coletivas;
    },

    AVALIAR_SOL_COL: (state, solicitacoes_coletivas) => {
        state.solicitacoes_coletivas = solicitacoes_coletivas;
    },

    GET_SOLICITACAO_COLETIVA: (state, solicitacoes_coletivas) => {
        state.solicitacoes_coletivas = solicitacoes_coletivas
    },
}

const actions = {
    findAllByUsuario({commit}) {
        solicitacaoColetivaRepository = RepositoryFactory.get("solicitacaoColetiva");
        solicitacaoColetivaRepository.findAllByUsuario()
            .then((res) => {
                commit('SET_SOLICITACOES_COLETIVAS', res.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter solicitações!",
                }
                // router.go(-1);
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    getSolicitacao({commit}, idSolicitacao){
        solicitacaoColetivaRepository = RepositoryFactory.get("solicitacaoColetiva");
        solicitacaoColetivaRepository.getSolicitacaoColetiva(idSolicitacao)
            .then((res) => {
                commit('SET_SOLICITACAO_COLETIVA', res.data)
            })
            .catch((error) => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter solicitação! " + error.response.data.message,
                    // message: "Error! " + error.response.data.message,
                };
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    deleteSolicitacaoColetiva({commit}, id) {
        solicitacaoColetivaRepository = RepositoryFactory.get("solicitacaoColetiva");
        solicitacaoColetivaRepository.delete(id)
            .then(() =>{
                commit('DELETE_SOLICITACAO_COLETIVA', id);
                const notification = {
                    type: "success",
                    message: "Solicitação excluída com sucesso!",
                };
                store.dispatch('notification/add', notification, {root: true});
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao excluir solicitação!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    excluirParticipante({commit}, params) {
        solicitacaoColetivaRepository = RepositoryFactory.get("solicitacaoColetiva");
        solicitacaoColetivaRepository.excluirParticipante(params.id, params.estudante)
            .then((response) =>{
                commit('SET_SOLICITACAO_COLETIVA', response.data);
                const notification = {
                    type: "success",
                    message: "Exclusão realizada com sucesso!",
                };
                store.dispatch('notification/add', notification, {root: true});
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao realizar exclusão!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    avaliarSolCol({commit}, params) {
        solicitacaoColetivaRepository = RepositoryFactory.get("solicitacaoColetiva");
        solicitacaoColetivaRepository.avaliarSolicitacaoComplementarColetiva(params.id, params.avaliacao)
            .then(() =>{
                commit('AVALIAR_SOL_COL',params.id,params.avaliacao);
                const notification = {
                    type: "success",
                    message: "Solicitação avaliada com sucesso!",
                };
                store.dispatch('notification/add', notification, {root: true});
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao avaliar solicitação!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    AddParticipantes({commit}, params) {
        solicitacaoColetivaRepository = RepositoryFactory.get("solicitacaoColetiva");
        solicitacaoColetivaRepository.AddParticipantes(params.id, params.estudantes)
            .then((response) =>{
                commit('SET_SOLICITACAO_COLETIVA', response.data);
                const notification = {
                    type: "success",
                    message: "Participantes atualizados com sucesso!",
                };
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao atualizar participantes!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    getSolicitacaoColetiva({commit}, idSolicitacaoColetiva) {
        solicitacaoColetivaRepository = RepositoryFactory.get("solicitacaoColetiva");
        solicitacaoColetivaRepository.getSolicitacaoColetiva(idSolicitacaoColetiva)
            .then(res=>{
                commit('GET_SOLICITACAO_COLETIVA', res.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter solicitação!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },
}

const getters = {
    getAllByUsuario(){
        return state.solicitacoes_coletivas;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}