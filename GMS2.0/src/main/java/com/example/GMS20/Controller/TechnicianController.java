package com.example.GMS20.Controller;

import com.example.GMS20.DTO.TechnicianRegistrationRequest; // Import your DTO
import com.example.GMS20.Services.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000")
@RequestMapping("/api")
public class TechnicianController {

    @Autowired
    private TechnicianService technicianService;

    // Registration endpoint for technicians
    @PostMapping("/register-technician")
    public ResponseEntity<String> registerTechnician(@RequestBody TechnicianRegistrationRequest request) {
        try {
            technicianService.registerTechnician(request);
            return ResponseEntity.ok("Technician registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error registering technician: " + e.getMessage());
        }
    }
}
