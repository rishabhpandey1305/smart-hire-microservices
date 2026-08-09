package com.smarthire.candidate.controller;

import com.smarthire.candidate.dto.CandidateRequest;
import com.smarthire.candidate.entity.Candidate;
import com.smarthire.candidate.service.CandidateService;
import jakarta.validation.Valid;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    private final CandidateService service;

    public CandidateController(CandidateService service) {
        this.service = service;
    }

    // Create Candidate
    @PostMapping
    public String createCandidate(@Valid @RequestBody CandidateRequest request) {
        return service.createCandidate(request);
    }

    // Get All Candidates
    @GetMapping
    public List<Candidate> getAllCandidates() {
        return service.getAllCandidates();
    }

    // Get Candidate By Id
    @GetMapping("/{id}")
    public Candidate getCandidateById(@PathVariable Long id) {
        return service.getCandidateById(id);
    }

    // Update Candidate
    @PutMapping("/{id}")
    public String updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateRequest request) {

        return service.updateCandidate(id, request);
    }

    // Delete Candidate
    @DeleteMapping("/{id}")
    public String deleteCandidate(@PathVariable Long id) {
        return service.deleteCandidate(id);
    }

    // Upload Resume
    @PostMapping("/{id}/resume")
    public String uploadResume(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) throws Exception {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Please upload a resume file.");
        }

        String uploadDir = System.getProperty("java.io.tmpdir") + "/resumes/";

        Files.createDirectories(Paths.get(uploadDir));

        String fileName = id + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir, fileName);

        Files.write(path, file.getBytes());

        Candidate candidate = service.getCandidateById(id);

        candidate.setResumeUrl(fileName);

        service.saveCandidate(candidate);

        return "Resume Uploaded Successfully";
    }

    // View Resume
    @GetMapping("/resume/{fileName}")
    public ResponseEntity<byte[]> getResume(@PathVariable String fileName) throws Exception {

        String uploadDir = System.getProperty("java.io.tmpdir") + "/resumes/";

        Path path = Paths.get(uploadDir, fileName);

        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        byte[] fileBytes = Files.readAllBytes(path);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(fileBytes);
    }

    // AI Resume Analysis
    @PostMapping("/{id}/analyze")
    public ResponseEntity<?> analyzeResume(@PathVariable Long id) throws Exception {

        Candidate candidate = service.getCandidateById(id);

        if (candidate.getResumeUrl() == null || candidate.getResumeUrl().isBlank()) {
            return ResponseEntity.badRequest().body("Resume not uploaded");
        }

        String uploadDir = System.getProperty("java.io.tmpdir") + "/resumes/";

        Path path = Paths.get(uploadDir, candidate.getResumeUrl());

        if (!Files.exists(path)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Resume file not found on server");
        }

        RestTemplate restTemplate = new RestTemplate();

        // Create file resource
        FileSystemResource fileResource = new FileSystemResource(path.toFile());

        // Build multipart body
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", fileResource);

        // Set multipart headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity =
                new HttpEntity<>(body, headers);

        String aiUrl = "https://smarthire-ai-j8oj.onrender.com/parse-resume";

        ResponseEntity<String> response = restTemplate.exchange(
                aiUrl,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        return ResponseEntity.ok(response.getBody());
    }
}