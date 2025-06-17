package com.transactions.controller;

import com.transactions.model.Transaction;
import com.transactions.repository.TransactionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionRepository repo;

    public TransactionController(TransactionRepository repo) {
        this.repo = repo;
    }

    // Add new transaction
    @PostMapping("/add")
    public Transaction addTransaction(@RequestBody Transaction tx) {
        return repo.save(tx);
    }

    // Get all transactions
    @GetMapping("/all")
    public List<Transaction> getAllTransactions() {
        return repo.findAll();
    }

    // Get transactions by date
    @GetMapping("/date/{date}")
    public List<Transaction> getByDate(@PathVariable String date) {
        return repo.findByDate(date);
    }
}