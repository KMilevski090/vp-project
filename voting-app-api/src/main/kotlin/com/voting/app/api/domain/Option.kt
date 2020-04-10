package com.voting.app.api.domain

import javax.persistence.*

@Entity
@Table(name = "options")
data class Option(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id", unique = true, updatable = false, nullable = false)
        val id: Long = 0L,

        @Column(name = "value")
        val value: String = "",

        @Column(name = "times_voted")
        var timesVoted: Int = 0,

        @JoinColumn(name = "polls_id")
        @ManyToOne
        val poll: Poll = Poll()
)
