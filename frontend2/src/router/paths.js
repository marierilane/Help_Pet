
// novas rotas 
import LoginPage from '../views/Login'
import Home from '../views/Home'
import CadastroPessoa from "../views/pessoa/CadastroPessoa";
import CadastroOng from "../views/ong/CadastroOng";
import CadastroOcorrencia from "../views/ocorrencia/CadastroOcorrencia";
import VisualizarOcorrenciaByPessoa from "../views/pessoa/VisualizarOcorrenciaByPessoa";
import VisualizarOcorrenciaByOng from "../views/ong/VisualizarOcorrenciaByOng"
import AcompanharOcorrenciaIndividualbyPessoa from "../views/pessoa/AcompanharOcorrenciaIndividualbyPessoa";
import EditarOcorrenciaByPessoa from "../views/ocorrencia/EditarOcorrenciaByPessoa"
import AcompanharOcorrenciaByOng from "../views/ong/AcompanharOcorrenciaByOng"


export default [

    /* Geral */
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        meta: {
            public: true,
        },
        props: true,
        name: 'Login',
        component: LoginPage
    },
// inicio novo
    {
        path: '/cadastrarPessoa',
        name: 'CadastroPessoa',
        component: CadastroPessoa
    },

    {
        path: '/cadastrarOng',
        name: 'CadastroOng',
        component: CadastroOng
    },

    {
        path: '/cadastrarOcorrencia',
        name: 'CadastroOcorrencia',
        component: CadastroOcorrencia
    },
    {
        path: '/visualizarOcorrenciaPessoa',
        name: 'VisualizarOcorrenciaPessoa',
        component: VisualizarOcorrenciaByPessoa
    },
    {
        path: '/visualizarOcorrenciaOng',
        name: 'VisualizarOcorrenciaONG',
        component: VisualizarOcorrenciaByOng
    },

    {
        path: '/acompanhar/ocorrencia/:id',
        name: 'AcompanharOcorrenciaIndividualbyPessoa',
        component: AcompanharOcorrenciaIndividualbyPessoa
    },

    {
        path: '/acompanhar/ocorrencia/ong/:id',
        name: 'AcompanharOcorrenciaByOng',
        component: AcompanharOcorrenciaByOng
    },

    {
        path: '/editar/ocorrencia/:id',
        name: 'EditarOcorrenciaByPessoa',
        component: EditarOcorrenciaByPessoa
    },

//fim novo




];
