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
    // gets coin info by using argument
    window.getMoreInfo = function(coin){
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: `https://api.coingecko.com/api/v3/coins/${coin}`,
                success: information => resolve(information),
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
                        $('.coinContainer').append(`
                            <div class='coinBlock text-left card'>
                                <h5 class='card-title'>${coinList[coin].name}</h5>
                                <input type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select">
                                <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                                <button id='${coinList[coin].id}' class='btn btn-primary moreInfoButton' data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">More Info</button>
                                <div class="collapse collapse${coinList[coin].id}" id="collapseExample">
                                </div
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

    // click more info to get more information
    $(document).on('click', '.moreInfoButton', function(){ 
            console.log(this)
            getMoreInfo(this.id)
            .then(information=>{
                $(`.collapse${this.id}`).collapse()
                $(`.collapse${this.id}`).html(`
                    <div class="card card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
                    </div>
                `);
            })     
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
            return
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
                                <input type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select">
                                <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                                <button id='${coinList[coin].name}' class='btn btn-primary moreInfoButton'>More Info</button>
                            </div>
                        `);
                        $('input[type="checkbox"]').bootstrapToggle();
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