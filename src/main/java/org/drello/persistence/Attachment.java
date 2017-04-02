package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Attachment {

    @Id
    @GeneratedValue
    private Long id;
    private String path;

}
