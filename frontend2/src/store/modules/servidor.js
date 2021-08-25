import router from "../../router";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import store from "../../store";

let servidorRepository

const state = {
    servidor: {
        usuario: {
            papeis: [],
        },
    },
    servidores: [],
    servidores_responsaveis: [],
    ehServidor: false,
}

const mutations = {
    SET_SERVIDOR: (state, servidor) => {
        state.servidor = servidor;
    },
    SET_SERVIDORES: (state, servidores) => {
        state.servidores = servidores;
    },
    SET_SERVIDORES_RESPONSAVEIS: (state, servidores) => {
        state.servidores_responsaveis = servidores;
    },
    SET_EH_SERVIDOR: (state, ehServidor) => {
        state.ehServidor = ehServidor;
    },
}

const actions = {
    createServidor({ commit }, servidor) {
        servidorRepository = RepositoryFactory.get("servidor")
        servidorRepository.create(servidor)
        .then(() => {
            commit('SET_SERVIDOR', servidor);
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
    getAll({commit}) {
        servidorRepository = RepositoryFactory.get("servidor");
        servidorRepository.getAll()
            .then((response) =>{
                commit('SET_SERVIDORES', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter listagem dos servidores!",
                }
                router.go("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },
    getServidoresResponsaveis({commit}) {
        servidorRepository = RepositoryFactory.get("servidor");
        servidorRepository.getServidores()
            .then((response) => {
                commit('SET_SERVIDORES_RESPONSAVEIS', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter servidores!",
                }
                router.go("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    getEhServidor({commit}) {
        servidorRepository = RepositoryFactory.get("servidor");
        servidorRepository.eServidor()
            .then((response) => {
                commit('SET_EH_SERVIDOR', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter informações do usuário!",
                }
                router.go("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },

    getServidor({commit}) {
        servidorRepository = RepositoryFactory.get("servidor");
        servidorRepository.usuarioServidor()
            .then((response) => {
                commit('SET_SERVIDOR', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter informações do servidor!",
                }
                router.go("/");
                store.dispatch('notification/add', notification, {root: true});
            });
    },
}

const getters = {
    GET_EH_SERVIDOR(state) {
        return state.ehServidor;
    },
    GET_SERVIDOR(state) {
        return state.servidor;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,

}