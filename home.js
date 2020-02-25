$(function() {
    $('#homeLink').click(() => {
        getCoins()
            .then(coinList => {
                $('.coinContainer').empty();
                for (coin in coinList) {
                    if (coin < 100) {
                        $('.coinContainer').append(`
                        <div class='coinBlock text-left card'>
                            <h5 class='card-title'>${coinList[coin].name}</h5>
                            <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                            <button class='btn btn-primary'>More Info</button>
                        </div>
                    `);
                    }
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