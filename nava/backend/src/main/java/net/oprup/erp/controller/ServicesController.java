package net.oprup.erp.controller;


import net.oprup.erp.model.Services;
import net.oprup.erp.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Services")
@CrossOrigin(origins = "*")
public class ServicesController {
    private final ServicesService servicesService;

    @Autowired
    public ServicesController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Services>> getAllServices(){
        List<Services> Services = servicesService.findAllServices();
        return new ResponseEntity<>(Services, HttpStatus.OK);
    }

    @GetMapping("/find/{servicesId}")
    public ResponseEntity<Services> getServicesById(@PathVariable("servicesId") Long servicesId){
        Services services = servicesService.findServicesById(servicesId);
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

//    @GetMapping("servicesby/{categoriesId}")
//
//    public ResponseEntity<?> getServicesByCategoriesId(@PathVariable("categoriesId") Long categoriesId){
//        Categories emp =  new Categories();
//        emp.setCategoriesId(categoriesId);
//
//        List<Services> Services = servicesService.findServicesByCategories(emp);
//        return new ResponseEntity<>(Services, HttpStatus.OK);
//    }

    @PostMapping("/add")
    public ResponseEntity<Services> addServices(@RequestBody Services services){
        Services newServices = servicesService.addServices(services);
        return new ResponseEntity<>(newServices, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Services> updateServices(@RequestBody Services services){
        Services updateServices = servicesService.updateServices(services);
        return new ResponseEntity<>(updateServices, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Services> deleteDepartment(@RequestBody Services services){
        Services deleteServices = servicesService.deleteServices(services);
        return new ResponseEntity<>(deleteServices, HttpStatus.OK);
    }

}

