package org.drello.projection;

import org.drello.persistence.Column;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "column", types = Column.class)
public interface ColumnProjection {

    String getId();
    String getName();
    List<CardProjection> getCards();


}
