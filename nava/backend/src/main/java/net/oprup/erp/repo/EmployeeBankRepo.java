package net.oprup.erp.repo;

import net.oprup.erp.model.Employee;
import net.oprup.erp.model.EmployeeBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeBankRepo extends JpaRepository<EmployeeBank, Long> {


    @Query(value = "select * from employee_bank as e where e.delete_flag =1 and e.employee_id =:employee_id",nativeQuery = true)
    List<EmployeeBank> findBanksByEmployeeId(@Param("employee_id") Employee employee);




//    void deleteEmployeeBankByEmployeeBankId(Long id);

    @Query("select e from EmployeeBank e where e.deleteFlag =1")
    List<EmployeeBank> findEmployeeBankByDeleteFlag();

}
