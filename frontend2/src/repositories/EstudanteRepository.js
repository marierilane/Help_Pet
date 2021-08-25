import Repository from './Repository'

const resource = '/estudantes'

export default {
    create(payload){
        return Repository.post(`${resource}`, payload)
    },
    
    getAll() {
        return Repository.get(`${resource}`)
      },
}