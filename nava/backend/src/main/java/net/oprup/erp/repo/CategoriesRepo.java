package net.oprup.erp.repo;

import net.oprup.erp.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoriesRepo extends JpaRepository<Categories, Long> {
    Optional<Categories> findByCategoriesId(Long categoriesId);

    @Query("select e from Categories e where e.deleteFlag =1")
    List<Categories> findCategoriesByDeleteFlag();


}
