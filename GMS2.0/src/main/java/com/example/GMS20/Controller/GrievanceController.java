package com.example.GMS20.Controller;

import com.example.GMS20.DTO.GrievanceRequestDTO;
import com.example.GMS20.DTO.GrievanceResponseDTO;
import com.example.GMS20.Services.GrievanceService;
import com.example.GMS20.Services.UserService;
import com.example.GMS20.model.Technician;
import com.example.GMS20.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@Validated
@CrossOrigin(origins = "http://127.0.0.1:3000")

@RequestMapping("/grievance")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;
    @Autowired
    private  UserService userService;

    // Creating grievances(For user_)
    @PostMapping("/create")
    public ResponseEntity<?> createGrievance(@Valid @RequestBody GrievanceRequestDTO grievanceRequestDTO) {
        try {
            GrievanceResponseDTO createdGrievance = grievanceService.createGrievance(grievanceRequestDTO);
            return new ResponseEntity<>(createdGrievance, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating grievance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get grievances by username(User)
    @GetMapping("/find")
    public ResponseEntity<?> getGrievancesByUsername(@RequestParam String username) {
        try {
            List<GrievanceResponseDTO> grievances = grievanceService.getGrievancesByUsername(username);
            if (grievances.isEmpty()) {
                return new ResponseEntity<>("No grievances found for username: " + username, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(grievances, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving grievances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get unassigned grievances(assignee)
    @GetMapping("/unassigned")
    public ResponseEntity<?> getUnassignedGrievances() {
        try {
            List<GrievanceResponseDTO> grievances = grievanceService.getUnassignedGrievances();
            if (grievances.isEmpty()) {
                return new ResponseEntity<>("No unassigned grievances found", HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(grievances, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving unassigned grievances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // View all technicians (for Assignee)
    @GetMapping("/technicians")
    public ResponseEntity<?> getAllTechnicians() {
        try {
            List<Technician> technicians = grievanceService.getAllTechnicians();
            return ResponseEntity.ok(technicians);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving technicians: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Assign a technician to a grievance (for Assignee)
    @PatchMapping("/assign")
    public ResponseEntity<?> assignTechnician(@RequestParam UUID grievanceId, @RequestParam Long technicianId) {
        try {
            Technician technician = grievanceService.assignTechnicianToGrievance(grievanceId, technicianId);
            return ResponseEntity.ok("Technician " + technician.getUsername() + " assigned successfully");
        } catch (Exception e) {
            return new ResponseEntity<>("Error assigning technician: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get grievances by technician Id (Technician)
    @GetMapping("/get-grievances")
    public ResponseEntity<?> getGrievancesByTechnicianId(@RequestParam Long technicianId) {
        try {
            List<GrievanceResponseDTO> grievances = grievanceService.getGrievancesByTechnicianId(technicianId);
            if (grievances.isEmpty()) {
                return new ResponseEntity<>("No grievances found for technician ID: " + technicianId, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(grievances, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error retrieving grievances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update the status of a grievance (for Technician)
    @PatchMapping("/update-grievance-status")
    public ResponseEntity<?> updateGrievanceStatus(@RequestParam UUID grievanceId, @RequestParam String status) {
        try {
            GrievanceResponseDTO grievance = grievanceService.updateGrievanceStatus(grievanceId, status);
            return ResponseEntity.ok("Grievance status updated successfully to " + grievance.getStatus());
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating grievance status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update technician's own status (for Technician)
    @PatchMapping("/update-technician-status")
    public ResponseEntity<?> updateTechnicianStatus(@RequestParam Long technicianId, @RequestParam String status) {
        try {
            Technician technician = grievanceService.updateTechnicianStatus(technicianId, status);
            return ResponseEntity.ok("Technician " + technician.getUsername() + "'s status updated to " + status);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating technician status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
