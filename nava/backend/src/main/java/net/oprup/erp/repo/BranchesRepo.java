package net.oprup.erp.repo;


import net.oprup.erp.model.Branches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BranchesRepo extends JpaRepository<Branches, Long> {
    Optional<Branches> findByBranchesId(Long branchesId);

    @Query("select e from Branches e where e.deleteFlag =1")
    List<Branches> findBranchesByDeleteFlag();

//    List<Branches> findBranchesByCities(Cities cities);

}


