package org.drello.projection;

import org.drello.persistence.Card;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "card", types = Card.class)
public interface CardProjection {

    String getId();
    String getName();
    String getDescription();
    List<UserProjection> getUsers();
    List<CommentProjection> getComments();
    List<AttachmentProjection> getAttachments();

}
