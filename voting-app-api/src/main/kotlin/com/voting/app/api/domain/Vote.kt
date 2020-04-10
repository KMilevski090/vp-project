package com.voting.app.api.domain

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "votes")
data class Vote(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0L,

        @Column(name = "ip_address")
        val ipAddress: String = "",

        @JoinColumn(name = "options_id")
        @ManyToOne
        val option: Option = Option(),

        @JoinColumn(name = "polls_id")
        @ManyToOne
        val poll: Poll = Poll(),

        @Column(name = "date_created")
        val dateCreated: LocalDateTime = LocalDateTime.now()
)
