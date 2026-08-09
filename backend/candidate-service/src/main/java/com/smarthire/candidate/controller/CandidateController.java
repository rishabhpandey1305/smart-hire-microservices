package com.smarthire.candidate.controller;

import com.smarthire.candidate.dto.CandidateRequest;
import com.smarthire.candidate.entity.Candidate;
import com.smarthire.candidate.service.CandidateService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public String createCandidate(@Valid @RequestBody CandidateRequest request) {
        return service.createCandidate(request);
    }

    @GetMapping
    public List<Candidate> getAllCandidates() {
        return service.getAllCandidates();
    }

    @GetMapping("/{id}")
    public Candidate getCandidateById(@PathVariable Long id) {
        return service.getCandidateById(id);
    }

    @PutMapping("/{id}")
    public String updateCandidate(
            @PathVariable Long id,
            @Valid @RequestBody CandidateRequest request) {

        return service.updateCandidate(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteCandidate(@PathVariable Long id) {
        return service.deleteCandidate(id);
    }

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
    @GetMapping("/resume/{fileName}")
    public ResponseEntity<byte[]> getResume(@PathVariable String fileName) throws Exception
    {
        String uploadDir = System.getProperty("java.io.tmpdir") + "/resumes/";
        Path path = Paths.get(uploadDir, fileName);
        if (!Files.exists(path))
        {
            return ResponseEntity.notFound().build();
        }
        byte[] fileBytes = Files.readAllBytes(path);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(fileBytes);
    }
}