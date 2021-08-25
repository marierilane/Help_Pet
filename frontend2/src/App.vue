<template>
    <v-app>
        <template v-if="!$route.meta.public">
            <v-app-bar color="teal" dark dense app>
              <div class="d-flex align-center">
                <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="/static/images/logo01.png"
                  transition="scale-transition" width="40"/>
              </div>
                <v-toolbar-items class="ml-3"  v-if="this.papel ==='USUARIO_NORMAL'">
                    <v-btn v-if="this.papel === 'USUARIO_NORMAL'" to="/cadastrarOcorrencia" text>Cadastrar Ocorrência</v-btn>
                    <v-btn v-if="this.papel === 'USUARIO_NORMAL'" to="/visualizarOcorrenciaPessoa" text>Visualizar Ocorrências Cadastradas</v-btn>
                </v-toolbar-items>

                 <v-btn v-if="this.papel === 'USUARIO_ONG'" to="/visualizarOcorrenciaOng" text>Visualizar Ocorrências</v-btn>
                 <v-btn v-if="!token" to="/login" text>Voltar para tela de login</v-btn>

              <v-spacer></v-spacer>

                <span v-if="nome">Olá, {{nome}}</span>
                <v-btn @click="logout" text v-if="token">
                  <v-icon>power_settings_new</v-icon>
                </v-btn>
            </v-app-bar>

            <v-content class="content">
                <v-container fluid class="page-wrapper">
                    <router-view></router-view>
                </v-container>
            </v-content>

            <!-- App Footer -->
            <v-footer height="auto" class="white pa-3 app--footer" app>
                <span class="caption">Hep-PET &copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
        </template>

        <template v-else>
          <transition>
            <keep-alive>
              <router-view :key="$route.fullpath"></router-view>
            </keep-alive>
          </transition>
        </template>

        <notification-container></notification-container>
    </v-app>
</template>

<script>

// import axios from 'axios';
import NotificationContainer from '@/components/core/NotificationContainer';

export default {
  name: 'App',
  components: {
    NotificationContainer,
  },

  data: () => ({
      nome: '',
      papeis:[],
      papel:{},
      token:{}
  }),

    created() {
        this.nome = localStorage.getItem("nome");
        this.papel = localStorage.getItem("papeis");
        this.token = localStorage.getItem("token");
    },

    methods: {
        logout() {
            this.$router.push('/logout');
             this.$router.push('/login');
            localStorage.removeItem("token");
            localStorage.removeItem("papeis");
            localStorage.removeItem("nome");
            localStorage.removeItem("email");
            localStorage.removeItem("token_update_date");

           
        }

    }
};
</script>

<style lang="stylus" scoped>
    .page-wrapper
        min-height: calc(100vh - 64px - 50px - 81px );

    .content
        background-color: #cbcedd;;

</style>
