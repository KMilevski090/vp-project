package com.voting.app.api.config

import com.voting.app.api.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class MyUserDetailService(@Autowired val userService: UserService) : UserDetailsService {
    override fun loadUserByUsername(username: String?): UserDetails {
        val user = userService.findByUsername(username ?: "")
        return UserPrincipal(user)
    }
}
