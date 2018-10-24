/**
 * AJAX helper functions.
 * Requires jquery to be loaded first in the containing document.
 */

function postJSON(endpoint, jsonDataObj) {
    var postSettings = {
        url: endpoint,
        data: JSON.stringify(jsonDataObj),
        contentType: "application/json"
    };
    return $.post(postSettings);
}