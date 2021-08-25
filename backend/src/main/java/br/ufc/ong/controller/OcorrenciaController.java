package br.ufc.ong.controller;

import br.ufc.ong.model.Ocorrencia;
import br.ufc.ong.model.Ong;
import br.ufc.ong.model.Status;
import br.ufc.ong.service.OcorrenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping(path = "/ocorrencias")
public class OcorrenciaController {

    @Autowired
    OcorrenciaService ocorrenciaService;


    // metodo de salvar ocorrencia
    @PostMapping()
    public ResponseEntity<Ocorrencia> save(@RequestBody Ocorrencia ocorrencia){
        return ResponseEntity.ok(ocorrenciaService.save(ocorrencia));
    }

    @GetMapping("/pessoa")
    public ResponseEntity<List<Ocorrencia>> listarOcorrenciasByPessoa(){
        return ResponseEntity.ok(ocorrenciaService.listarOcorrenciasByPessoa());
    }

    @GetMapping("/ong")
    public ResponseEntity<List<Ocorrencia>> listarOcorrenciasByOng(){
        return ResponseEntity.ok(ocorrenciaService.listarOcorrenciasByOng());
    }

    @GetMapping("/find/{id}")
    ResponseEntity<Ocorrencia> findOne(@PathVariable Long id){
        return ResponseEntity.ok(ocorrenciaService.findOne(id));
    }

    @GetMapping("/{id}")
    ResponseEntity<Ocorrencia> finById(@PathVariable Long id){
        return ResponseEntity.ok(ocorrenciaService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        ocorrenciaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar/{id}")
    @Transactional
    public ResponseEntity<Ocorrencia> update(@PathVariable Long id, @RequestBody Ocorrencia ocorrencia){
        return ResponseEntity.ok(ocorrenciaService.update(id, ocorrencia));
    }

    @PutMapping("/atualizar/adocao/{id}")
    public ResponseEntity<Ocorrencia> atualizarStatusADOCAO(@PathVariable Long id){
        return ResponseEntity.ok(ocorrenciaService.atualizarStatusDaOcorrenciaByOngADOCAO(id));
    }

    @PutMapping("/atualizar/adotado/{id}")
    public ResponseEntity<Ocorrencia> atualizarStatusADOTADO(@PathVariable Long id){
        return ResponseEntity.ok(ocorrenciaService.atualizarStatusDaOcorrenciaByOngADOTADO(id));
    }

    @PutMapping("/atualizar/confirmado/{id}")
    public ResponseEntity<Ocorrencia> atualizarStatusCONFIRMADO(@PathVariable Long id){
        return ResponseEntity.ok(ocorrenciaService.atualizarStatusDaOcorrenciaByOngCONFIRMADO(id));
    }

    @PutMapping("/atualizar/cancelado/{id}")
    public ResponseEntity<Ocorrencia> atualizarStatusCANCELADO(@PathVariable Long id){
        return ResponseEntity.ok(ocorrenciaService.atualizarStatusDaOcorrenciaByOngCANCELADO(id));
    }

//    @PutMapping("/atualizar/{id}")
//    public ResponseEntity<Ocorrencia> atualizarStatus(@PathVariable Long id, String status){
//        return ResponseEntity.ok(ocorrenciaService.atualizarStatusDaOcorrenciaByOng(id, status));
//    }



}
