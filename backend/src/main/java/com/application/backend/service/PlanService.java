package com.application.backend.service;

import com.application.backend.model.Plan;
import com.application.backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public Plan savePlan(Plan plan) {
        return planRepository.save(plan);
    }

    public void deletePlan(int id) {
         planRepository.deleteById(id);
    }
}
