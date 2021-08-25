import router from "../../router";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import store from "../../store";

let cursoRepository

const state = {
    cursos: [],
}

const mutations = {
    SET_CURSOS: (state, cursos) => {
        state.cursos = cursos;
    },
}

const actions = {
    getAll({commit}) {
        cursoRepository = RepositoryFactory.get("cursos");
        cursoRepository.getAll()
            .then((response) => {
                commit('SET_CURSOS', response.data);
            })
            .catch(() => {
                const notification = {
                    type: "error",
                    message: "Erro ao obter cursos!",
                };
                // router.go(-1);
                router.push("/");
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