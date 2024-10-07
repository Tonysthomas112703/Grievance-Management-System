package com.example.GMS20.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class GrievanceRequestDTO {

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Description is required")
    private String description;

    public GrievanceRequestDTO() {
    }

    public GrievanceRequestDTO(String type, String description) {
        this.type = type;
        this.description = description;
    }

    public @NotBlank(message = "Type is required") String getType() {
        return type;
    }

    public void setType(@NotBlank(message = "Type is required") String type) {
        this.type = type;
    }

    public @NotNull(message = "Description is required") String getDescription() {
        return description;
    }

    public void setDescription(@NotBlank(message = "Description is required") String description) {
        this.description = description;
    }
}
