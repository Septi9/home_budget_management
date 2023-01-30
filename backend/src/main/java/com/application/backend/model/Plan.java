package com.application.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Entity
public class Plan {

    @Id
    private int id;
    private BigDecimal amount;
    private String plan_desc;
    private int user_id;
    private String description;
    private Date date;
    private boolean is_periodic;

    public Plan() {}

    public Plan(int id, BigDecimal amount, String plan_desc, int user_id, String description, Date date, boolean is_periodic) {
        this.id = id;
        this.amount = amount;
        this.plan_desc = plan_desc;
        this.user_id = user_id;
        this.description = description;
        this.date = date;
        this.is_periodic = is_periodic;
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

    public boolean isIs_periodic() {
        return is_periodic;
    }

    public void setIs_periodic(boolean is_periodic) {
        this.is_periodic = is_periodic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plan plan = (Plan) o;
        return id == plan.id && user_id == plan.user_id && is_periodic == plan.is_periodic && Objects.equals(amount, plan.amount) && Objects.equals(plan_desc, plan.plan_desc) && Objects.equals(description, plan.description) && Objects.equals(date, plan.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, amount, plan_desc, user_id, description, date, is_periodic);
    }

    @Override
    public String toString() {
        return "Plan{" +
                "id=" + id +
                ", amount=" + amount +
                ", plan_desc='" + plan_desc + '\'' +
                ", user_id=" + user_id +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", isPeriodic=" + is_periodic +
                '}';
    }
}
