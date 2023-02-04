package com.application.backend.repository;

import com.application.backend.model.TransfersLimit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LimitRepository extends JpaRepository<TransfersLimit, Integer> {
}
