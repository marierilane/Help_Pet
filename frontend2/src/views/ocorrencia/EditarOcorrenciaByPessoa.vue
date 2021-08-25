<template>
  <div>
    <v-card-widget enableActions :title="'Editar Ocorrência'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Aluno"
              v-model="ocorrencia"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Matrícula"
              v-model="ocorrencia"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card-widget>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
//import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";

//import { RepositoryFactory } from "@/repositories/RepositoryFactory";
//const solicitacaoRepository = RepositoryFactory.get("solicitacao");

import VCardWidget from "@/components/VWidget";

export default {
  mixins: [validationMixin],

  components: {
    VCardWidget,
  },

  validations: {},

  data: () => ({
    dialog: false,
  }),

  computed: {
    ...mapState(["static", "ocorrencia"]),

    ehValido: function () {
      return (
        this.editedItem.descricao !== "" &&
        this.editedItem.tipoAtividade !== "" &&
        this.editedItem.horasReais !== "" &&
        this.editedItem.horasConvertidas !== "" &&
        this.editedItem.arquivo.nome !== "" &&
        this.editedItem.arquivo.nome != null
      );
    },
  },

  watch: {},
  created() {},
  methods: {},
};
</script>