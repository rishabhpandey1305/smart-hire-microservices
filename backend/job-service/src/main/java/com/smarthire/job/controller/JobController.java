package com.smarthire.job.controller;

import com.smarthire.job.dto.JobRequest;
import com.smarthire.job.entity.Job;
import com.smarthire.job.service.JobService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@Validated
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public String createJob(
            @Valid
            @RequestBody JobRequest request) {

        return jobService.createJob(request);
    }

    @GetMapping
    public List<Job> getAllJobs() {

        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public Job getJobById(
            @Positive(message = "Job ID must be positive")
            @PathVariable Long id) {

        return jobService.getJobById(id);
    }

    @PutMapping("/{id}")
    public String updateJob(
            @Positive(message = "Job ID must be positive")
            @PathVariable Long id,
            @Valid
            @RequestBody JobRequest request) {

        return jobService.updateJob(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(
            @Positive(message = "Job ID must be positive")
            @PathVariable Long id) {

        return jobService.deleteJob(id);
    }
}