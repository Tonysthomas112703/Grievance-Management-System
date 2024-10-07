package com.example.GMS20.Services;

import com.example.GMS20.DTO.GrievanceRequestDTO;
import com.example.GMS20.DTO.GrievanceResponseDTO;
import com.example.GMS20.model.Grievance;
import com.example.GMS20.model.Technician;
import com.example.GMS20.model.User;
import com.example.GMS20.repositories.GrievanceRepository;
import com.example.GMS20.repositories.TechnicianRepository;
import com.example.GMS20.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private UserRepository userRepository;

    // Creating Grievances (USER)
    public GrievanceResponseDTO createGrievance(GrievanceRequestDTO grievanceRequestDTO) {
        try {
            // Get the authenticated user's username
            String username = SecurityContextHolder.getContext().getAuthentication().getName();

            Grievance grievance = new Grievance();
            grievance.setType(grievanceRequestDTO.getType());
            grievance.setDescription(grievanceRequestDTO.getDescription());
            grievance.setUsername(username);
            grievance.setSubmittedDate(LocalDateTime.now());
            grievance.setStatus("Submitted");

            // Save the grievance to the database
            Grievance savedGrievance = grievanceRepository.save(grievance);

            return mapToResponseDTO(savedGrievance);
        } catch (Exception e) {
            throw new RuntimeException("Error creating grievance: " + e.getMessage(), e);
        }
    }

    // Finding Grievances By Username (User)
    public List<GrievanceResponseDTO> getGrievancesByUsername(String username) {
        try {
            List<Grievance> grievances = grievanceRepository.findByUsername(username);
            return grievances.stream()
                    .map(this::mapToResponseDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving grievances by username: " + e.getMessage(), e);
        }
    }

    // Finding all grievances to be assigned (ASSIGNEE)
    public List<GrievanceResponseDTO> getUnassignedGrievances() {
        try {
            List<Grievance> grievances = grievanceRepository.findByTechnicianIdIsNull();
            return grievances.stream()
                    .map(this::mapToResponseDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving unassigned grievances: " + e.getMessage(), e);
        }
    }

    // View all technicians (for Assignee)
    public List<Technician> getAllTechnicians() {
        try {
            return technicianRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving all technicians: " + e.getMessage(), e);
        }
    }

    // Assign technician to a grievance (for Assignee)
    public Technician assignTechnicianToGrievance(UUID grievanceId, Long technicianId) {
        try {
            Grievance grievance = grievanceRepository.findById(grievanceId)
                    .orElseThrow(() -> new RuntimeException("Grievance not found"));

            Technician technician = technicianRepository.findById(technicianId)
                    .orElseThrow(() -> new RuntimeException("Technician not found"));

            grievance.setTechnician(technician);
            grievanceRepository.save(grievance);

            return technician;
        } catch (Exception e) {
            throw new RuntimeException("Error assigning technician to grievance: " + e.getMessage(), e);
        }
    }

    // View all grievances by technician Id (TECHNICIAN)
    public List<GrievanceResponseDTO> getGrievancesByTechnicianId(Long technicianId) {
        try {
            List<Grievance> grievances = grievanceRepository.findByTechnicianId(technicianId);
            return grievances.stream()
                    .map(this::mapToResponseDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving grievances by technician ID: " + e.getMessage(), e);
        }
    }

    // Update grievance status (for Technician)
    public GrievanceResponseDTO updateGrievanceStatus(UUID grievanceId, String status) {
        try {
            Grievance grievance = grievanceRepository.findById(grievanceId)
                    .orElseThrow(() -> new RuntimeException("Grievance not found"));

            grievance.setStatus(status);
            grievance.setUpdatedDate(LocalDateTime.now());
            Grievance updatedGrievance = grievanceRepository.save(grievance);

            return mapToResponseDTO(updatedGrievance);
        } catch (Exception e) {
            throw new RuntimeException("Error updating grievance status: " + e.getMessage(), e);
        }
    }

    // Update technician's own status (for Technician)
    public Technician updateTechnicianStatus(Long technicianId, String status) {
        try {
            Technician technician = technicianRepository.findById(technicianId)
                    .orElseThrow(() -> new RuntimeException("Technician not found"));

            technician.setStatus(status);
            technicianRepository.save(technician);

            return technician;
        } catch (Exception e) {
            throw new RuntimeException("Error updating technician status: " + e.getMessage(), e);
        }
    }

    // Helper method to map Grievance to GrievanceResponseDTO
    private GrievanceResponseDTO mapToResponseDTO(Grievance grievance) {
        GrievanceResponseDTO dto = new GrievanceResponseDTO();
        dto.setGrievanceId(grievance.getGrievanceId());
        dto.setType(grievance.getType());
        dto.setDescription(grievance.getDescription());
        dto.setStatus(grievance.getStatus());
        dto.setUsername(grievance.getUsername());
        return dto;
    }
}
