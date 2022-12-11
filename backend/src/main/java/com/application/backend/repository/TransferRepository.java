package com.application.backend.repository;

import com.application.backend.model.OutgoingTransfers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<OutgoingTransfers, Integer> {

}
