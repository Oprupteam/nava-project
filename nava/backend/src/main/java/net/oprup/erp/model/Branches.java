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
@Table(name="branches")
public class Branches implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="branchesId",nullable = false, updatable = false)
   private Long branchesId;
    private String title;
    private Integer assignDeadline;
//    @ManyToOne(targetEntity = Cities.class,fetch = FetchType.EAGER)
//    @JoinColumn(name = "citiesId",referencedColumnName = "citiesId")
    private String cities ;
    private LocalDate createdAt;
    private  LocalDate updatedAt;
    private  LocalDate deletedAt;
    private Integer deleteFlag;

    public Long getBranchesId() {
        return branchesId;
    }

    public void setBranchesId(Long branchesId) {
        this.branchesId = branchesId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getAssignDeadline() {
        return assignDeadline;
    }

    public void setAssignDeadline(Integer assignDeadline) {
        this.assignDeadline = assignDeadline;
    }

//    public Cities getCities() {
//        return cities;
//    }
//
//    public void setCities(Cities cities) {
//        this.cities = cities;
//    }

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
}
