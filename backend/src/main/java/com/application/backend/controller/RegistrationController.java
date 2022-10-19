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
        String email = applicationUser.getEmail();

        if (email != null && !"".equals(email)) {
            if (registrationService.validateUserByEmail(email) != null) {
                throw new Exception(email + " already exists");
            }
        }
        return registrationService.saveRegisteredUser(applicationUser);
    }

}
