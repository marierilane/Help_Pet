import Repository from "./Repository";

const resource = "/ongs";


export default {
  create(payload) {
    return Repository.post(`${resource}`, payload)
  },

  getAll() {
    return Repository.get(`${resource}`)
  },

  //getByAutenticacao() {
    //return Repository.get(`${resource}/usuario`);
  //},

  


}
