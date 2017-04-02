package org.drello.controller;

import com.google.gson.Gson;
import lombok.extern.log4j.Log4j;
import org.drello.bean.CurrentUser;
import org.springframework.security.core.Authentication;
import org.drello.bean.UserBean;
import org.drello.persistence.User;
import org.drello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/app/user/register", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody UserBean userBean) {
        try {
            User user = userService.create(userBean);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error occurred while creating new user: " + e.getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/app/user")
    @SuppressWarnings("unchecked")
    public ResponseEntity getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> userRoles = ((List<SimpleGrantedAuthority>) authentication.getAuthorities()).stream().map(SimpleGrantedAuthority::getAuthority).collect(Collectors.toList());
        CurrentUser authenticatedUser = (CurrentUser) authentication.getPrincipal();
        Map<String, Object> user = new HashMap<>();
        user.put("email", authentication.getName());
        user.put("login", authenticatedUser.getUser().getLogin());
        user.put("roles", userRoles);
        return ResponseEntity.ok(user);
    }

}
