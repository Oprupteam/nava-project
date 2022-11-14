package net.oprup.erp.service;

import net.oprup.erp.exception.NotFoundException;
import net.oprup.erp.model.Branches;
import net.oprup.erp.repo.BranchesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class BranchesService {

    private BranchesRepo branchesRepo;
    @Autowired
    public BranchesService(BranchesRepo branchesRepo) {
        this.branchesRepo = branchesRepo;
    }


    public List<Branches> findAllBranches()
    {
        return  branchesRepo.findBranchesByDeleteFlag();
    }

//    public  List<Branches> findBranchesByCities(Cities cities){
//        return  branchesRepo.findBranchesByCities(cities);
//    }

    public Branches findBranchesById(Long branchesId){
        return branchesRepo.findByBranchesId(branchesId)
                .orElseThrow(() -> new NotFoundException("Branches by id: " + branchesId + " not found"));
    }
    public Branches addBranches(Branches branches){
        branches.setDeleteFlag(1);
        return branchesRepo.save(branches);
    }

    public Branches updateBranches(Branches branches){
        branches.setDeleteFlag(1);
        return branchesRepo.save(branches);
    }

    public Branches deleteBranches(Branches branches){
        branches.setDeleteFlag(0);
        return branchesRepo.save(branches);
    }



}
