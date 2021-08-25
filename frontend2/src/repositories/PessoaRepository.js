import Repository from "./Repository";

const resource = "/pessoas";


export default {
  create(payload) {
    return Repository.post(`${resource}`, payload)
  },

  getByAutenticacao() {
    return Repository.get(`${resource}/usuario`);
  },

  getAll() {
    return Repository.get(`${resource}/listar`)
  },


}
