import router from "../../router";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import store from "../../store";


let pessoaRepository

const state = {
    pessoa: null,
    pessoas: [],
}

const mutations = {
    SET_PESSOA: (state, pessoa) => {
        state.pessoa = pessoa;
    },
    SET_PESSOAS: (state, pessoas) => {
        state.pessoas = pessoas;
    }
}

const actions = {
    createPessoa({ commit }, pessoa) {
        pessoaRepository = RepositoryFactory.get("pessoa");
        pessoaRepository.create(pessoa)
            .then(() => {
                commit('SET_PESSOA', pessoa);
                const notification = {
                    type: "success",
                    message: "Cadastro realizado com sucesso!",
                };
                store.dispatch('notification/add', notification, {root: true});
                router.push("/login");
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao realizar cadastro!",
                };
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    getAll({ commit }) {
        pessoaRepository = RepositoryFactory.get("pessoas");
        pessoaRepository.getAll()
            .then((response) => {
                commit('SET_PESSOAS', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter pessoas!",
                };
                store.dispatch('notification/add', notification, {root: true});
            });
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}