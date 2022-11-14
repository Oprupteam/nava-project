package net.oprup.erp.service;


import net.oprup.erp.exception.NotFoundException;
import net.oprup.erp.model.Categories;
import net.oprup.erp.repo.CategoriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CategoriesService {
    private  final CategoriesRepo categoriesRepo;

    @Autowired
    public CategoriesService(CategoriesRepo categoriesRepo) {
        this.categoriesRepo = categoriesRepo;
    }


    public List<Categories> findAllCategories()
    {
        return  categoriesRepo.findCategoriesByDeleteFlag();
    }

    public Categories findCategoriesById(Long categoriesId){
        return categoriesRepo.findByCategoriesId(categoriesId)
                .orElseThrow(() -> new NotFoundException("Categories by id: " + categoriesId + " not found"));
    }
    public Categories addCategories(Categories categories){
        categories.setDeleteFlag(1);
        return categoriesRepo.save(categories);
    }

    public Categories updateCategories(Categories categories){
        categories.setDeleteFlag(1);
        return categoriesRepo.save(categories);
    }

    public Categories deleteCategories(Categories categories){
        categories.setDeleteFlag(0);
        return categoriesRepo.save(categories);
    }

}


