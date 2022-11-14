package net.oprup.erp.controller;


import net.oprup.erp.model.Parts;
import net.oprup.erp.service.PartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Parts")
@CrossOrigin(origins = "*")
public class PartsController {
    private final PartsService partsService;
    @Autowired
    public PartsController(PartsService partsService) {
        this.partsService = partsService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Parts>> getAllParts(){
        List<Parts> Parts = partsService.findAllParts();
        return new ResponseEntity<>(Parts, HttpStatus.OK);
    }

    @GetMapping("/find/{partsId}")
    public ResponseEntity<Parts> getPartsById(@PathVariable("partsId") Long partsId){
        Parts parts = partsService.findPartsById(partsId);
        return new ResponseEntity<>(parts, HttpStatus.OK);
    }

//    @GetMapping("partsby/{servicesId}")
//    public ResponseEntity<?> getPartsByServicesId(@PathVariable("servicesId") Long servicesId){
//        Services emp =  new Services();
//        emp.setServicesId(servicesId);
//
//        List<Parts> Parts = partsService.findPartsByServices(emp);
//        return new ResponseEntity<>(Parts, HttpStatus.OK);
//    }

    @PostMapping("/add")
    public ResponseEntity<Parts> addParts(@RequestBody Parts parts){
        Parts newParts = partsService.addParts(parts);
        return new ResponseEntity<>(newParts, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Parts> updateParts(@RequestBody Parts parts){
        Parts updateParts = partsService.updateParts(parts);
        return new ResponseEntity<>(updateParts, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Parts> deleteDepartment(@RequestBody Parts parts){
        Parts deleteParts = partsService.deleteParts(parts);
        return new ResponseEntity<>(deleteParts, HttpStatus.OK);
    }

}

