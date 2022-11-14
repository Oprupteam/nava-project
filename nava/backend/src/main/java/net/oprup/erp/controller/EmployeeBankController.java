package net.oprup.erp.controller;

import net.oprup.erp.model.Employee;
import net.oprup.erp.model.EmployeeBank;
import net.oprup.erp.service.EmployeeBankService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employeeBank")
@CrossOrigin(origins = "*")
public class EmployeeBankController {
    private final EmployeeBankService employeeBankService;

    public EmployeeBankController(EmployeeBankService employeeBankService) {
        this.employeeBankService = employeeBankService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<EmployeeBank>> getAll(){
        List<EmployeeBank> employeeBank = employeeBankService.findAllEmployeeBank();
        return new ResponseEntity<>(employeeBank, HttpStatus.OK);
    }


    @GetMapping("/find/{employeeId}")
    public ResponseEntity<?> getBanksByEmployeeId(@PathVariable("employeeId") Long employeeId){
        Employee emp = new Employee();
        emp.setEmployeeId(employeeId);
        List<EmployeeBank> employeeBanks = employeeBankService.getBanksByEmployeeId(emp);
        return new ResponseEntity<>(employeeBanks, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<EmployeeBank> addEmployeeBank(@RequestBody EmployeeBank employeeBank){
        EmployeeBank newEmployeeBank = employeeBankService.addEmployeeBank(employeeBank);
        return new ResponseEntity<>(newEmployeeBank, HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<EmployeeBank> updateEmployeeBank(@RequestBody EmployeeBank employeeBank){
        EmployeeBank updateEmployeeBank = employeeBankService.updateEmployeeBank(employeeBank);
        return new ResponseEntity<>(updateEmployeeBank, HttpStatus.OK);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployeeBank(@PathVariable("id") EmployeeBank id) {
        employeeBankService.deleteEmployeeBank(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
