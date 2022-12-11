package com.application.backend.repository;

import com.application.backend.model.IncomingTransfers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomingTransferRepository extends JpaRepository<IncomingTransfers, Integer> {
}
