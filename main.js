$(function() {
    // Gets cryptocurr info from ajax call. 
    window.getCoins = function() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "https://api.coingecko.com/api/v3/coins/list",
                    success: coinList => resolve(coinList),
                    error: error => reject(error)
                });
            })
        }

        
   
        
        // every new page load show all coins to user 
    $(document).ready(() => {
        getCoins()
            .then(coinList => {
                $('.coinContainer').empty();
                for (coin in coinList) {
                    if (coin < 100) {
                        $('input[type="checkbox"]').bootstrapToggle();
                        $('.coinContainer').append(`
                            <div class='coinBlock text-left card'>
                                <h5 class='card-title'>${coinList[coin].name}</h5>
                                <input type="checkbox"  data-toggle="toggle">
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
    // search for coins
    // shows error when user types the wrong coin name
    // shows error when no input is entered into search field
    $('#searchButton').click(() => {
        const search = $('#searchInput').val();
        if (search === '') {
            Swal.fire({
                title: 'Oops!',
                text: "Please enter the coins name into the search field",
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        getCoins()
            .then(coinList => {
                let flag;
                for (coin in coinList) {
                    if (coinList[coin].name === search) {
                        flag = true;
                        $('.coinContainer').empty();
                        $('.coinContainer').append(`
                        <div class='coinBlock text-left card'>
                            <h5 class='card-title'>${coinList[coin].name}</h5>
                            <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                            <button class='btn btn-primary'>More Info</button>
                        </div>
                            `);
                        break
                    } else {
                        flag = false;
                    }
                }
                if (flag === false) {
                    Swal.fire({
                        title: 'Oops!',
                        text: "We couldn't find this coin, maybe you typed it wrong?",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
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