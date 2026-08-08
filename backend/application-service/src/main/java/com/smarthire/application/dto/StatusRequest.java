package com.smarthire.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusRequest {

    @NotBlank(message = "Status is required")
    @Pattern(
            regexp = "APPLIED|SHORTLISTED|INTERVIEW|REJECTED|SELECTED",
            message = "Status must be APPLIED, SHORTLISTED, INTERVIEW, REJECTED, or SELECTED"
    )
    private String status;
}