package com.voting.app.api.repository

import com.voting.app.api.domain.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): Optional<User>
    fun existsByUsername(username: String) : Boolean
    fun existsByEmail(email: String): Boolean
}
