package org.drello.persistence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class CheckListItem {

    @Id
    private String id;
    private String name;
    private Boolean done;

}
