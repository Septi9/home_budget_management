package com.application.backend.service;

import com.application.backend.model.IncomingTransfers;
import com.application.backend.repository.IncomingTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IncomingTransferService {

    @Autowired
    private IncomingTransferRepository incomingTransferRepository;

    @Autowired
    public IncomingTransferService(IncomingTransferRepository incomingTransferRepository) {
        this.incomingTransferRepository = incomingTransferRepository;
    }

    public IncomingTransfers saveIncomingTransfer(IncomingTransfers incomingTransfers) {
        return incomingTransferRepository.save(incomingTransfers);
    }

    public void deleteIncomingTransfers(int id) {
        incomingTransferRepository.deleteById(id);
    }

    public IncomingTransfers updateIncomingTransfers(IncomingTransfers incomingTransfers) {
        return incomingTransferRepository.save(incomingTransfers);
    }
}
