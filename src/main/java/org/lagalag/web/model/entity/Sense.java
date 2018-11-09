package org.lagalag.web.model.entity;

public enum Sense {
    YES_LOVED_IT(true),
    YES_MEH(true),
    YES_HATED_IT(true),
    NO_WANNA_GO(false),
    NOT_INTERESTED(false);
    
    private boolean impliesVisited;
    
    private Sense(boolean impliesVisited) {
        this.impliesVisited = impliesVisited;
    }
    
    public boolean impliesVisited() {
        return impliesVisited;
    }
}
