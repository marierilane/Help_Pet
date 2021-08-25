<template>
  <div>
    <v-card-widget enableActions :title="'Acompanhar Ocorrência'">
      <div slot="widget-header-action"></div>

      <div slot="widget-content">
        <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="ocorrencia.ocorrencias.titulo"
                label="Titulo da Ocorrência"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ocorrencia.ocorrencias.descricao"
                label="Descrição da Ocorrência"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ocorrencia.ocorrencias.endereco"
                label="Local da Ocorrência"
                readonly
              ></v-text-field>
            </v-col>

             <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ocorrencia.ocorrencias.status"
                label="Status da Ocorrência"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="ocorrencia.ocorrencias.ong.nomeOng"
                label="ONG Responsável"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="ocorrencia.ocorrencias.animal.nome"
              label="Nome do Animal"
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="ocorrencia.ocorrencias.animal.especie"
              label="Espécie"
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="ocorrencia.ocorrencias.animal.raça"
              label="Raça"
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="ocorrencia.ocorrencias.animal.caracteristicas"
              label="Características"
              readonly
            ></v-text-field>
          </v-col>

          
          <v-col cols="12" md="4">
            <v-text-field
              v-model="ocorrencia.ocorrencias.pessoa.usuario.nome"
              label="Pessoa Responsável"
              readonly
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="ocorrencia.ocorrencias.pessoa.cpf"
              label="CPF"
              readonly
            ></v-text-field>
          </v-col>

                    <v-col cols="12" md="4">
            <v-text-field
              v-model="ocorrencia.ocorrencias.pessoa.endereco"
              label="Endereço"
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

import VCardWidget from "@/components/VWidget";

export default {

  mixins: [validationMixin],
  name:"AcompanharOcorrenciaIndividualbyPessoa",

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
        this.analyzedItem.tipoAtividade !== "" &&
        this.analyzedItem.horasReais !== "" &&
        this.analyzedItem.horasConvertidas !== "" &&
        this.analyzedItem.statusAtividade !== "" &&
        this.analyzedItem.statusAtividade !== null
      );
    },
  },

  watch: {},

  created() {
    this.id = this.$route.params.id;
    this.$store.dispatch("ocorrencia/getOcorrencia", this.id);

  },

  methods: {},
};
</script>