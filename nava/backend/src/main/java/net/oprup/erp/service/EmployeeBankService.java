package net.oprup.erp.service;

import net.oprup.erp.model.Employee;
import net.oprup.erp.model.EmployeeBank;
import net.oprup.erp.repo.EmployeeBankRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EmployeeBankService {

    private  EmployeeBankRepo employeeBankRepo;

    @Autowired
    public EmployeeBankService(EmployeeBankRepo employeeBankRepo) {
        this.employeeBankRepo = employeeBankRepo;
    }

    public EmployeeBank addEmployeeBank(EmployeeBank employeeBank){
        employeeBank.setDeleteFlag(1);
        // return employeeBankRepo.save(employeeBank);
        return employeeBankRepo.save(employeeBank);
    }

    public List<EmployeeBank> findAllEmployeeBank(){
        return employeeBankRepo.findEmployeeBankByDeleteFlag();
    }

    public EmployeeBank updateEmployeeBank(EmployeeBank employeeBank){
        employeeBank.setDeleteFlag(1);
        return employeeBankRepo.save(employeeBank);
    }

    public List<EmployeeBank> getBanksByEmployeeId(Employee employee){
        return employeeBankRepo.findBanksByEmployeeId(employee);
    }

//    public EmployeeBank findBanksByEmployeeId(Long employeeId){
//        return employeeBankRepo.findBanksByEmployeeId(Employee employee)
//                .orElseThrow(() -> new NotFoundException("Banks by id: " + employeeId + " not found"));
//    }

    public  EmployeeBank deleteEmployeeBank(EmployeeBank employeeBank){
        employeeBank.setDeleteFlag(0);
        return employeeBankRepo.save(employeeBank);
    }

}
