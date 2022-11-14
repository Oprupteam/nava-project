package net.oprup.erp.model;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
@NoArgsConstructor
@Entity
@Table(name="employee")
public class Employee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employeeId", nullable = false, updatable = false)

    private Long employeeId;
    private String dateOfBirth;
    private String dateOfJoin;
    private String placeOfBirth;
    private String employeeName;
    private String employeeNameAr;
    private String image;
    private String birthOfDate;
    private String gender;
    private String nationality;
    private String maritalStatus;
    private String religion;
    private String employeeCode;
    private String employeeAddress;
    private String jobStatus;
    private String hijriDateOfJoin;
    private Integer deleteFlag;

//    public void setEmployeeType(EmployeeType employeeType) {
//        this.employeeType = employeeType;
//    }
//
//    @ManyToOne(targetEntity = EmployeeType.class,fetch = FetchType.EAGER)
//    @JoinColumn(name = "employeeTypeId",referencedColumnName = "employeeTypeId",nullable = false)
//    private EmployeeType employeeType;

//    @ManyToOne(targetEntity = JobTitle.class,fetch = FetchType.EAGER)
//    @JoinColumn(name = "jobTitleId",referencedColumnName = "jobTitleId",nullable = false)
//    private JobTitle jobTitle;

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getDateOfJoin() {
        return dateOfJoin;
    }

    public void setDateOfJoin(String dateOfJoin) {
        this.dateOfJoin = dateOfJoin;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeNameAr() {
        return employeeNameAr;
    }

    public void setEmployeeNameAr(String employeeNameAr) {
        this.employeeNameAr = employeeNameAr;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBirthOfDate() {
        return birthOfDate;
    }

    public void setBirthOfDate(String birthOfDate) {
        this.birthOfDate = birthOfDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

 
    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getEmployeeAddress() {
        return employeeAddress;
    }

    public void setEmployeeAddress(String employeeAddress) {
        this.employeeAddress = employeeAddress;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public String getHijriDateOfJoin() {
        return hijriDateOfJoin;
    }

    public void setHijriDateOfJoin(String hijriDateOfJoin) {
        this.hijriDateOfJoin = hijriDateOfJoin;
    }

    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

//    public EmployeeType getEmployeeType() {
//        return employeeType;
//    }


}
