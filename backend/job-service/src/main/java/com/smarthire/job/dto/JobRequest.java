package com.smarthire.job.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobRequest {

    @NotBlank(message = "Job title is required")
    @Size(min = 3, max = 100, message = "Job title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Job description is required")
    @Size(min = 20, max = 5000, message = "Job description must be between 20 and 5000 characters")
    private String description;

    @NotBlank(message = "Required skills are required")
    @Size(min = 2, max = 500, message = "Required skills must be between 2 and 500 characters")
    private String requiredSkills;

    @NotBlank(message = "Job location is required")
    @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters")
    private String location;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be greater than 0")
    private Double salary;
}