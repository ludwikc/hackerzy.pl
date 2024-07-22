 $(document).ready(function() {
            $('#submitButton').on('click', function() {
                // Capture the email input value
                var email = encodeURIComponent($('#emailInput').val());
                
                // Construct the URL with the email parameter
                var baseUrl = 'https://app.easycart.pl/checkout/siadlak/hackerzy';
                var email = encodeURIComponent($('#emailInput').val());
                var url = baseUrl + '?email=' + email;
                
                // Redirect to the constructed URL
                window.location.href = url;
            });
        });
