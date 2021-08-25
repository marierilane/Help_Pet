import Repository from "./Repository";

const resource = "/usuarios";

export default {
    getByAutenticacao() {
        return Repository.get(`${resource}/usuario`);
    },
    getAll() {
      return Repository.get(`${resource}`)
    },
    create(payload){
      return Repository.post(`${resource}`, payload)
    },

    delete(id){
      return Repository.delete(`${resource}/${id}`)
    }
}
