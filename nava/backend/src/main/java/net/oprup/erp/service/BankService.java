package net.oprup.erp.service;

import net.oprup.erp.exception.NotFoundException;
import net.oprup.erp.model.Bank;
import net.oprup.erp.repo.BankRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class BankService {

    private  BankRepo bankRepo;

    @Autowired
    public BankService(BankRepo bankRepo) {
        this.bankRepo = bankRepo;
    }

    public Bank addBank(Bank bank){
        bank.setDeleteFlag(1);
        // return bankRepo.save(bank);
        return bankRepo.save(bank);
    }

    public List<Bank> findAllBank(){
        return bankRepo.findAllBanks();
    }

    public Bank updateBank(Bank bank){
        bank.setDeleteFlag(1);
        return bankRepo.save(bank);
    }

    public Bank findBankByBankId(Long bankId){
        return bankRepo.findByBankId(bankId)
                .orElseThrow(() -> new NotFoundException("Bank by id: " + bankId + " not found"));
    }

    public  Bank deleteBank(Bank bank){
        bank.setDeleteFlag(0);
        return bankRepo.save(bank);
    }

}
