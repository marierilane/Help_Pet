<template>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" >
                <v-card class="elevation-12">
                    <v-toolbar color="teal" dark flat>
                        <v-toolbar-title>HelpPET - Login</v-toolbar-title>
                    </v-toolbar>
                    <v-form @submit.prevent="onSubmit" ref="form" lazy-validation v-model="valid">
                        <v-card-text>
                            <p class="error--text text-center">{{error}}</p>
                            <v-text-field label="Login" name="email" prepend-icon="person" type="text" v-model="email" required :rules="requiredRule"/>
                            <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password" v-model="password" required :rules="requiredRule"/>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                          <v-btn @click="cadastrarOng" large>ONG Cadastre-se </v-btn>
                          <v-btn @click="cadastrarUsuario" large>Usuário Cadastre-se</v-btn>
                          <v-btn color="teal" type="submit" :loading="loading" large>Entrar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        props: ["to", "invalidToken"],
        data: () => ({
            papeis:{},
            valid: true,
            loading: false,
            email: '',
            password: '',
            error: '',
            requiredRule: [
                v => !!v || 'Campo obrigatório'
            ],
        }),
        created() {
            if (this.invalidToken) {
                this.error = 'Sua sessão expirou. Faça login novamente'
            }
        },
        methods: {
            onSubmit () {
                this.loading = true
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('auth/login', {email: this.email, password: this.password})
                        .then(() => {
                            if (this.$store.getters['auth/isAuthenticated']) {
                                //this.$router.push('/solicitacao-coletiva/2')
                                this.papeis = localStorage.getItem("papeis");
                                if(this.papeis === 'USUARIO_NORMAL'){
                                     this.$router.push('/visualizarOcorrenciaPessoa') //rever isso
                                }else if(this.papeis === 'USUARIO_ONG'){
                                    this.$router.push('/visualizarOcorrenciaOng') //rever isso
                                }
                               
                                window.location.reload();
                            } else {
                                this.error = 'Usuário e/ou senha inválidos'
                            }
                        })
                }

                this.loading = false
            },

            cadastrarUsuario() {
              this.$router.push('/cadastrarPessoa')
              window.location.reload();

            },
            cadastrarOng() {
              this.$router.push('/cadastrarOng')
              window.location.reload();
            }
        },
        computed: {
            ...mapState({
                token: state => state.auth.token
            })
        }
    };
</script>

<style scoped lang="css">

</style>
