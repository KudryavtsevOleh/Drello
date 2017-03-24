package org.drello.repository;

import org.drello.persistence.Board;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Board, String> {
}
