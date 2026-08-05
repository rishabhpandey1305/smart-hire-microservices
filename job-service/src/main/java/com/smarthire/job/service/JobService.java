package com.smarthire.job.service;

import com.smarthire.job.dto.JobRequest;
import com.smarthire.job.entity.Job;
import com.smarthire.job.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(
            JobRepository jobRepository) {

        this.jobRepository = jobRepository;
    }

    public String createJob(
            JobRequest request) {

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .requiredSkills(
                        request.getRequiredSkills())
                .location(request.getLocation())
                .salary(request.getSalary())
                .build();

        jobRepository.save(job);

        return "Job Created Successfully";
    }

    public List<Job> getAllJobs() {

        return jobRepository.findAll();
    }
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job Not Found"));
    }
    public String updateJob(
            Long id,
            JobRequest request) {

        Job job =
                jobRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job Not Found"));

        job.setTitle(request.getTitle());
        job.setDescription(
                request.getDescription());
        job.setRequiredSkills(
                request.getRequiredSkills());
        job.setLocation(
                request.getLocation());
        job.setSalary(
                request.getSalary());

        jobRepository.save(job);

        return "Job Updated Successfully";
    }
    public String deleteJob(Long id) {

        Job job =
                jobRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job Not Found"));

        jobRepository.delete(job);

        return "Job Deleted Successfully";
    }
}