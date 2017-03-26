package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document
public class Board {

    @Id
    private String id;
    private String name;

    @DBRef
    private List<Column> columns;

}