import router from "../../router";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import store from "../../store";

let ongRepository;

const state = {
    ongs: [],
}

const mutations = {
    SET_ONG: (state, ong) => {
        state.ong = ong;
    },
    SET_ONGS: (state, ongs) => {
        state.ongs = ongs;
    }
}

const actions = {
    createOng({ commit }, ong) {
        ongRepository = RepositoryFactory.get("ong");
        ongRepository.create(ong)
            .then(() => {
                commit('SET_ONG', ong);
                const notification = {
                    type: "success",
                    message: "Cadastro realizado com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
                router.push("/login");
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao realizar cadastro!",
                };
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    getAll({ commit }) {
        ongRepository = RepositoryFactory.get("ong");
        ongRepository.getAll()
            .then((response) => {
                commit('SET_ONGS', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter cursos!",
                };
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}