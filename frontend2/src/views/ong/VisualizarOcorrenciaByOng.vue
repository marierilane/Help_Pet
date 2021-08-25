<template>
  <div>
    <v-card-widget enableActions :title="'Listar Ocorrências para a ONG'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="ocorrencia.ocorrencias"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <template>
                  <v-btn
                    class="ma-2"
                    color="primary"
                    dark
                    @click="confirmado(item.id)"
                  >
                    Confirmar
                    <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                  </v-btn>

                  <v-btn
                    class="ma-2"
                    color="purple"
                    dark
                    @click="adocao(item.id)"
                  >
                    Adoção
                    <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                  </v-btn>

                  <v-btn
                    class="ma-2"
                    color="indigo"
                    dark
                    @click="adotado(item.id)"
                  >
                    Adotado
                    <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                  </v-btn>

                  <v-btn
                    class="ma-2"
                    color="blue lighten-2"
                    dark
                    @click="openOcorrencia(item.id)"
                  >
                    Abrir
                    <v-icon dark right> mdi-eye-circle </v-icon>
                  </v-btn>
                </template>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
    </v-card-widget>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VCardWidget from "@/components/VWidget";

export default {
  name: "visualizarOcorrenciaByOng",
  components: {
    VCardWidget,
  },
  data: () => ({
    dialog: false,

    headers: [
      { text: "Titulo", value: "titulo" },
      { text: "Descrição", value: "descricao" },
      { text: "Local", value: "endereco" },
      { text: "Status", value: "status" },
      { text: "ONG", value: "ong.nomeOng" },
      { text: "Pessoa", value: "pessoa.usuario.nome" },
      { text: "Ações na Ocorrência", value: "actions", sortable: false },
    ],

    itemIndex: -1,
    itemToDelete: {
      id: null,
    },
    itemToDeleteDefault: {
      id: null,
    },
  }),
  created() {
    this.$store.dispatch("ocorrencia/findAllByOng");
  },
  computed: {
    ...mapState(["ocorrencia"]),
  },
  methods: {
    pascalCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    openOcorrencia(id) {
      this.$router.push("/acompanhar/ocorrencia/ong/" + `${id}`);
    },

    adocao(id) {
      this.$store.dispatch("ocorrencia/adocaoOcorrencia", id);
      //window.location.reload();
    },

    adotado(id) {
      this.$store.dispatch("ocorrencia/adotadoOcorrencia", id);
      //window.location.reload();
    },

    confirmado(id) {
      this.$store.dispatch("ocorrencia/confirmarOcorrencia", id);
      //window.location.reload();
    },
  },
};
</script>