import router from "../../router";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import store from "../../store";

let ocorrenciaRepository;

const state = {
    ocorrencias: [],
}

const mutations = {
    SET_OCORRENCIA: (state, ocorrencia) => {
        state.ocorrencia = ocorrencia;
    },

    SET_OCORRENCIAS: (state, ocorrencias) => {
        state.ocorrencias = ocorrencias;
    },

    DELETE_OCORRENCIA: (state, id) => {
        let ocorrencias = state.ocorrencias.filter(s => s.id != id);
        state.ocorrencias = ocorrencias;
    },
}

const actions = {
    createOcorrencia({ commit }, ocorrencia) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.create(ocorrencia)
            .then(() => {
                commit('SET_OCORRENCIA', ocorrencia);
                const notification = {
                    type: "success",
                    message: "Cadastro realizado com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
                router.push("/visualizarOcorrenciaPessoa");
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
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.getAll()
            .then((response) => {
                commit('SET_OCORRENCIAS', response.data);
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

    findAllByPessoa({ commit }) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.findAllByPessoa()
            .then((res) => {
                commit('SET_OCORRENCIAS', res.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter Ocorrências!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    findAllByOng({ commit }) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.findAllByOng()
            .then((res) => {
                commit('SET_OCORRENCIAS', res.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter Ocorrências!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    getOcorrencia({ commit }, id) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.getOcorrencia(id)
            .then((res) => {
                commit('SET_OCORRENCIAS', res.data);
            })
            .catch((error) => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter ocorrências! " + error.response.data.message,
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    deleteOcorrencia({ commit }, id) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.delete(id)
            .then(() => {
                commit('DELETE_OCORRENCIA', id);
                const notification = {
                    type: "success",
                    message: "Ocorrêncis excluída com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao excluir ocorrência!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    confirmarOcorrencia({ commit }, id) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.confirmado(id)
            .then(() => {
                commit('SET_OCORRENCIA', id);
                const notification = {
                    type: "success",
                    message: "Ocorrência confirmada com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
                window.location.reload();
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao confirmar ocorrência!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },

    adocaoOcorrencia({ commit }, id) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.adocao(id)
            .then(() => {
                commit('SET_OCORRENCIA', id);
                const notification = {
                    type: "success",
                    message: "Ocorrência colocada para adoção com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
                window.location.reload();
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao colocar para a adoção ocorrência!",
                }
                router.push("/");
                store.dispatch('notification/add', notification, { root: true });
            });
    },


    adotadoOcorrencia({ commit }, id) {
        ocorrenciaRepository = RepositoryFactory.get("ocorrencia");
        ocorrenciaRepository.adotado(id)
            .then(() => {
                commit('SET_OCORRENCIA', id);
                const notification = {
                    type: "success",
                    message: "Ocorrência atualizada como adotado com sucesso!",
                };
                store.dispatch('notification/add', notification, { root: true });
                window.location.reload();
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao adotar ocorrência!",
                }
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