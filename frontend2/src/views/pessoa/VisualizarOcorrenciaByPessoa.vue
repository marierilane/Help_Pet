<template>
  <div>
    <v-card-widget enableActions :title="'Listar Solicitações Individuais'">
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
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" persistent max-width="400">
                    <v-card>
                      <v-card-title>
                        <span class="headline"> Confirmar? </span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          Tem certeza que deseja excluir a solicitação coletiva
                          com o id <b>{{ itemToDelete.id }}</b
                          >?
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="cancelDelete">
                          Cancelar
                        </v-btn>

                        <v-btn
                          color="green darken-1"
                          text
                          @click="deleteSolicitacao(itemToDelete.id)"
                        >
                          Confirmar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
                <template v-if="item.status == 'PENDENTE'">
                  
                  <v-icon small class="mr-4" @click="deleteItem(item)"
                    >mdi-delete</v-icon
                  >
                </template>
                <v-icon small @click="openOcorrencia(item.id)">mdi-eye</v-icon>
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
  name: "visualizarOcorrenciaByPessoa",
  components: {
    VCardWidget,
  },
  data: () => ({
    dialog: false,

    headers: [
      { text: "Titulo", value: "titulo" },
      { text: "Descrição", value: "descricao" },
      { text: "ONG", value: "ong.nomeOng" },
      { text: "Status", value: "status" },
      { text: "", value: "actions", sortable: false },
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
    this.$store.dispatch("ocorrencia/findAllByPessoa");
  },
  computed: {
    ...mapState(["ocorrencia"]),
  },
  methods: {
    pascalCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    openOcorrencia(id) {
      this.$router.push("/acompanhar/ocorrencia/" + `${id}`);
    },

    deleteItem(item) {
      this.itemIndex = this.ocorrencia.ocorrencias.indexOf(item);
      this.itemToDelete = Object.assign({}, item);
      this.dialog = true;
    },

    deleteSolicitacao(id){
        this.$store.dispatch("ocorrencia/deleteOcorrencia", id)
        this.cancelDelete();
    },

    cancelDelete() {
      this.dialog = false;
      this.$nextTick(() => {
        this.itemToDelete = Object.assign({}, this.itemToDeleteDefault);
        this.itemIndex = -1;
      });
    },
  },
};
</script>