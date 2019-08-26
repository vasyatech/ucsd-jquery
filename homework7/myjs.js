$(document).ready(function() {
    $("#button").click(function(){
        //alert("click");
        $("#images").empty();
        
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
            tags: $("#q").val(),
            format: "json"
        }).done(function (result) {
            $.each(result.items, function (i, item) {
                $("<img>").attr("src", item.media.m).appendTo("#images");
                if (i === 10) {
                    return false;
                }
            });
            }).fail(function (jqXHR) {
                $("#images").append("<p>" + 'An error occurred: ' + jqXHR.status + " - " + jqXHR.responseText + "</p>");
            });
    })
})