import Repository from "./Repository";

const resource = "/ocorrencias";


export default {
  create(payload) {
    return Repository.post(`${resource}`, payload)
  },

  getOcorrencia(id){
    return Repository.get(`${resource}/${id}`);
  },

  getAll() {
    return Repository.get(`${resource}`)
  },

  findAllByPessoa(){
    return Repository.get(`${resource}` + '/pessoa');
  },

  findAllByOng(){
    return Repository.get(`${resource}` + '/ong');
  },

  delete(id){
    return Repository.delete(`${resource}/${id}`);
  },

  adocao(id){
    return Repository.put(`${resource}/atualizar/adocao/${id}`);
  },

  adotado(id){
    return Repository.put(`${resource}/atualizar/adotado/${id}`);
  },

  confirmado(id){
    return Repository.put(`${resource}/atualizar/confirmado/${id}`);
  },

 

  

}