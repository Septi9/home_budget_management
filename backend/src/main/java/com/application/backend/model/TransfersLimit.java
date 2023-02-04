package com.application.backend.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "transfers_limit")
public class TransfersLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private BigDecimal limit_amount;
    private String limit_category;
    private int user_id;

    public TransfersLimit() {}

    public TransfersLimit(int id, BigDecimal limit_amount, String limit_category, int user_id) {
        this.id = id;
        this.limit_amount = limit_amount;
        this.limit_category = limit_category;
        this.user_id = user_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getLimit_amount() {
        return limit_amount;
    }

    public void setLimit_amount(BigDecimal limit_amount) {
        this.limit_amount = limit_amount;
    }

    public String getLimit_category() {
        return limit_category;
    }

    public void setLimit_category(String limit_category) {
        this.limit_category = limit_category;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TransfersLimit transfersLimit = (TransfersLimit) o;
        return id == transfersLimit.id && user_id == transfersLimit.user_id && Objects.equals(limit_amount, transfersLimit.limit_amount) && Objects.equals(limit_category, transfersLimit.limit_category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, limit_amount, limit_category, user_id);
    }

    @Override
    public String toString() {
        return "Limit{" +
                "id=" + id +
                ", limit_amount=" + limit_amount +
                ", limit_category='" + limit_category + '\'' +
                ", user_id=" + user_id +
                '}';
    }
}
