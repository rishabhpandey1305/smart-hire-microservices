package com.smarthire.job.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String requiredSkills;

    @NotBlank
    private String location;

    @NotNull
    private Double salary;
}