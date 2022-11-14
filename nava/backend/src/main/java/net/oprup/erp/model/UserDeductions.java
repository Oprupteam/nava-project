package net.oprup.erp.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="UserDeductions")
public class UserDeductions implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userDeductionsId",nullable = false, updatable = false)
    private Long userDeductionsId;
    private Double balance;
    private String notes;
    private Integer adminId;
    private LocalDate createdAt;
    private  LocalDate updatedAt;
    private  LocalDate deletedAt;
    private Integer deleteFlag;

//    @ManyToOne(targetEntity = Orders.class,fetch = FetchType.EAGER)
//    @JoinColumn(name = "ordersId",referencedColumnName = "ordersId")
    private String orders ;

//    @ManyToOne(targetEntity = Users.class,fetch = FetchType.EAGER)
//    @JoinColumn(name = "usersId",referencedColumnName = "usersId")
    private String users ;

    public Long getUserDeductionsId() {
        return userDeductionsId;
    }

    public void setUserDeductionsId(Long userDeductionsId) {
        this.userDeductionsId = userDeductionsId;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDate getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getOrders() {
        return orders;
    }

    public void setOrders(String orders) {
        this.orders = orders;
    }

    public String getUsers() {
        return users;
    }

    public void setUsers(String users) {
        this.users = users;
    }
}
