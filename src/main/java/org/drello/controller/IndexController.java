package org.drello.controller;

import lombok.extern.log4j.Log4j;
import org.drello.persistence.Test;
import org.drello.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j
@RestController
public class IndexController {

    @Autowired
    private TestRepository testRepository;

    @RequestMapping("/")
    public String index() {
        return "Hello world";
    }

}
