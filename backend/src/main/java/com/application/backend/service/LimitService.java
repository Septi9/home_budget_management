package com.application.backend.service;

import com.application.backend.model.TransfersLimit;
import com.application.backend.repository.LimitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LimitService {

    @Autowired
    private LimitRepository limitRepository;

    @Autowired
    public LimitService(LimitRepository limitRepository) {
        this.limitRepository = limitRepository;
    }

    public TransfersLimit saveLimit(TransfersLimit transfersLimit) {
        return limitRepository.save(transfersLimit);
    }

    public void deleteLimit(int id) {
        limitRepository.deleteById(id);
    }

    public TransfersLimit updateLimit(TransfersLimit transfersLimit) {
        return limitRepository.save(transfersLimit);
    }
}
