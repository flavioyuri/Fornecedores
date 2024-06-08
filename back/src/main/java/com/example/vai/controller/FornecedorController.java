package com.example.vai.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.vai.repository.FornecedorRepository;
import com.example.vai.entity.Fornecedor;

@RestController
@CrossOrigin(origins = "*")
public class FornecedorController {

		@Autowired
		private FornecedorRepository repository;
		
		@RequestMapping(value = "/fornecedores", method = RequestMethod.GET)
		public List<Fornecedor> Get(){
			return repository.findAll();
		}
		
		@RequestMapping(value = "/fornecedores/{id}", method = RequestMethod.GET)
		public ResponseEntity<Object> getOne(@PathVariable(value = "id") long id){
			Optional<Fornecedor> fornecedor = repository.findById(id);
			if (fornecedor.isEmpty()){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não encontrado");	
			}
			List<Fornecedor> lista = new ArrayList<Fornecedor>();
			lista.add(fornecedor.get());
			return ResponseEntity.status(HttpStatus.OK).body(lista);
		}

		@RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
		public Fornecedor post(@Validated @RequestBody Fornecedor fornecedor) {
			return repository.save(fornecedor);
		}
		
		
		
		@RequestMapping(value = "/editar/{id}", method = RequestMethod.PUT)
		public ResponseEntity<Fornecedor> put(@PathVariable(value = "id") long id, @Validated @RequestBody Fornecedor novoFornecedor){
			Optional<Fornecedor> fornecedor = repository.findById(id);
			if (fornecedor.isPresent()) {
				Fornecedor outroFornecedor = fornecedor.get();
				outroFornecedor.setNome(novoFornecedor.getNome());
				outroFornecedor.setCpf(novoFornecedor.getCpf());
				repository.save(outroFornecedor);
				return new ResponseEntity<Fornecedor>(outroFornecedor, HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		
		@RequestMapping(value = "/deletar/{id}", method = RequestMethod.DELETE)
		public ResponseEntity<Object> delete(@PathVariable(value = "id") long id){
			Optional<Fornecedor> fornecedor = repository.findById(id);
			if (fornecedor.isPresent()) {
				repository.delete(fornecedor.get());
				return new ResponseEntity<>(HttpStatus.OK);
			}
			else
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}
		

	
}
