package org.drello.repository;

import org.drello.persistence.Attachment;
import org.springframework.data.repository.CrudRepository;

public interface AttachmentRepository extends CrudRepository<Attachment, Long> {
}
