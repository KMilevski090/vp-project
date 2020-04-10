package com.voting.app.api.repository

import com.voting.app.api.domain.Poll
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface PollRepository : JpaRepository<Poll, Long> {
    fun existsByShortUrl(shortUrl: String): Boolean
    fun getByShortUrl(shortUrl: String): Poll
    @Query("""select date_created,question,short_url,sum(times_voted) from
        (select * from (
                select *
                from polls
                       join options o on polls.id = o.polls_id
              ) a
        ) b
        group by polls_id,date_created,question,short_url,users_id
        order by date_created desc
        limit 10
    """, nativeQuery = true)
    fun getLatest10(): List<Any>

    @Query("""select date_created,question,short_url,sum(times_voted) from
        (select * from (
                select *
                from polls
                       join options o on polls.id = o.polls_id
              ) a
        ) b
        group by polls_id,date_created,question,short_url,users_id
        order by sum(times_voted) desc
        limit 10
    """, nativeQuery = true)
    fun findTopTrending(): List<Any>

    @Query("""select date_created,question,short_url,sum(times_voted) from
  (select * from (
                   select *
                   from polls
                          join options o on polls.id = o.polls_id
                 ) a
  ) b
where b.users_id = ?1
group by polls_id,date_created,question,short_url,users_id
    """, nativeQuery = true)
    fun findByUser(userId: Long): List<Any>
}
