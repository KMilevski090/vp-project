package com.voting.app.api.api

import com.voting.app.api.domain.Option
import com.voting.app.api.domain.User
import java.time.LocalDateTime


data class PollJSON(
        val id: Long,
        val question: String,
        val options: List<Option>,
        val user: User,
        val dateCreated: LocalDateTime,
        val shortUrl: String
)
