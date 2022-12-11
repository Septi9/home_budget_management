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
    private BigDecimal account_balance_before;
    private BigDecimal account_balance_after;
    private String sender_account;
    private Date transfer_date;
    private String incoming_email;

    public IncomingTransfers() {}

    public IncomingTransfers(int id, BigDecimal transfer_amount, BigDecimal account_balance_before, BigDecimal account_balance_after, String sender_account, Date transfer_date, String incoming_email) {
        this.id = id;
        this.transfer_amount = transfer_amount;
        this.account_balance_before = account_balance_before;
        this.account_balance_after = account_balance_after;
        this.sender_account = sender_account;
        this.transfer_date = transfer_date;
        this.incoming_email = incoming_email;
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

    public String getSender_account() {
        return sender_account;
    }

    public void setSender_account(String sender_account) {
        this.sender_account = sender_account;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IncomingTransfers that = (IncomingTransfers) o;
        return id == that.id && transfer_amount.equals(that.transfer_amount) && account_balance_before.equals(that.account_balance_before) && account_balance_after.equals(that.account_balance_after) && sender_account.equals(that.sender_account) && transfer_date.equals(that.transfer_date) && incoming_email.equals(that.incoming_email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, transfer_amount, account_balance_before, account_balance_after, sender_account, transfer_date, incoming_email);
    }

    @Override
    public String toString() {
        return "IncomingTransfers{" +
                "id=" + id +
                ", transfer_amount=" + transfer_amount +
                ", account_balance_before=" + account_balance_before +
                ", account_balance_after=" + account_balance_after +
                ", sender_account='" + sender_account + '\'' +
                ", transfer_date=" + transfer_date +
                ", incoming_email='" + incoming_email + '\'' +
                '}';
    }
}
