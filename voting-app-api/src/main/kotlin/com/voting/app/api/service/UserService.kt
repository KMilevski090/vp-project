package com.voting.app.api.service

import com.voting.app.api.api.exceptions.EmailExistsException
import com.voting.app.api.api.exceptions.UserNotFoundException
import com.voting.app.api.api.exceptions.UsernameExistsException
import com.voting.app.api.domain.User
import com.voting.app.api.repository.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.security.Principal

@Service
class UserService(val userRepository: UserRepository) {

    val logger = LoggerFactory.getLogger(UserService::class.java)

    fun createUser(email: String, userName: String, password: String, firstName: String,
                   lastName: String, pictureUrl: String): User {

        if (userRepository.existsByUsername(userName)) {
            logger.info("Username already exists [{}]", userName)
            throw UsernameExistsException()
        }
        if (userRepository.existsByEmail(email)) {
            logger.info("Email already exists [{}]", email)
            throw EmailExistsException()
        }

        val user = User(email = email, username = userName,
                password = BCryptPasswordEncoder().encode(password),
                firstName = firstName, lastName = lastName, pictureUrl = pictureUrl)
        logger.info("Saving user [{}]", user)
        return userRepository.save(user)
    }


    fun findByUsername(userName: String): User {

        if (!userRepository.existsByUsername(userName)) {
            logger.info("Username [{}] not found", userName)
            throw UserNotFoundException()
        }

        logger.info("Username found [{}]", userName)
        return userRepository.findByUsername(userName).orElseThrow { UserNotFoundException() }
    }

    fun getUserForPrincipal(principal: Principal): User {
        return userRepository.findByUsername(principal.name).orElseThrow {
            UserNotFoundException()
        }
    }


}
