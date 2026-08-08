package com.smarthire.candidate.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandidateRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits")
    private String phone;

    @NotBlank(message = "Education is required")
    private String education;

    @NotNull(message = "Experience is required")
    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;

    @NotBlank(message = "Skills are required")
    private String skills;

    // Optional: set automatically after resume upload
    private String resumeUrl;
}