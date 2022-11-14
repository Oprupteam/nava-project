package net.oprup.erp.controller;

import net.oprup.erp.model.Categories;
import net.oprup.erp.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Categories")
@CrossOrigin(origins = "*")
public class CategoriesController {
    private final CategoriesService categoriesService;

    @Autowired
    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Categories>> getAllCategories(){
        List<Categories> Categories = categoriesService.findAllCategories();
        return new ResponseEntity<>(Categories, HttpStatus.OK);
    }

    @GetMapping("/find/{categoriesId}")
    public ResponseEntity<Categories> getCategoriesById(@PathVariable("categoriesId") Long categoriesId){
        Categories categories = categoriesService.findCategoriesById(categoriesId);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<Categories> addCategories(@RequestBody Categories categories){
        Categories newCategories = categoriesService.addCategories(categories);
        return new ResponseEntity<>(newCategories, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Categories> updateCategories(@RequestBody Categories categories){
        Categories updateCategories = categoriesService.updateCategories(categories);
        return new ResponseEntity<>(updateCategories, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Categories> deleteDepartment(@RequestBody Categories categories){
        Categories deleteCategories = categoriesService.deleteCategories(categories);
        return new ResponseEntity<>(deleteCategories, HttpStatus.OK);
    }
}
