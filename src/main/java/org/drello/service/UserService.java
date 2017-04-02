package org.drello.service;

import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j;
import org.drello.bean.UserBean;
import org.drello.enums.Role;
import org.drello.exceptions.DrelloException;
import org.drello.persistence.User;
import org.drello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Log4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long id) {
        return Optional.ofNullable(userRepository.findOne(id));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User create(UserBean userBean) throws DrelloException {
        User user = new User();
        Optional<User> existingUserByEmail = userRepository.findByEmail(userBean.getEmail());
        if (existingUserByEmail.isPresent()) {
            throw new DrelloException(String.format("User with such email %s already exists", userBean.getEmail()));
        }
        User existingUserByLogin = userRepository.findByLogin(userBean.getLogin());
        if (Objects.nonNull(existingUserByLogin)) {
            throw new DrelloException(String.format("User with such login %s already exists", userBean.getLogin()));
        }
        user.setEmail(userBean.getEmail());
        user.setLogin(userBean.getLogin());
        user.setPassword(new BCryptPasswordEncoder().encode(userBean.getPassword()));
        user.setRole(Role.ROLE_USER);
        return userRepository.save(user);
    }

}
