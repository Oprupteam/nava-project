package net.oprup.erp.repo;


import net.oprup.erp.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ServicesRepo extends JpaRepository<Services, Long> {
    Optional<Services> findByServicesId(Long servicesId);

    @Query("select e from Services e where e.deleteFlag =1")
    List<Services> findServicesByDeleteFlag();

//    @Query(value = "SELECT * FROM Services AS u WHERE u.categories_id=:categories_id AND u.delete_flag=1",nativeQuery = true)
//    List<Services> findServicesByCategories(@Param("categories_id") Categories emp);

}
