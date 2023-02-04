package com.application.backend.controller;

import com.application.backend.model.TransfersLimit;
import com.application.backend.repository.LimitRepository;
import com.application.backend.service.LimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @CrossOrigin(origins = "http://localhost:4200")
public class LimitController {

    @Autowired
    private LimitService limitService;

    @Autowired
    private LimitRepository limitRepository;

    @GetMapping("/limits")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<TransfersLimit> getAllLimits() {
        return limitRepository.findAll();
    }

    @PostMapping("/limits-post")
    public TransfersLimit createLimit(@RequestBody TransfersLimit transfersLimit) {
        return limitService.saveLimit(transfersLimit);
    }

    @DeleteMapping("/limit-delete/{id}")
    public void deleteLimit(@PathVariable(name = "id") int id) {
        limitService.deleteLimit(id);
    }

    @PutMapping("/limit-update")
    public ResponseEntity<TransfersLimit> updateLimit(@RequestBody TransfersLimit transfersLimit) {
        TransfersLimit update = limitService.updateLimit(transfersLimit);
        return new ResponseEntity<>(update, HttpStatus.OK);
    }
}
