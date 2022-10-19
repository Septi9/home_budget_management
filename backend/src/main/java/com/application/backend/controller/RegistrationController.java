package com.application.backend.controller;

import com.application.backend.model.ApplicationUser;
import com.application.backend.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public ApplicationUser userRegistration(@RequestBody ApplicationUser applicationUser) throws Exception {
        if (applicationUser.getEmail() != null && !"".equals(applicationUser.getEmail())) {
            if (registrationService.validateUserByEmail(applicationUser.getEmail()) != null) {
                throw new Exception(applicationUser.getEmail() + " already exists");
            }
        }
        return registrationService.saveRegisteredUser(applicationUser);
    }

    @PostMapping("/login")
    public ApplicationUser userLogin(@RequestBody ApplicationUser applicationUser) throws Exception {
        if (applicationUser.getEmail() != null && applicationUser.getPassword() != null) {
            if (registrationService.validateUserByEmailAndPassword(applicationUser.getEmail(), applicationUser.getPassword()) == null) {
                throw new Exception("Incorrect email or password");
            }
        }
        return registrationService.validateUserByEmailAndPassword(applicationUser.getEmail(), applicationUser.getPassword());
    }


}
