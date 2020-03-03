$(function() {
    let chosenCoins = []
    let chosenCoinsModal = []
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
    window.getMoreInfo = function(coin) {
        return new Promise((resolve, reject) => {
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
                                <input id='toggler${coinList[coin].name}' type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                                <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                                <button id='${coinList[coin].id}' class='btn btn-primary moreInfoButton' data-toggle="collapse" data-target="#collapseExample${coinList[coin].id}" aria-expanded="false" aria-controls="collapseExample${coinList[coin].id}">More Info</button>
                                <div class='absoluteCollapse'>
                                    <div class='collapse' id="collapseExample${coinList[coin].id}">
                                    <img  id="loaderGif${coinList[coin].id}" style="display:none" src="http://chimplyimage.appspot.com/images/samples/classic-spinner/animatedCircle.gif" />
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

    // on click insert info into collapse
    $(document).on('click', '.moreInfoButton', async function() {
        try {
            showLoaderGif(this.id)
            const coinObj = await getMoreInfo(this.id);
            $(`#collapseExample${this.id}>.collapseWrapper`).html(`
            <div class='collapsedContent card card-body '>
                <div>US Dollar: ${coinObj.market_data.current_price.usd}</div>
                <div>Euro: ${coinObj.market_data.current_price.eur}</div>
                <div>NIS: ${coinObj.market_data.current_price.ils}</div>
                <img src='${coinObj.image.thumb}'>
            </div>
            `);
        } catch (err) {
            alert(JSON.stringify(err));
        } finally {
            hideLoaderGif(this.id)
        }

    });

    window.showLoaderGif = function(id){
        $('#loaderGif' + id).css('display', 'block');
    }

    window.hideLoaderGif = function(id){
        $('#loaderGif' + id).css('display', 'none');

    }


    // adds coins into array chosenCoins
    $(document).on('click', '.toggle', function() {
        const toggleId = $(this).children("input").attr("id").replace('toggler', '');
        if ($(this).hasClass('off')) {
            if(chosenCoins.includes(toggleId)){
                const index = chosenCoins.indexOf(toggleId);
                chosenCoins.splice(index, 1)
            }
            if (chosenCoins.length > 4) {
                showModal(chosenCoins)
                $('#insideModal').modal('show');
                chosenCoinsModal = Array.from(chosenCoins)
                return;
            }
        } else {
            if (chosenCoins.length > 4) {
                showModal(chosenCoins)
                $('#insideModal').modal('show');
                $(this).addClass('off');
                chosenCoinsModal = Array.from(chosenCoins)
                return;
            }
            chosenCoins.push(toggleId)
        }
    });

    // Modal window create
    function showModal(coinArray) {
        $('.modalWindow').html(
            `
            <div class="modal fade" id="insideModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Choose coins to remove</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class = 'modalToggleBox card card-body'>
                        <lable>${coinArray[0]}</lable>
                        <input class='modalToggle' id='toggler${coinArray[0]}' checked type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                    </div>
                    <div class = 'modalToggleBox card card-body'>
                        <lable>${coinArray[1]}</lable>
                         <input class='modalToggle' id='toggler${coinArray[1]}' checked type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                    </div>
                    <div class = 'modalToggleBox card card-body'>
                         <lable>${coinArray[2]}</lable>
                         <input class='modalToggle' id='toggler${coinArray[2]}' checked type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                    </div>
                    <div class = 'modalToggleBox card card-body'>
                        <lable>${coinArray[3]}</lable>
                        <input class='modalToggle' id='toggler${coinArray[3]}' checked type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                    </div>
                    <div class = 'modalToggleBox card card-body'>
                        <lable>${coinArray[4]}</lable>
                        <input class='modalToggle' id='toggler${coinArray[4]}' checked type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button id='modalCloseButton' type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id='modalSaveButton' type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            `
        );
        $('input[type="checkbox"]').bootstrapToggle();
    }

    
    $(document).on('click', '#modalCloseButton', function() {
        for (let i = 0; i < chosenCoinsModal.length; i++){
            chosenCoins[i] = chosenCoinsModal[i]
        }
    });

    $(document).on('click', '#modalSaveButton', function() {
        
        for(item of chosenCoinsModal){
            let togglerPerant = $(`#toggler${item}`).closest('div');
            console.log(togglerPerant)

            if($(togglerPerant).is(':checked')){
                console.log(item +"Checkbox is un.");
            }else{
                console.log(item +'Checkbox is checked')
            }
        }  
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
                                <input id='toggler${coinList[coin].name}' type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
                                <h6 class='card-subtitle'>${coinList[coin].symbol}</h6>
                                <button id='${coinList[coin].id}' class='btn btn-primary moreInfoButton' data-toggle="collapse" data-target="#collapseExample${coinList[coin].id}" aria-expanded="false" aria-controls="collapseExample${coinList[coin].id}">More Info</button>
                                <div class='absoluteCollapse'>
                                    <div class='collapse' id="collapseExample${coinList[coin].id}">
                                    <img  id="loaderGif${coinList[coin].id}" style="display:none" src="http://chimplyimage.appspot.com/images/samples/classic-spinner/animatedCircle.gif" />
                                        <div class='collapseWrapper'>
                                        </div>
                                    </div>
                                </div>
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