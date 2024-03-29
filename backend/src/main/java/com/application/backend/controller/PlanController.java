package com.application.backend.controller;

import com.application.backend.model.Plan;
import com.application.backend.repository.PlanRepository;
import com.application.backend.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @CrossOrigin(origins = "http://localhost:4200")
public class PlanController {

    @Autowired
    private PlanService planService;

    @Autowired
    private PlanRepository planRepository;

    @GetMapping("/plans")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    @PostMapping("/plans-post")
    public Plan createPlan(@RequestBody Plan plan) {
        return planService.savePlan(plan);
    }

    @DeleteMapping("/plan-delete/{id}")
    public void deletePlan(@PathVariable(name = "id") int id) {
        planService.deletePlan(id);
    }

    @PutMapping("/plan-update")
    public ResponseEntity<Plan> updatePlan(@RequestBody Plan plan) {
        Plan update = planService.updatePlan(plan);
        return new ResponseEntity<>(update, HttpStatus.OK);
    }

}
