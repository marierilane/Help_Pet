import router from "../../router";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import store from "../../store";

let solicitacaoRepository

const state = {
    solicitacoes: [],
    solicitacao: {
        atividades: [],
        estudante: {
            usuario: {},
        },
        curso: [],
    },
    defaultItem: {
        id: "",
        descricao: "",
        tipoAtividade: "",
        horasReais: 0,
        horasConvertidas: 0,
        arquivo: {
            nome: null,
            formato: null,
            conteudo: null,
        },
        statusAtividade: "",
    },
}

const mutations = {
    SET_SOLICITACOES: (state, solicitacoes) => {
        state.solicitacoes = solicitacoes;
    },

    SET_SOLICITACAO: (state, solicitacao) => {
        state.solicitacao = solicitacao;
    },

    DELETE_SOLICITACAO: (state, id) => {
        let solicitacoes = state.solicitacoes.filter(s => s.id != id);
        state.solicitacoes = solicitacoes;
    },
}

const actions = {
    createSolicitacao({commit}, param) {
        solicitacaoRepository = RepositoryFactory.get("solicitacao");
        solicitacaoRepository.create(param)
            .then((response) => {
                commit('SET_SOLICITACAO', response.data);
                const notification = {
                    type: "success",
                    message: "Solicitação criada com sucesso!",
                };
                router.push("/solicitacoes/estudante");
                store.dispatch('notification/add', notification, { root: true });
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao criar solicitação!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    findAllByEstudante({ commit }) {
        solicitacaoRepository = RepositoryFactory.get("solicitacao");
        solicitacaoRepository.findAllByEstudante()
            .then((res) => {
                commit('SET_SOLICITACOES', res.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter solicitações!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    getSolicitacao({ commit }, id) {
        solicitacaoRepository = RepositoryFactory.get("solicitacao");
        solicitacaoRepository.getSolicitacao(id)
            .then((res) => {
                commit('SET_SOLICITACAO', res.data);
            })
            .catch((error) => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter solicitações! " + error.response.data.message,
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    deleteSolicitacao({ commit }, id) {
        solicitacaoRepository = RepositoryFactory.get("solicitacao");
        solicitacaoRepository.delete(id)
            .then(() => {
                commit('DELETE_SOLICITACAO', id);
                const notification = {
                    type: "success",
                    message: "Solicitação excluída com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao excluir solicitação!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    analisarAtividade({commit}, param) {
        solicitacaoRepository = RepositoryFactory.get("solicitacao");
        solicitacaoRepository.analisarAtividade(param.id, param.idAtividade, param.status)
            .then((response) => {
                commit('SET_SOLICITACAO', response.data);
                const notification = {
                    type: "success",
                    message: "Solicitação analisada com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao analisar solicitação!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    updateSolicitacao({commit, state}) {
        solicitacaoRepository = RepositoryFactory.get("solicitacao");
        solicitacaoRepository.updateSolicitacao(state.solicitacao)
            .then((response) => {
                commit('SET_SOLICITACAO', response.data);
                const notification = {
                    type: "success",
                    message: "Solicitação atualizada com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao atualizar solicitação!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },
}

const getters = {
    getAllByEstudante() {
        return state.solicitacoes;
    },
    GET_DEFAULT_ITEM(state) {
        return state.defaultItem;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}