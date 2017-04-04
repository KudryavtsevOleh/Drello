package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Attachment {

    @Id
    @GeneratedValue
    private Long id;
    private String path;

}
