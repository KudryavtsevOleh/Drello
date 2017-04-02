package org.drello.projection;

import org.drello.persistence.Attachment;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "attachment", types = Attachment.class)
public interface AttachmentProjection {

    String getId();
    String getPath();

}
