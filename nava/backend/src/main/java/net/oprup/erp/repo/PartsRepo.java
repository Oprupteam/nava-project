package net.oprup.erp.repo;

import net.oprup.erp.model.Parts;
import net.oprup.erp.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PartsRepo extends JpaRepository<Parts, Long> {
    Optional<Parts> findBypartsId(Long partsId);

    @Query("select e from Parts e where e.deleteFlag =1")
    List<Parts> findPartsByDeleteFlag();

//    List<Parts> findPartsByServices(Services services);

//    List<Parts> findPartsByServices(Services services);


}