package com.example.GMS20.DTO;

import java.time.LocalDateTime;
import java.util.UUID;

public class GrievanceResponseDTO {

    private UUID grievanceId;
    private String type;
    private String description;
    private String status;
    private String username;

    // Constructor
    public GrievanceResponseDTO(UUID grievanceId, String type, String description, String status, String username) {
        this.grievanceId = grievanceId;
        this.type = type;
        this.description = description;
        this.status = status;
        this.username = username;

    }

    public GrievanceResponseDTO() {

    }

    // Getters and Setters
    public UUID getGrievanceId() {
        return grievanceId;
    }

    public void setGrievanceId(UUID grievanceId) {
        this.grievanceId = grievanceId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
