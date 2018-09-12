package org.lagalag.web.data;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a trip that was made to a certain destination for a period of time.
 * 
 * @author lvaldivia
 *
 */
@Data
@AllArgsConstructor
public class Travel {
    private String title;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
}
