package com.application.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Entity
public class IncomingTransfers {

    @Id
    private int id;
    private BigDecimal transfer_amount;
    private String description;
    private Date transfer_date;
    private String incoming_email;
    private String category;

    public IncomingTransfers() {}

    public IncomingTransfers(int id, BigDecimal transfer_amount, String description, Date transfer_date, String incoming_email, String category) {
        this.id = id;
        this.transfer_amount = transfer_amount;
        this.description = description;
        this.transfer_date = transfer_date;
        this.incoming_email = incoming_email;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getTransfer_amount() {
        return transfer_amount;
    }

    public void setTransfer_amount(BigDecimal transfer_amount) {
        this.transfer_amount = transfer_amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String sender_account) {
        this.description = sender_account;
    }

    public Date getTransfer_date() {
        return transfer_date;
    }

    public void setTransfer_date(Date transfer_date) {
        this.transfer_date = transfer_date;
    }

    public String getIncoming_email() {
        return incoming_email;
    }

    public void setIncoming_email(String incoming_email) {
        this.incoming_email = incoming_email;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IncomingTransfers that = (IncomingTransfers) o;
        return id == that.id && Objects.equals(transfer_amount, that.transfer_amount) && Objects.equals(description, that.description) && Objects.equals(transfer_date, that.transfer_date) && Objects.equals(incoming_email, that.incoming_email) && Objects.equals(category, that.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, transfer_amount, description, transfer_date, incoming_email, category);
    }

    @Override
    public String toString() {
        return "IncomingTransfers{" +
                "id=" + id +
                ", transfer_amount=" + transfer_amount +
                ", sender_account='" + description + '\'' +
                ", transfer_date=" + transfer_date +
                ", incoming_email='" + incoming_email + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
