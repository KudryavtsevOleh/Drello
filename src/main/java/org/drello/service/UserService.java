package org.drello.service;

import lombok.extern.log4j.Log4j;
import org.drello.bean.UserBean;
import org.drello.enums.Role;
import org.drello.persistence.User;
import org.drello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Log4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(String id) {
        return Optional.ofNullable(userRepository.findOne(id));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Collection<User> getUsers() {
        return userRepository.findAll();
    }

    public User create(UserBean userBean) {
        User user = new User();
        user.setEmail(userBean.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(userBean.getPassword()));
        user.setRole(Role.ROLE_USER);
        return userRepository.save(user);
    }

}
