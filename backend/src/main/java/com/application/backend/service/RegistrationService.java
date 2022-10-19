package com.application.backend.service;

import com.application.backend.model.ApplicationUser;
import com.application.backend.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    public ApplicationUser saveRegisteredUser(ApplicationUser applicationUser) {
        return registrationRepository.save(applicationUser);
    }

    public ApplicationUser validateUserByEmail(String email) {
        return registrationRepository.findUserByEmail(email);
    }

    public ApplicationUser validateUserByEmailAndPassword(String email, String password) {
        return registrationRepository.findUserByEmailAndPassword(email, password);
    }


}
