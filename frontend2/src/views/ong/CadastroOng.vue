<template>
  <div>
    <v-card-widget enableActions :title="'Cadastro de ONG'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-form ref="form" lazy-validation v-model="valid">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ong.nomeOng"
                label="Nome da ONG"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="ong.sigla"
                label="Sigla"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="ong.endereco"
                label="Endereço Completo"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="ong.telefone"
                label="Telefone"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="ong.finalidade"
                label="Finalidade"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row> 
              <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="usuario.nome"
                label="Nome do Responsável"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="usuario.sobrenome"
                label="Sobrenome do Responsável"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="usuario.email"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="usuario.password"
                type="password"
                label="Senha"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-row class="mr-8 d-flex justify-end">
          <v-btn color="success" class="mr-4" @click="cadastrarOng()"
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
      ong: {},
      roles: [],
      papeis:[]
    };
  },

  computed: {
    ...mapState([
      // "curso",
      "static",
    ]),

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
  },

  methods: {
    cadastrarOng(){
      this.roles.push("USUARIO_ONG");
      this.usuario.papeis = this.roles;
      this.ong.usuario = this.usuario;
      this.$store.dispatch("ong/createOng", this.ong);
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
