package org.drello.repository;

import org.drello.persistence.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);
    User findByLogin(String login);

}
