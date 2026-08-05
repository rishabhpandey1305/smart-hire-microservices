package com.smarthire.candidate.service;

import com.smarthire.candidate.dto.CandidateRequest;
import com.smarthire.candidate.entity.Candidate;
import com.smarthire.candidate.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    private final CandidateRepository repository;

    public CandidateService(
            CandidateRepository repository) {

        this.repository = repository;
    }

    public String createCandidate(
            CandidateRequest request) {

        Candidate candidate =
                Candidate.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .phone(request.getPhone())
                        .education(request.getEducation())
                        .experience(request.getExperience())
                        .skills(request.getSkills())
                        .build();

        repository.save(candidate);

        return "Candidate Created Successfully";
    }

    public List<Candidate> getAllCandidates() {
        return repository.findAll();
    }

    public Candidate getCandidateById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate Not Found"));
    }
    public String updateCandidate(
            Long id,
            CandidateRequest request) {

        Candidate candidate =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate Not Found"));

        candidate.setName(request.getName());
        candidate.setEmail(request.getEmail());
        candidate.setPhone(request.getPhone());
        candidate.setEducation(request.getEducation());
        candidate.setExperience(
                request.getExperience());
        candidate.setSkills(
                request.getSkills());

        repository.save(candidate);

        return "Candidate Updated Successfully";
    }
    public String deleteCandidate(Long id) {

        Candidate candidate =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate Not Found"));

        repository.delete(candidate);

        return "Candidate Deleted Successfully";
    }
    public Candidate saveCandidate(
            Candidate candidate) {

        return repository.save(candidate);
    }
}
