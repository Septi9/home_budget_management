package com.application.backend.repository;

import com.application.backend.model.IncomingTransfers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IncomingTransferRepository extends JpaRepository<IncomingTransfers, Integer> {
    Optional<IncomingTransfers> findIncomingTransfersById(int id);
}
