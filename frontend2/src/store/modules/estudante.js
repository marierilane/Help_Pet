import router from "../../router";
import {RepositoryFactory} from "@/repositories/RepositoryFactory";
import store from "../../store";

let estudanteRepository

const state = {
    estudante: null,
    estudantes: [],
}

const mutations = {
    SET_ESTUDANTE: (state, estudante) => {
        state.estudante = estudante;
    },
    SET_ESTUDANTES: (state, estudantes) => {
        state.estudantes = estudantes;
    }
}

const actions = {
    createEstudante({ commit }, estudante) {
        estudanteRepository = RepositoryFactory.get("estudante");
        estudanteRepository.create(estudante)
            .then(() => {
                commit('SET_ESTUDANTE', estudante);
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
        estudanteRepository = RepositoryFactory.get("estudante");
        estudanteRepository.getAll()
            .then((response) => {
                commit('SET_ESTUDANTES', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter estudantes!",
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