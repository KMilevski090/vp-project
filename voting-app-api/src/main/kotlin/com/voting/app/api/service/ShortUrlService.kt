package com.voting.app.api.service

import com.voting.app.api.repository.PollRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class ShortUrlService(val pollRepository: PollRepository) {
    fun generateShortUrl(): String {
        val r = Random()
        val stringBuilder: StringBuilder = StringBuilder()
        for (i in 1..5) {
            stringBuilder.append(if (r.nextBoolean()) {
                val number = r.nextInt((90 - 65) + 1) + 65
                number.toChar()
            } else {
                val number = r.nextInt((122 - 97) + 1) + 97
                number.toChar()
            })
        }
        return if (pollRepository.existsByShortUrl(stringBuilder.toString())) {
            generateShortUrl()
        } else {
            stringBuilder.toString()
        }
    }
}
