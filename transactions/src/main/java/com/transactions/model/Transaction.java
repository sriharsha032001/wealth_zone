package com.transactions.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String description;
    private String type; // "Credit" or "Debit"
    private Double amount;
    private String date; // YYYY-MM-DD
    private String category;
    private String source;
}