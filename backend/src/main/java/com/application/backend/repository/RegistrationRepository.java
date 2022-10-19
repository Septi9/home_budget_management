package com.application.backend.repository;

import com.application.backend.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<ApplicationUser, Integer> {
    ApplicationUser findUserByEmail(String email);
    ApplicationUser findUserByEmailAndPassword(String email, String password);
}
