import router from "../../router";
import {RepositoryFactory} from "@/repositories/RepositoryFactory";
import store from "../../store";

let atividadeRepository

const state = {
    atividade: {
        solicitante: {},
    },
}

const mutations = {
    SET_ATIVIDADE: (state, atividade) => {
        state.atividade = atividade;
    }
}

const actions = {
    createAtividadeComplementarColetiva({ commit }, atividade) {
        atividadeRepository = RepositoryFactory.get("atividadeComplementarColetiva");
        atividadeRepository.create(atividade)
            .then((response) => {
                commit('SET_ATIVIDADE', response.data);
                const notification = {
                    type: "success",
                    message: "Atividade cadastrada com sucesso!",
                };
                store.dispatch('notification/add', notification, {root: true});
                router.push("/solicitacoes_coletivas/listar");
            })
            .catch((error) => {
                const notification = {
                    type: "error",
                    message: "Erro ao realizar o cadastro da atividade! " + error.response.data.message,
                };
                store.dispatch('notification/add', notification, {root: true});
                router.push("/solicitacoes_coletivas/listar");
            });
    },
    getSolicitacao({commit}, idSolicitacao){
        atividadeRepository = RepositoryFactory.get("atividadeComplementarColetiva");
        atividadeRepository.get(idSolicitacao)
            .then((res) => {
                commit('SET_ATIVIDADE', res.data)
            })
            .catch((error) => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter solicitação! " + error.response.data.message,
                };
                // router.go(-1); // Volta à página anterior
                router.push("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },
    assinar({commit, state}, senha){
        atividadeRepository = RepositoryFactory.get("atividadeComplementarColetiva");
        atividadeRepository.assinar(state.atividade.id, senha)
            .then((res) => {
                commit('SET_ATIVIDADE', res.data);
                const notification = {
                    type: "success",
                    message: "Assinatura realizada com sucesso!",
                };
                store.dispatch('notification/add', notification, {root: true});
            })
            .catch((error) => {
                const notification = {
                    type: "error",
                    message: "Erro ao realizar a assinatura da atividade! " + error.response.data.message,
                };
                store.dispatch('notification/add', notification, {root: true});
            });
    },
    atualizarAtividadeComplementarColetiva({commit, state}, id) {
        atividadeRepository = RepositoryFactory.get("atividadeComplementarColetiva")
        atividadeRepository.atualizarAtividadeComplementarColetiva(id, state.atividade)
            .then((response) => {
                commit('SET_ATIVIDADE', response.data);
                const notification = {
                    type: "success",
                    message: "Atualização realizada com sucesso!",
                };
                store.dispatch('notification/add', notification, {root: true});
                router.push("/");
            })
            .catch((error) => {
                console.log(error)
                const notification = {
                    type: "error",
                    message: "Erro ao realizar atualização! " + error.response.data.message,
                };
                store.dispatch('notification/add', notification, {root: true});
            });
    },
}

const getters = {
    GET_ATIVIDADE(state) {
        return state.atividade;
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}