package com.example.GMS20.repositories;

import com.example.GMS20.model.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;


public interface GrievanceRepository extends JpaRepository<Grievance, UUID> {
    List<Grievance> findByUsername(String username);
    List<Grievance> findByTechnicianId(Long technicianId);
    List<Grievance> findByTechnicianIdIsNull();
}
