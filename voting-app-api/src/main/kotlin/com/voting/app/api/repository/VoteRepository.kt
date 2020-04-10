package com.voting.app.api.repository

import com.voting.app.api.domain.Poll
import com.voting.app.api.domain.Vote
import org.springframework.data.jpa.repository.JpaRepository

interface VoteRepository : JpaRepository<Vote, Long> {
    fun existsByIpAddressAndPoll(ip: String, poll: Poll): Boolean
}
