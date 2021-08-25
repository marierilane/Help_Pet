const state = {
  status: [
    {
      value: "REJEITADA",
      text: "Rejeitada",
    },
    {
      value: "APROVADA",
      text: "Aprovada",
    }
    // {
    //   value: "SOLICITADA",
    //   text: "Solicitada",
    // },
    // {
    //   value: "ASSINADA",
    //   text: "Assinada",
    // },
    // {
    //   value: "ANALISANDO",
    //   text: "Em análise",
    // },
    // {
    //   value: "CONCLUIDA",
    //   text: "Concluída",
    // },
  ],
  tipos: [
    {
      value: "INICIACAO_DOCENCIA",
      text:
        "I - Atividades de iniciação à docência, à pesquisa e/ou à extensão",
    },
    {
      value: "CULTURAL",
      text: "II - Atividades artístico-culturais e esportivas",
    },
    {
      value: "EVENTOS",
      text: "III - Atividades de participação e/ou organização de eventos",
    },
    {
      value: "EXPERIENCIA_PROFISSIONAL",
      text:
        "IV - Experiências ligadas à formação profissional e/ou correlatas",
    },
    {
      value: "PRODUCAO_TECNICA",
      text: "V - Produção Técnica e/ou Científica",
    },
    {
      value: "GESTAO",
      text: "VI - Vivências de gestão",
    },
    {
      value: "OUTRAS",
      text: "VII - Outras atividades",
    },
  ],
  statusAtividade: [
    {
      value: "APROVADA",
      text: "Aprovada",
    },
    {
      value: "REJEITADA",
      text: "Rejeitada",
    },
  ],
  tiposUsuarios: [
    {
      value: "PESSOA",
      text: "Pessoa"
    },
    {
      value: "ONG",
      text: "Ong"
    }
  ],
  papeis: [
    {
      value: "ADMIN",
      text: "Administrador"
    },
    {
      value: "USUARIO_NORMAL",
      text: "Pessoa"
    },
    {
      value: "USUARIO_ONG",
      text: "ong"
    }
  ],
}

const getters = {
  GET_STATUS(state) {
    return state.status;
  },
  GET_TIPOS(state) {
    return state.tipos;
  },
  GET_STATUS_ATIVIDADE(state) {
    return state.statusAtividade;
  },
  GET_TIPOS_USUARIOS(state) {
    return state.tiposUsuarios;
  },
  GET_PAPEIS(state) {
    return state.papeis;
  },
}

export default {
  namespaced: true,
  state,
  getters,
}