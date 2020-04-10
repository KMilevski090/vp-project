package com.voting.app.api.repository

import com.voting.app.api.domain.Option
import org.springframework.data.jpa.repository.JpaRepository

interface OptionRepository : JpaRepository<Option, Long> {
    fun getByPollId(id: Long): List<Option>
}
