import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import servidor from './modules/servidor'
import estudante from './modules/estudante'
import atividadeComplementarColetiva from './modules/atividadeComplementarColetiva'
import solicitacao from "./modules/solicitacao";
import solicitacaoColetiva from "./modules/solicitacaoColetiva";
import curso from "./modules/curso";
import staticInformations from './modules/staticInformations';
import notification from './modules/notification';

// inicio novo

import pessoa from "./modules/Pessoa"
import ong from "./modules/ong"
import ocorrencia from "./modules/ocorrencia"
//fim novo


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    servidor: servidor,
    estudante: estudante,
    atividadeComplementarColetiva: atividadeComplementarColetiva,
    solicitacao: solicitacao,
    solicitacaoIndividual: solicitacao,
    solicitacaoColetiva: solicitacaoColetiva,
    curso: curso,
    static: staticInformations,
    notification: notification,

    // inicio novo
    pessoa:pessoa,
    ong:ong,
    ocorrencia:ocorrencia,
    // fim novo
  }
})
