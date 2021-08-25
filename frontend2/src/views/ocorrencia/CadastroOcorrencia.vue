<template>
  <div>
    <v-card-widget enableActions :title="'Cadastro de Ocorrências'">
      <div slot="widget-header-action"></div>

      <div slot="widget-content">
        <v-form ref="form" lazy-validation v-model="valid">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ocorrencia.titulo"
                label="Titulo da Ocorrência"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ocorrencia.descricao"
                label="Descrição da Ocorrência"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ocorrencia.endereco"
                label="Local da Ocorrência"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
             
                v-model="ocorrencia.ong"
                :items="ong.ongs"
                label="ONG pra destinar a ocorrência"
                item-text="nomeOng"
                item-value="id_ong"
                :filter="customFilter2"
                required
                return-object
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="animal.nome"
                label="Nome do Animal"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="animal.especie"
                label="Espécie"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="animal.raça"
                label="Raça"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="animal.caracteristicas"
                label="Características"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-row class="mr-8 d-flex justify-end">
          <v-btn color="success" class="mr-4" @click="cadastarOcorrencia()"
            >Salvar</v-btn
          >
          <v-btn class="mr-4" color="error" type="reset" @click="reset"
            >Limpar</v-btn
          >
        </v-row>
      </div>
    </v-card-widget>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import VCardWidget from "@/components/VWidget";

export default {
  mixins: [validationMixin],

  components: {
    VCardWidget,
  },

  validations: {
    nome: { required },
    email: { required, email },
    senha: { required },
  },

  data() {
    return {
      valid: false,
      usuario: {},
      ocorrencia: {},
      animal: {},

    };
  },

  computed: {
    ...mapState(["static", "ong"]),

    nomeErrors() {
      const errors = [];
      if (!this.$v.nome.$dirty) return errors;
      !this.$v.nome.required && errors.push("Nome é obrigatório.");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Precisa de um email válido");
      !this.$v.email.required && errors.push("E-mail é obrigtório");
      return errors;
    },
    senhaErrors() {
      const errors = [];
      if (!this.$v.senha.$dirty) return errors;
      !this.$v.senha.required && errors.push("Senha é obrigatória.");
      return errors;
    },
  },

  created() {
    this.papeis = this.$store.getters["static/GET_PAPEIS"];
    this.$store.dispatch("ong/getAll");
  },

  methods: {
    customFilter2(item, queryText) {
      const textOne = item.nome.toLowerCase();
      const searchText = queryText.toLowerCase();
      return textOne.indexOf(searchText) > -1;
    },
    cadastarOcorrencia() {
        this.ocorrencia.animal = this.animal;
        this.$store.dispatch("ocorrencia/createOcorrencia",this.ocorrencia)
        
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
