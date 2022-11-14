package net.oprup.erp.service;

import net.oprup.erp.exception.NotFoundException;
import net.oprup.erp.model.Services;
import net.oprup.erp.repo.ServicesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class ServicesService {
    private final ServicesRepo servicesRepo;
    @Autowired
    public ServicesService(ServicesRepo servicesRepo) {
        this.servicesRepo = servicesRepo;
    }

    public List<Services> findAllServices()
    {
        return  servicesRepo.findServicesByDeleteFlag();
    }

    public Services findServicesById(Long servicesId){
        return servicesRepo.findByServicesId(servicesId)
                .orElseThrow(() -> new NotFoundException("Services by id: " +servicesId + " not found"));
    }
//
//    public  List<Services> findServicesByCategories(Categories emp){
//        return  servicesRepo.findServicesByCategories(emp);
//    }
//
    public Services addServices(Services services){
        services.setDeleteFlag(1);
        return servicesRepo.save(services);
    }

    public Services updateServices(Services services){
        services.setDeleteFlag(1);
        return servicesRepo.save(services);
    }

    public Services deleteServices(Services services){
        services.setDeleteFlag(0);
        return servicesRepo.save(services);
    }


}

