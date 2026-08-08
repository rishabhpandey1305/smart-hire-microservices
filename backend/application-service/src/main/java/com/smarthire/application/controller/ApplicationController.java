package com.smarthire.application.controller;

import com.smarthire.application.dto.ApplicationRequest;
import com.smarthire.application.dto.StatusRequest;
import com.smarthire.application.entity.Application;
import com.smarthire.application.service.ApplicationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService service;

    public ApplicationController(ApplicationService service) {
        this.service = service;
    }

    @PostMapping
    public String applyJob(@Valid @RequestBody ApplicationRequest request) {
        return service.applyJob(request);
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return service.getAllApplications();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(
            @Positive(message = "Application ID must be positive")
            @PathVariable Long id) {

        return service.getApplicationById(id);
    }

    @PutMapping("/{id}/status")
    public String updateStatus(
            @Positive(message = "Application ID must be positive")
            @PathVariable Long id,
            @Valid @RequestBody StatusRequest request) {

        return service.updateStatus(id, request.getStatus());
    }

    @DeleteMapping("/{id}")
    public String deleteApplication(
            @Positive(message = "Application ID must be positive")
            @PathVariable Long id) {

        return service.deleteApplication(id);
    }

    @GetMapping("/candidate/{id}")
    public List<Application> getApplicationsByCandidate(
            @Positive(message = "Candidate ID must be positive")
            @PathVariable Long id) {

        return service.getApplicationsByCandidate(id);
    }

    @GetMapping("/job/{id}")
    public List<Application> getApplicationsByJob(
            @Positive(message = "Job ID must be positive")
            @PathVariable Long id) {

        return service.getApplicationsByJob(id);
    }
}