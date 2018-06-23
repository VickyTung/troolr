$(document).ready(function() {
    loadData('TOP_RATED');
});

function loadData(method) {
    $.getJSON("data.json", function(data) {
        if (method == "TOP_RATED") {
            $("#sortByName").html("Top Rated");
            data.sort(function(a, b){
                return b["averageRating"] - a["averageRating"];
            });
        } else if (method == "MOST_POPULAR") {
            $("#sortByName").html("Most Popular");
            data.sort(function(a, b){
                return b["views"].length - a["views"].length;
            });
        }
        renderResult(data);
    });
}

$.getJSON("data.json", function(data) {
    renderResult(data);
});

function renderResult(data) {
    if (data.length == 0) {
        return;
    }
    $("#resultCount").html(data.length);
    var html = "";
    for (var i = 0; i < data.length; i += 3) {
        html += "<div class=\"row\">";
        for (var j = i; j < i+3 && j < data.length; j++) {
            var entry = data[j];
            var image = entry['profile_picture'];
            var title = entry['title'];
            var name = entry['name'];
            var address = entry['address']['city'] + ", " + entry['address']['state'];
            var rating = entry['averageRating'];

            html += "<div class=\"col-sm-4 col-md-3 result-item\">";
            html += "<img src=\"" + image + "\" style=\"width: 100%\">";
            html += "<div class=\"item-detail\">";
            html += "<div class=\"item-title\">" + title + "</div>";
            html += " <div class=\"item-name\">" + name + "</div>";
            html += " <div class=\"item-address\">" + address + "</div>";
            html += "<div class='detailBottom'>";
            html += printStarByRating(rating);
            html += "<button type=\"button\" class=\"btn btn-primary btn-sm btn-responsive view-profile\">View Profile</button>"
            html += "</div>"
            html += "</div>";
            html += "</div>";
        }
        html += "</div>";
    }
    $("#item-list").html(html);
}

function printStarByRating(rating) {
    var html = "";
    var count = 0;
    for (var i = 0; i < rating; i++) {
        html += "<span class=\"fa fa-star checked\"></span>";
        count++;
    }
    for (var i = 0; i < 5-count; i++) {
        html += " <span class=\"fa fa-star\"></span>";
    }
    return html;
}