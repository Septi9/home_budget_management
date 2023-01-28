package com.application.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Entity
public class OutgoingTransfers {

    @Id
    private int id;
    private BigDecimal transfer_amount;
    private String description;
    private Date transfer_date;
    private String outgoing_email;
    private String category;

    public OutgoingTransfers() {}

    public OutgoingTransfers(int id, BigDecimal transfer_amount, String description, Date transfer_date, String outgoing_email, String category) {
        this.id = id;
        this.transfer_amount = transfer_amount;
        this.description = description;
        this.transfer_date = transfer_date;
        this.outgoing_email = outgoing_email;
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

    public void setDescription(String destination_account) {
        this.description = destination_account;
    }

    public Date getTransfer_date() {
        return transfer_date;
    }

    public void setTransfer_date(Date transfer_date) {
        this.transfer_date = transfer_date;
    }

    public String getOutgoing_email() {
        return outgoing_email;
    }

    public void setOutgoing_email(String outgoing_email) {
        this.outgoing_email = outgoing_email;
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
        OutgoingTransfers that = (OutgoingTransfers) o;
        return id == that.id && Objects.equals(transfer_amount, that.transfer_amount) && Objects.equals(description, that.description) && Objects.equals(transfer_date, that.transfer_date) && Objects.equals(outgoing_email, that.outgoing_email) && Objects.equals(category, that.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, transfer_amount, description, transfer_date, outgoing_email, category);
    }

    @Override
    public String toString() {
        return "OutgoingTransfers{" +
                "id=" + id +
                ", transfer_amount=" + transfer_amount +
                ", destination_account='" + description + '\'' +
                ", transfer_date=" + transfer_date +
                ", outgoing_email='" + outgoing_email + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
