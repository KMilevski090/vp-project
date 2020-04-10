package com.voting.app.api.api

data class CreatePoll(
        val question: String,
        val options: List<String>,
        val user: String
)

