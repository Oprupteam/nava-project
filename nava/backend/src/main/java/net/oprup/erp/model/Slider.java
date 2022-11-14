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
@Table(name="slider")
public class Slider implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="sliderId",nullable = false, updatable = false)
    private Long sliderId;
    private  String title;
    private String image;
    private Integer active;
    private LocalDate createdAt;
    private  LocalDate updatedAt;
    private  LocalDate deletedAt;
    private Integer deleteFlag;


//    @ManyToOne(targetEntity = Cities.class,fetch = FetchType.EAGER)
//    @JoinColumn(name = "citiesId",referencedColumnName = "citiesId")
//    private Cities cities ;

    public Long getSliderId() {
        return sliderId;
    }

    public void setSliderId(Long sliderId) {
        this.sliderId = sliderId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getActive() {
        return active;
    }

    public void setActive(Integer active) {
        this.active = active;
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

//    public Cities getCities() {
//        return cities;
//    }
//
//    public void setCities(Cities cities) {
//        this.cities = cities;
//    }
}