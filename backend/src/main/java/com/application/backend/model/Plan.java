package com.application.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class Plan {

    @Id
    private int id;
    private BigDecimal amount;
    private String plan_desc;
    private int user_id;

    public Plan() {}

    public Plan(int id, BigDecimal amount, String plan_desc, int user_id) {
        this.id = id;
        this.amount = amount;
        this.plan_desc = plan_desc;
        this.user_id = user_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPlan_desc() {
        return plan_desc;
    }

    public void setPlan_desc(String plan_desc) {
        this.plan_desc = plan_desc;
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
        Plan plan = (Plan) o;
        return id == plan.id && user_id == plan.user_id && Objects.equals(amount, plan.amount) && Objects.equals(plan_desc, plan.plan_desc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, amount, plan_desc, user_id);
    }

    @Override
    public String toString() {
        return "Plan{" +
                "id=" + id +
                ", amount=" + amount +
                ", plan_desc='" + plan_desc + '\'' +
                ", user_id=" + user_id +
                '}';
    }
}
