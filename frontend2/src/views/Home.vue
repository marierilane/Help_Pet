<template>
  <div>
    <v-card-widget enableActions :title="'Página Inicial'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="usuarios"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>
    </v-card-widget>
  </div>
</template>


<script>
// @ is an alias to /src
import VCardWidget from "@/components/VWidget";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const usuarioRepo = RepositoryFactory.get("usuario");

export default {
  name: "home",
  components: {
    VCardWidget
  },

  data: () => ({
    headers: [
      {
        text: "Nome",
        align: "left",
        value: "nome"
      },
      { text: "Email", value: "email" },
      { text: "", value: "actions", sortable: false }
    ],
    usuarios: []
  }),

  created() {
    usuarioRepo
      .getAll()
      .then(res => {
        this.usuarios = res.data;
      })
      .catch(console.error);
  },

  computed: {},

  methods: {
    loadUsuarios(){
      usuarioRepo
      .getAll()
      .then(res => {
        this.usuarios = res.data;
      })
      .catch(console.error);
    },
    deleteItem(usuario){
      usuarioRepo.delete(usuario.id).then(() => {
        this.loadUsuarios();
      })
      .catch(console.error);
    }
  }
};
</script>
