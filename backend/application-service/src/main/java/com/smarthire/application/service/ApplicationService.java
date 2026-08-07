package com.smarthire.application.service;

import com.smarthire.application.dto.ApplicationRequest;
import com.smarthire.application.entity.Application;
import com.smarthire.application.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ApplicationService {

    private final ApplicationRepository repository;
    private static final Logger logger =
            LoggerFactory.getLogger(ApplicationService.class);

    public ApplicationService(
            ApplicationRepository repository) {

        this.repository = repository;
    }

    public String applyJob(
            ApplicationRequest request) {

        Application application =
                Application.builder()
                        .candidateId(
                                request.getCandidateId())
                        .jobId(
                                request.getJobId())
                        .status("APPLIED")
                        .build();

        repository.save(application);
        logger.info("Application submitted by candidate {}", application.getCandidateId());
        return "Application Submitted";
    }

    public List<Application>
    getApplicationsByCandidate(
            Long candidateId) {

        return repository
                .findByCandidateId(
                        candidateId);
    }

    public List<Application>
    getApplicationsByJob(
            Long jobId) {

        return repository
                .findByJobId(
                        jobId);
    }

    public List<Application> getAllApplications() {

        return repository.findAll();
    }

    public Application getApplicationById(
            Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application Not Found"));
    }
    public String updateStatus(
            Long id,
            String status) {
        List<String> validStatuses =
                List.of(
                        "APPLIED",
                        "SHORTLISTED",
                        "INTERVIEW",
                        "SELECTED",
                        "REJECTED"
                );

        if(!validStatuses.contains(status)) {
            throw new RuntimeException(
                    "Invalid Status");
        }
        Application application =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application Not Found"));

        application.setStatus(status);

        repository.save(application);
        logger.info("Application status updated: {}", application.getId());

        return "Status Updated Successfully";
    }
    public String deleteApplication(
            Long id) {

        Application application =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application Not Found"));

        repository.delete(application);

        return "Application Deleted";
    }
}