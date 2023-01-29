package com.application.backend.repository;

import com.application.backend.model.OutgoingTransfers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransferRepository extends JpaRepository<OutgoingTransfers, Integer> {
    Optional<OutgoingTransfers> findOutgoingTransfersById(int id);
}
