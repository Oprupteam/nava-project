package net.oprup.erp.controller;
import net.oprup.erp.model.Bank;
import net.oprup.erp.service.BankService;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@EnableAutoConfiguration
@RestController
@RequestMapping("/bank")
@CrossOrigin("*")

public class BankController {

    private BankService bankService;

    public BankController(BankService bankService) {
        this.bankService = bankService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Bank>> getAllBank(){
        List<Bank> bank=bankService.findAllBank();
        return new ResponseEntity<>(bank, HttpStatus.OK);
    }

    @GetMapping("/find/{bankId}")
    public ResponseEntity<Bank> getBankById(@PathVariable("bankId") Long bankId){
        Bank bank = bankService.findBankByBankId(bankId);
        return new ResponseEntity<>(bank, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Bank> addBank(@RequestBody Bank bank){
        Bank newBank = bankService.addBank(bank);
        return new ResponseEntity<>(newBank, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Bank> updateBank(@RequestBody Bank bank ){
        Bank updateBank = bankService.updateBank(bank);
        return new ResponseEntity<>(updateBank, HttpStatus.OK);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> deleteBank(@PathVariable("id") Bank id) {
        bankService.deleteBank(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
