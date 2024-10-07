package com.example.GMS20.model;

import com.example.GMS20.model.Technician;
import com.example.GMS20.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="Grievances")
public class Grievance {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(updatable = false, nullable = false)
    private UUID grievanceId;

    private String type;
    private String description;
    private String status;
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_Id")
    @JsonIgnore
    private Technician technician;

    private LocalDateTime submittedDate;
    private LocalDateTime updatedDate;

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

    public Technician getTechnician() {
        return technician;
    }

    public void setTechnician(Technician technician) {
        this.technician = technician;
    }

    public LocalDateTime getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(LocalDateTime submittedDate) {
        this.submittedDate = submittedDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;

    }

    public UUID getGrievanceId() {
        return grievanceId;
    }

    public void setGrievanceId(UUID grievanceId) {
        this.grievanceId = grievanceId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username=username;


    }


}

