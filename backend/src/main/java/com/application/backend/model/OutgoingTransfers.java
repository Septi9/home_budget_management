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
    private BigDecimal account_balance_before;
    private BigDecimal account_balance_after;
    private String destination_account;
    private Date transfer_date;
    private String outgoing_email;

    public OutgoingTransfers() {}

    public OutgoingTransfers(BigDecimal transfer_amount, BigDecimal account_balance_before, BigDecimal account_balance_after, String destination_account, Date transfer_date, String outgoing_email) {
        this.transfer_amount = transfer_amount;
        this.account_balance_before = account_balance_before;
        this.account_balance_after = account_balance_after;
        this.destination_account = destination_account;
        this.transfer_date = transfer_date;
        this.outgoing_email = outgoing_email;
    }

    public BigDecimal getTransfer_amount() {
        return transfer_amount;
    }

    public void setTransfer_amount(BigDecimal transfer_amount) {
        this.transfer_amount = transfer_amount;
    }

    public BigDecimal getAccount_balance_before() {
        return account_balance_before;
    }

    public void setAccount_balance_before(BigDecimal account_balance_before) {
        this.account_balance_before = account_balance_before;
    }

    public BigDecimal getAccount_balance_after() {
        return account_balance_after;
    }

    public void setAccount_balance_after(BigDecimal account_balance_after) {
        this.account_balance_after = account_balance_after;
    }

    public String getDestination_account() {
        return destination_account;
    }

    public void setDestination_account(String destination_account) {
        this.destination_account = destination_account;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OutgoingTransfers that = (OutgoingTransfers) o;
        return id == that.id && transfer_amount.equals(that.transfer_amount) && account_balance_before.equals(that.account_balance_before) && account_balance_after.equals(that.account_balance_after) && destination_account.equals(that.destination_account) && transfer_date.equals(that.transfer_date) && outgoing_email.equals(that.outgoing_email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, transfer_amount, account_balance_before, account_balance_after, destination_account, transfer_date, outgoing_email);
    }

    @Override
    public String toString() {
        return "OutgoingTransfer{" +
                "id=" + id +
                ", transfer_amount=" + transfer_amount +
                ", account_balance_before=" + account_balance_before +
                ", account_balance_after=" + account_balance_after +
                ", destination_account='" + destination_account + '\'' +
                ", transfer_date=" + transfer_date +
                ", outgoing_email='" + outgoing_email + '\'' +
                '}';
    }
}
