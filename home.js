$(function() {
    $(document).ready(() => {
        getCoins()
            .then(coinList => {
                $('.coinContainer').empty();
                for (coin in coinList) {
                    if (coin < 100) {
                        console.log(coinList[coin].name)
                        $('.coinContainer').append(`
                            <div class='coinBlock text-left'>
                                <div>${coinList[coin].name}</div>
                                <div>${coinList[coin].symbol}</div>
                                <button>More Info</button>
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