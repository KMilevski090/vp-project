package com.voting.app.api.domain

import javax.persistence.*

@Entity
@Table(name = "users")
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0L,

        @Column(name = "email")
        val email: String = "",

        @Column(name = "password")
        val password: String = "",

        @Column(name = "username")
        val username: String = "",

        @Column(name = "first_name")
        val firstName: String = "",

        @Column(name = "last_name")
        val lastName: String = "",

        @Column(name = "picture_url")
        val pictureUrl: String = ""
)
