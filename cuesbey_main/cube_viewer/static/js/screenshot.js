/* http://cssglobe.com/easiest-tooltip-and-image-preview-using-jquery/ */

this.screenshotPreview = function(){
    /* CONFIG */

    xOffset = 10;
    yOffset = 30;

    // these 2 variable determine popup's distance from the cursor
    // you might want to adjust to get the right result

    /* END CONFIG */
    jQuery("a.screenshot").hover(function(e){
            this.t = this.title;
            this.title = "";
            var c = (this.t != "") ? "<br/>" + this.t : "";
            jQuery("body").append("<p id='screenshot'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</p>");
            jQuery("#screenshot")
                .css("top",(e.pageY - xOffset) + "px")
                .css("left",(e.pageX + yOffset) + "px")
                .fadeIn("fast");
        },
        function(){
            this.title = this.t;
            jQuery("#screenshot").remove();
        });
    jQuery("a.screenshot").mousemove(function(e){
        jQuery("#screenshot")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
    });
};


// starting the script on page load
jQuery(document).ready(function(){
    screenshotPreview();
});