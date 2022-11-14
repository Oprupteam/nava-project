package net.oprup.erp.repo;

import net.oprup.erp.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankRepo extends JpaRepository<Bank,Long> {

    Optional<Bank> findByBankId(Long bankId);

    void deleteByBankId(Long id);

    @Query("select e from Bank e where e.deleteFlag =1")
    List<Bank> findAllBanks();

}