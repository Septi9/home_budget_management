package com.application.backend.service;

import com.application.backend.model.OutgoingTransfers;
import com.application.backend.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransferService {

    @Autowired
    private TransferRepository transferRepository;

    @Autowired
    public TransferService(TransferRepository transferRepository) {
        this.transferRepository = transferRepository;
    }

    public OutgoingTransfers saveOutgoingTransfer(OutgoingTransfers outgoingTransfers) {
        return transferRepository.save(outgoingTransfers);
    }
}
