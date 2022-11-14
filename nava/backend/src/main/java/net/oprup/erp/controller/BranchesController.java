package net.oprup.erp.controller;


import net.oprup.erp.model.Branches;
import net.oprup.erp.service.BranchesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Branches")
@CrossOrigin(origins = "*")
public class BranchesController {
    private final BranchesService branchesService;
    @Autowired
    public BranchesController(BranchesService branchesService) {
        this.branchesService = branchesService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Branches>> getAllBranches(){
        List<Branches> Branches = branchesService.findAllBranches();
        return new ResponseEntity<>(Branches, HttpStatus.OK);
    }

    @GetMapping("/find/{branchesId}")
    public ResponseEntity<Branches> getBranchesById(@PathVariable("branchesId") Long branchesId){
        Branches branches = branchesService.findBranchesById(branchesId);
        return new ResponseEntity<>(branches, HttpStatus.OK);
    }

//    @GetMapping("branchesby/{citiesId}")
//    public ResponseEntity<?> getBranchesBycitiesId(@PathVariable("citiesId") Long citiesId){
//        Cities emp =  new Cities();
//        emp.setCitiesId(citiesId);
//        List<Branches> Branches = branchesService.findBranchesByCities(emp);
//        return new ResponseEntity<>(Branches, HttpStatus.OK);
//    }

    @PostMapping("/add")
    public ResponseEntity<Branches> addBranches(@RequestBody Branches branches){
        Branches newBranches = branchesService.addBranches(branches);
        return new ResponseEntity<>(newBranches, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Branches> updateBranches(@RequestBody Branches branches){
        Branches updateBranches = branchesService.updateBranches(branches);
        return new ResponseEntity<>(updateBranches, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Branches> deleteDepartment(@RequestBody Branches branches){
        Branches deleteBranches = branchesService.deleteBranches(branches);
        return new ResponseEntity<>(deleteBranches, HttpStatus.OK);
    }


}

