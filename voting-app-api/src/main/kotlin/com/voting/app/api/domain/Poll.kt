package com.voting.app.api.domain

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "polls")
data class Poll(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0L,

        @Column(name = "question")
        val question: String = "",

        @Column(name = "short_url")
        val shortUrl: String = "",

        @JoinColumn(name = "users_id", nullable = false)
        @ManyToOne
        val user: User = User(),

        @Column(name = "date_created")
        val dateCreated: LocalDateTime = LocalDateTime.now()
)
