package com.example.vai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.vai.entity.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long>{
    
}
