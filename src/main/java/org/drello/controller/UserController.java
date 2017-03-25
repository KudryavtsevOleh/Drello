package org.drello.controller;

import lombok.extern.log4j.Log4j;
import org.drello.bean.UserBean;
import org.drello.persistence.User;
import org.drello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/user/register")
    public ResponseEntity register(@RequestBody UserBean userBean) {
        try {
            User user = userService.create(userBean);
            return ResponseEntity.ok("User created successfully: " + user.getId());
        } catch (Exception e) {
            log.error("Error occurred while creating new user: " + e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
