package com.voting.app.api.api

import com.voting.app.api.api.exceptions.*
import com.voting.app.api.domain.User
import com.voting.app.api.service.PollService
import com.voting.app.api.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import java.security.Principal


@RestController
@RequestMapping("/api")
class PollController(val pollService: PollService, val userService: UserService) {

    @PostMapping("/create")
    fun createPoll(@RequestBody createPoll: CreatePoll) =
            pollService.createPoll(createPoll.question,
                    createPoll.options,
                    userService.findByUsername(createPoll.user))

    @GetMapping("/latest")
    fun findLatest() = pollService.showLatestPolls()

    @GetMapping("/login")
    fun login(principal: Principal) = userService.getUserForPrincipal(principal)

    @GetMapping("/principal")
    fun getUser(principal: Principal): User {
        return userService.getUserForPrincipal(principal)
    }

    @GetMapping("/{shortUrl}")
    fun getByShortUrl(@PathVariable shortUrl: String) = pollService.getByShortUrl(shortUrl)

    @GetMapping("/trending")
    fun getTopVotedPolls() = pollService.showMostVotedPolls()

    @PostMapping("/vote/{pollId}/{optionId}")
    fun vote(httpServletRequest: HttpServletRequest, @PathVariable pollId: Long, @PathVariable optionId: Long) {
        pollService.vote(pollService.getClientIpAddr(httpServletRequest), optionId, pollId)
    }

    @PostMapping("/register")
    fun createUser(@RequestBody createUser: CreateUser) =
            userService.createUser(createUser.email, createUser.username, createUser.password,
                    createUser.firstName, createUser.lastName, createUser.pictureUrl)

    @GetMapping("/poll/{username}")
    fun getPollByUser(@PathVariable username: String) = pollService.getPollsByUsername(username)

    @GetMapping("/user/{username}")
    fun getUserByUsername(@PathVariable username: String) = userService.findByUsername(username)

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    fun onDuplicateEmailError(e: EmailExistsException) = mapOf("error" to e.message)

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    fun onDuplicateUsernameError(e: UsernameExistsException) = mapOf("error" to e.message)

    @ExceptionHandler
    @ResponseStatus(HttpStatus.CONFLICT)
    fun onDuplicateVoteError(e: UserVotedException) = mapOf("error" to e.message)

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun onUserNotFoundError(e: UserNotFoundException) = mapOf("error" to e.message)

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun onPollNotFoundError(e: PollNotFoundException) = mapOf("error" to e.message)

}
