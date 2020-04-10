package com.voting.app.api.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Configuration
@EnableWebSecurity
class SecurityConfiguration(val userDetailService: MyUserDetailService) : WebSecurityConfigurerAdapter() {

    @Bean
    fun authProvider(): AuthenticationProvider {
        val provider = DaoAuthenticationProvider()
        provider.setUserDetailsService(userDetailService)
        provider.setPasswordEncoder(BCryptPasswordEncoder())
        return provider
    }

    override fun configure(http: HttpSecurity?) {
        http?.let {
            it
                    .cors()
                    .and()
                    .authorizeRequests()
                    .antMatchers("/api/principal").fullyAuthenticated()
                    .antMatchers("/api/create").fullyAuthenticated()
                    .anyRequest().permitAll()
                    .and()
                    .logout()
                    .logoutUrl("/api/logout")
                    .logoutSuccessUrl("/api/latest")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .and()
                    .httpBasic()
                    .and()
                    .csrf().disable()
        }
    }


}
