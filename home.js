$(function() {

    // shows all coins on home click
    $('#homeLink').click(() => {
        getCoins()
            .then(coinList => {
                $('.coinContainer').empty();
                for (coin in coinList) {
                    if (coin < 100) {
                        $('.coinContainer').append(`
                        <div class='coinBlock text-left card coinBlockOf${coinList[coin].id}'>
                        <h5 class='card-title'>${coinList[coin].name}</h5>
                        <input id='toggler${coinList[coin].id}' type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                        <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                        <button id='${coinList[coin].id}' class='btn btn-primary moreInfoButton' data-toggle="collapse" data-target="#collapseExample${coinList[coin].id}" aria-expanded="false" aria-controls="collapseExample${coinList[coin].id}">More Info</button>
                        <div class='absoluteCollapse'>
                            <div class='collapse' id="collapseExample${coinList[coin].id}">
                            <img class ='loaderGif'  id="loaderGif${coinList[coin].id}" style="display:none" src="assets/images/bearLoadingGif.gif" />
                                <div class='collapseWrapper'>
                                </div>
                            </div>
                        </div>
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