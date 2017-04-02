package org.drello;

import org.drello.bean.UserBean;
import org.drello.exceptions.DrelloException;
import org.drello.persistence.User;
import org.drello.repository.UserRepository;
import org.drello.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = { Application.class })
@ActiveProfiles("test")
public class RegistrationTest {

    private UserBean userBean;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void before() {
        userBean = new UserBean();
        userBean.setLogin("Alex");
        userBean.setEmail("alex@gmail.com");
        userBean.setPassword("12345");
    }

    @Test
    public void successfulRegisterNewUser() throws DrelloException {
        userRepository.deleteAll();
        User user = userService.create(userBean);

        assertThat(user).isNotNull();
        assertThat(user.getId()).isNotNull();
    }

    @Test(expected = DrelloException.class)
    public void failureRegisterNewUser() throws DrelloException {
        userRepository.deleteAll();
        User user = userService.create(userBean);


        userService.create(userBean);
    }

}
