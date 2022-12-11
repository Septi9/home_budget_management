package com.application.backend.controller;

import com.application.backend.model.OutgoingTransfers;
import com.application.backend.repository.TransferRepository;
import com.application.backend.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @CrossOrigin(origins = "http://localhost:4200")
public class TransferController {

    @Autowired
    private TransferService transferService;

    @Autowired
    private TransferRepository transferRepository;

    @GetMapping("/transfers")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<OutgoingTransfers> getAllOutgoingTransfers() {
        return transferRepository.findAll();
    }

    @PostMapping("/transfers-post")
    public OutgoingTransfers createOutgoingTransfer(@RequestBody OutgoingTransfers outgoingTransfers) {
        return transferService.saveOutgoingTransfer(outgoingTransfers);
    }



//    @PostMapping("/transfers-post")
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    public ResponseEntity<OutgoingTransfers> createOutgoingTransfer(@RequestBody OutgoingTransfers outgoingTransfers) {
//        try {
//            OutgoingTransfers _outgoingTransfers = transferService.saveOutgoingTransfer(
//                    new OutgoingTransfers(
//                            outgoingTransfers.getTransfer_amount(),
//                            outgoingTransfers.getAccount_balance_before(),
//                            outgoingTransfers.getAccount_balance_after(),
//                            outgoingTransfers.getDestination_account(),
//                            outgoingTransfers.getTransfer_date(),
//                            outgoingTransfers.getOutgoing_email()));
//            return new ResponseEntity<>(_outgoingTransfers, HttpStatus.CREATED);
//        } catch (Exception e) {
//            System.out.println("HELLO");
//            return new ResponseEntity<OutgoingTransfers>((OutgoingTransfers) null, HttpStatus.CREATED);
//        }
//    }
}
