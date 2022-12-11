package com.application.backend.controller;

import com.application.backend.model.IncomingTransfers;
import com.application.backend.model.OutgoingTransfers;
import com.application.backend.repository.IncomingTransferRepository;
import com.application.backend.repository.TransferRepository;
import com.application.backend.service.IncomingTransferService;
import com.application.backend.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @CrossOrigin(origins = "http://localhost:4200")
public class TransferController {

    @Autowired
    private TransferService transferService;

    @Autowired
    private IncomingTransferService incomingTransferService;

    @Autowired
    private TransferRepository transferRepository;

    @Autowired
    private IncomingTransferRepository incomingTransferRepository;

    @GetMapping("/transfers")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<OutgoingTransfers> getAllOutgoingTransfers() {
        return transferRepository.findAll();
    }

    @PostMapping("/transfers-post")
    public OutgoingTransfers createOutgoingTransfer(@RequestBody OutgoingTransfers outgoingTransfers) {
        return transferService.saveOutgoingTransfer(outgoingTransfers);
    }

    @GetMapping("/incoming-transfers")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<IncomingTransfers> getAllIncomingTransfers() {
        return incomingTransferRepository.findAll();
    }

    @PostMapping("/incoming-transfers-post")
    public IncomingTransfers createIncomingTransfer(@RequestBody IncomingTransfers incomingTransfers) {
        return incomingTransferService.saveIncomingTransfer(incomingTransfers);
    }
}
