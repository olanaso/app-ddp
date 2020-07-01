$(document).ready(function() {
    $('#buttonID').on('click', function(event) {
        var $this = $(this);

        var isvalidate = $("#formlogin")[0].checkValidity();
        if (isvalidate) {
            $this.button('loading');
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "/api/signin",
                data: {
                    dni:$('#dni').val(),
                    clave:$('#clave').val()
                },
                success: function(response) {
                    console.log(response)
                    if(response.indicator==-1 || response.indicator==0 || response.indicator==-2){
                        $('#message').show()
                        $('#message').text(response.message)
                        $("#message").fadeOut(5000);
                    }

                    if(response.indicator==1 ){

                        localStorage.setItem('token', response.token)
                        localStorage.setItem('server', response)
                        //location.ref='/dashboard';
                        window.location.href='/modulos'
                    }

                    $this.button('reset');

                }
                ,error(xhr, ajaxOptions, thrownError) {
                    console.log(xhr)
                    console.log(ajaxOptions)
                    console.log(thrownError)

                    alert(xhr.status);
                    alert(thrownError);
                    $this.button('reset');
                }
            });
        }
    });
});
