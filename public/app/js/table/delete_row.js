$(".deleterow").on("click", function(){
                   var $killrow = $(this).parent('tr');
                   $killrow.addClass("danger");
                   $killrow.fadeOut(500, function(){
                   $(this).remove();
             });});
        