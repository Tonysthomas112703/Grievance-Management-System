package com.example.GMS20.Services;

import com.example.GMS20.DTO.TechnicianRegistrationRequest;
import com.example.GMS20.model.User;
import com.example.GMS20.model.Technician;
import com.example.GMS20.repositories.UserRepository;
import com.example.GMS20.repositories.TechnicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TechnicianService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    public void registerTechnician(TechnicianRegistrationRequest request) {
        // Save user details
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(new BCryptPasswordEncoder().encode(request.getPassword()));
        user.setRole("TECHNICIAN");  // Set role to technician
        userRepository.save(user);

        // Save technician details
        Technician technician = new Technician();
        technician.setUsername(request.getUsername());
        technician.setExpertise(request.getExpertise());
        technician.setStatus("Available"); // Set status to available
        technicianRepository.save(technician);
    }
}
