package net.oprup.erp.service;

import net.oprup.erp.exception.NotFoundException;
import net.oprup.erp.model.Employee;
import net.oprup.erp.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EmployeeService {

    private  EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee){
        employee.setDeleteFlag(1);
        // return employeeRepo.save(employee);
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployee(){
        return employeeRepo.findAllEmployees();
    }

    public Employee updateEmployee(Employee employee){
        employee.setDeleteFlag(1);
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeByEmployeeId(Long employeeId){
        return employeeRepo.findByEmployeeId(employeeId)
                .orElseThrow(() -> new NotFoundException("Employee by id: " + employeeId + " not found"));
    }

    public  Employee deleteEmployee(Employee employee){
        employee.setDeleteFlag(0);
        return employeeRepo.save(employee);
    }

}
