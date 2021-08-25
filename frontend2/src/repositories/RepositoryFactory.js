import UsuarioRepository from "./usuarioRepository"
import ServidorRepository from "./ServidorRepository"
import EstudanteRepository from "./EstudanteRepository"
import AtividadeComplementarColetivaRepository from "./AtividadeComplementarColetivaRepository"
import SolicitarAtividadeComplementarIndividual from "@/views/SolicitarAtividadeComplementarIndividual";
import solicitacaoRepository from "./solicitacaoRepository";
import solicitacaoColetivaRepository from "./solicitacaoColetivaRepository";
import cursoRepository from "./CursoRepository";
import PessoaRepository  from "./PessoaRepository";
import OngRepository from "./OngRepository";
import OcorrenciaRepository from "./OcorrenciaRepository";

const repositories = {
    usuario: UsuarioRepository,
    servidor: ServidorRepository,
    estudante: EstudanteRepository,
    atividadeComplementarColetiva: AtividadeComplementarColetivaRepository,
    atividadeComplementarIndividual : SolicitarAtividadeComplementarIndividual,
    solicitacao: solicitacaoRepository,
    solicitacaoColetiva: solicitacaoColetivaRepository,
    cursos: cursoRepository,


    // inicio novo
    pessoa: PessoaRepository,
    ong:OngRepository,
    ocorrencia:OcorrenciaRepository,
    // fim novo
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
