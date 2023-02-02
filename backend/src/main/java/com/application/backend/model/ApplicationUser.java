package com.application.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class ApplicationUser {

    @Id
    private int id;
    private String email;
    private String firstname;
    private String lastname;
    private String password;
    private BigDecimal account_balance;

    public ApplicationUser() {}

    public ApplicationUser(int id, String email, String firstname, String lastname, String password, BigDecimal account_balance) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.account_balance = account_balance;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public BigDecimal getAccount_balance() {
        return account_balance;
    }

    public void setAccount_balance(BigDecimal accountBalance) {
        this.account_balance = accountBalance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ApplicationUser that = (ApplicationUser) o;
        return id == that.id && Objects.equals(email, that.email) && Objects.equals(firstname, that.firstname) && Objects.equals(lastname, that.lastname) && Objects.equals(password, that.password) && Objects.equals(account_balance, that.account_balance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, firstname, lastname, password, account_balance);
    }

    @Override
    public String toString() {
        return "ApplicationUser{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", password='" + password + '\'' +
                ", accountBalance=" + account_balance +
                '}';
    }
}
