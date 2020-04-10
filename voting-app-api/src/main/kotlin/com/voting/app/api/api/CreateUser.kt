package com.voting.app.api.api

data class CreateUser(
        val email: String,
        val firstName: String,
        val lastName: String,
        val password: String,
        val pictureUrl: String,
        val username: String
)
