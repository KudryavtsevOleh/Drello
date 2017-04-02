package org.drello.projection;

import org.drello.persistence.CheckListItem;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "checkListItem", types = CheckListItem.class)
public interface CheckListItemProjection {

    String getId();
    String getName();
    Boolean getDone();

}
