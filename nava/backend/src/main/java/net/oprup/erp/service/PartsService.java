package net.oprup.erp.service;

import net.oprup.erp.exception.NotFoundException;
import net.oprup.erp.model.Parts;
import net.oprup.erp.repo.PartsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class PartsService {
    private final PartsRepo partsRepo;
    @Autowired
    public PartsService(PartsRepo partsRepo) {
        this.partsRepo = partsRepo;
    }

    public List<Parts> findAllParts()
    {
        return  partsRepo.findPartsByDeleteFlag();
    }

//    public  List<Parts> findPartsByServices(Services services){
//        return  partsRepo.findPartsByServices(services);
//    }

    public Parts findPartsById(Long partsId){
        return partsRepo.findBypartsId(partsId)
                .orElseThrow(() -> new NotFoundException("Parts by id: " + partsId + " not found"));
    }
    public Parts addParts(Parts parts){
        parts.setDeleteFlag(1);
        return partsRepo.save(parts);
    }

    public Parts updateParts(Parts parts){
        parts.setDeleteFlag(1);
        return partsRepo.save(parts);
    }

    public Parts deleteParts(Parts parts){
        parts.setDeleteFlag(0);
        return partsRepo.save(parts);
    }




}

