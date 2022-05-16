$(document).ready(function(){
    $('#selectFile').attr('disabled',true);
    $('#uploadFile').attr('disabled',true);
    
    $('#restaurant').keyup(function(){
        if($(this).val().replace(/\s/g, '').length !=0){
            $('#selectFile').attr('disabled', false);
            $('#uploadFile').attr('disabled', false);
        }
        else
        {
            $('#selectFile').attr('disabled', true);        
            $('#uploadFile').attr('disabled', true);
        }
    })
});