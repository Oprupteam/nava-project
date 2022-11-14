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
@Table(name="categories")
public class Categories implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="categoriesId",nullable = false, updatable = false)
    private long categoriesId ;
    private String title ;
    private String icon ;
    private  String guarantee_days;
    //private  String parent_id;
    private String status;
    private LocalDate createdAt;
    private  LocalDate updatedAt;
    private  LocalDate deletedAt;
    private Integer deleteFlag;

    @ManyToOne(targetEntity = Services.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "servicesId",referencedColumnName = "servicesId")
    private Services services ;



    public long getCategoriesId() {
        return categoriesId;
    }

    public void setCategoriesId(long categoriesId) {
        this.categoriesId = categoriesId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getGuarantee_days() {
        return guarantee_days;
    }

    public void setGuarantee_days(String guarantee_days) {
        this.guarantee_days = guarantee_days;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Services getServices() {
        return services;
    }

    public void setServices(Services services) {
        this.services = services;
    }
}