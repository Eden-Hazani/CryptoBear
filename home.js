$(function() {

    // shows all coins on home click
    $('#homeLink').click(() => {
        getCoins()
            .then(coinList => {
                $('.coinContainer').empty();
                for (coin in coinList) {
                    if (coin < 100) {
                        $('.coinContainer').append(`
                            <div class='coinBlock text-left card'>
                                <h5 class='card-title'>${coinList[coin].name}</h5>
                                <input type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select">
                                <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                                <button id='${coinList[coin].name}' class='btn btn-primary moreInfoButton'>More Info</button>
                            </div>
                        `);
                    }
                    $('input[type="checkbox"]').bootstrapToggle();

                }
            })
            .catch(error => Swal.fire({
                title: 'Error!',
                text: 'Something Went Wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            }))

    });



});