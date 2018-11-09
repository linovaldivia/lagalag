package org.lagalag.web.repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.lagalag.web.model.entity.PlaceSense;
import org.springframework.stereotype.Repository;

/**
 * A simple in-memory data store for PlaceSense objects. Useful for mocking/testing only.
 * Not threadsafe.
 *
 */
@Repository
public class SimplePlaceSenseRepository implements PlaceSenseRepository {
    private static Long CURRENT_ID = 1L;
    
    private Map<Long,PlaceSense> placeSenses = new HashMap<>();
    
    @Override
    public <S extends PlaceSense> S save(S entity) {
        if (entity.getId() == null) {
            entity.setId(CURRENT_ID++);
        }
        placeSenses.put(entity.getId(), entity);
        return entity;
    }

    @Override
    public <S extends PlaceSense> Iterable<S> saveAll(Iterable<S> entities) {
        throw new UnsupportedOperationException();
    }

    @Override
    public Optional<PlaceSense> findById(Long id) {
        return Optional.of(placeSenses.get(id));
    }

    @Override
    public boolean existsById(Long id) {
        return placeSenses.containsKey(id);
    }

    @Override
    public Iterable<PlaceSense> findAll() {
        return Collections.unmodifiableCollection(placeSenses.values());
    }

    @Override
    public Iterable<PlaceSense> findAllById(Iterable<Long> ids) {
        throw new UnsupportedOperationException();
    }

    @Override
    public long count() {
        return placeSenses.size();
    }

    @Override
    public void deleteById(Long id) {
        placeSenses.remove(id);
    }

    @Override
    public void delete(PlaceSense entity) {
        placeSenses.remove(entity.getId());
    }

    @Override
    public void deleteAll(Iterable<? extends PlaceSense> entities) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteAll() {
        throw new UnsupportedOperationException();
    }
}
