package com.smarthire.candidate.controller;

import com.smarthire.candidate.dto.CandidateRequest;
import com.smarthire.candidate.entity.Candidate;
import com.smarthire.candidate.service.CandidateService;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final CandidateService service;

    public CandidateController(
            CandidateService service) {

        this.service = service;
    }

    @PostMapping
    public String createCandidate(
            @Valid
            @RequestBody CandidateRequest request) {

        return service.createCandidate(request);
    }

    @GetMapping
    public List<Candidate> getAllCandidates() {

        return service.getAllCandidates();
    }

    @GetMapping("/{id}")
    public Candidate getCandidateById(
            @PathVariable Long id) {

        return service.getCandidateById(id);
    }
    @PutMapping("/{id}")
    public String updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateRequest request) {

        return service.updateCandidate(
                id,
                request);
    }
    @DeleteMapping("/{id}")
    public String deleteCandidate(
            @PathVariable Long id) {

        return service.deleteCandidate(id);
    }
    @PostMapping("/{id}/resume")
    public String uploadResume(
            @PathVariable Long id,
            @RequestParam("file")
            MultipartFile file)
            throws Exception {

        String uploadDir =
                "uploads/resumes/";

        String fileName =
                id + "_" +
                        file.getOriginalFilename();

        Path path =
                Paths.get(uploadDir + fileName);

        Files.createDirectories(
                path.getParent());

        Files.write(
                path,
                file.getBytes());

        Candidate candidate =
                service.getCandidateById(id);

        candidate.setResumeUrl(
                path.toString());

        service.saveCandidate(candidate);

        return "Resume Uploaded Successfully";
    }
}