package com.application.backend.controller;

import com.application.backend.model.ApplicationUser;
import com.application.backend.model.OutgoingTransfers;
import com.application.backend.model.Plan;
import com.application.backend.repository.RegistrationRepository;
import com.application.backend.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private RegistrationRepository registrationRepository;

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:4200")
    public ApplicationUser userRegistration(@RequestBody ApplicationUser applicationUser) throws Exception {
        if (applicationUser.getEmail() != null && !"".equals(applicationUser.getEmail())) {
            if (registrationService.validateUserByEmail(applicationUser.getEmail()) != null) {
                throw new Exception(applicationUser.getEmail() + " already exists");
            }
        }
        return registrationService.saveRegisteredUser(applicationUser);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200")
    public ApplicationUser userLogin(@RequestBody ApplicationUser applicationUser) throws Exception {
        if (applicationUser.getEmail() != null && applicationUser.getPassword() != null) {
            if (registrationService.validateUserByEmailAndPassword(applicationUser.getEmail(), applicationUser.getPassword()) == null) {
                throw new Exception("Incorrect email or password");
            }
        }
        return registrationService.validateUserByEmailAndPassword(applicationUser.getEmail(), applicationUser.getPassword());
    }

    @GetMapping("/users")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<ApplicationUser> getAllUsers() {
        return registrationRepository.findAll();
    }

    @PutMapping("/user-update")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<ApplicationUser> updateUser(@RequestBody ApplicationUser applicationUser) {
        System.out.println(applicationUser + " controller");
        ApplicationUser update = registrationService.updateUser(applicationUser);
        return new ResponseEntity<>(update, HttpStatus.OK);
    }



}
