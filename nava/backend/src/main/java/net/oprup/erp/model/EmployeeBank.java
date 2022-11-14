package net.oprup.erp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="employeeBank")
public class EmployeeBank implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employeeBankId", nullable = false, updatable = false)

    private Long employeeBankId;
    private Integer deleteFlag;
    @ManyToOne(targetEntity = Bank.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "bankId",referencedColumnName = "bankId",nullable = false)
    private Bank bank;


    @ManyToOne(targetEntity = Employee.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "employeeId",referencedColumnName = "employeeId",nullable = false)
    private Employee employee;

    public Long getEmployeeBankId() {
        return employeeBankId;
    }

    public void setEmployeeBankId(Long employeeBankId) {
        this.employeeBankId = employeeBankId;
    }

    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }


    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
