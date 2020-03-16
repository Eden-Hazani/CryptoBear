$(function() {
    let chosenCoins = []
    let chosenCoinsModal = []
    let savedInfo = []
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
        // get top coin lists
    window.getTopCoins = function() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD",
                success: coinList => resolve(coinList),
                error: error => reject(error)
            });
        })
    }

    window.returnCoinList = function() {
        return chosenCoins
    }



    // every new page load show all coins to user 
    $(document).ready(() => {
        getCoins()
            .then(coinList => {
                $('.coinContainer').empty();
                for (coin in coinList) {
                    if (coin < 100) {
                        $('.coinContainer').append(`
                            <div class='coinBlock text-left card coinBlockOf${coinList[coin].symbol}'>
                                <h5 class='card-title'>${coinList[coin].name}</h5>
                                <input id='toggler${coinList[coin].symbol}' type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
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
            .finally(() => hideMainGif())

    });

    // shows all coins on home click
    $('#homeLink').click(() => {
        getCoins()
            .then(coinList => {
                $('.coinContainer').empty();
                showMainGif()
                for (coin in coinList) {
                    if (coin < 100) {
                        $('.coinContainer').append(`
                        <div class='coinBlock text-left card coinBlockOf${coinList[coin].symbol}'  >
                            <h5 class='card-title'>${coinList[coin].name}</h5>
                            <input id='toggler${coinList[coin].symbol}' type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
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
            .finally(() => {
                hideMainGif()
                displayChosenCoinHoemButton()
            })

    });

    // on click insert info into collapse
    $(document).on('click', '.moreInfoButton', async function() {
        try {
            if ($(`#${this.id}`).hasClass('collapsed')) {
                return null
            }
            if (localStorage.getItem(this.id)) {
                const json = localStorage.getItem(this.id).replace(/[{}]/g, '').replace(/\\n/g, '').replace('"value":"', '').replace('","expiry', '');
                const afterWithout = json.substr(0, json.lastIndexOf('"'));
                $(`#collapseExample${this.id}>.collapseWrapper`).html(afterWithout);
                return
            }
            showLoaderGif(this.id)
            const coinObj = await getMoreInfo(this.id);
            const infoContant = `
            <div class='collapsedContent card card-body '>
                <div>US Dollar: ${coinObj.market_data.current_price.usd} &#36</div>
                <div>Euro: ${coinObj.market_data.current_price.eur} &#8364</div>
                <div>NIS: ${coinObj.market_data.current_price.ils} &#8362</div>
                <img src='${coinObj.image.thumb}'>
            </div>
            `
            $(`#collapseExample${this.id}>.collapseWrapper`).html(infoContant);
            setLocalWithExpiry(this.id, infoContant, 120000)
            savedInfo.push(this.id)
        } catch (err) {
            alert(JSON.stringify(err));
        } finally {
            hideLoaderGif(this.id)
        }

    });



    function setLocalWithExpiry(key, value, ttl) {
        const now = new Date()
            // `item` is an object which contains the original value
            // as well as the time when it's supposed to expire
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        }
        localStorage.setItem(key, JSON.stringify(item))
    }

    function Expiry() {
        for (infoKey of savedInfo) {
            const itemStr = localStorage.getItem(infoKey)
                // if item not found return null
            if (!itemStr) {
                return null
            }
            const item = JSON.parse(itemStr)
            const now = new Date()
                // compare the expiry time of the item with the current time
            if (now.getTime() > item.expiry) {
                // If the item is expired, delete the item from storage
                localStorage.removeItem(infoKey)
            }
        }
    }

    setInterval(() => {
        Expiry()
    }, 1000);

    window.showMainGif = function() {
        $('.mainLoaderGif').css('display', 'block');
    }
    window.hideMainGif = function() {
        $('.mainLoaderGif').css('display', 'none');
    }


    window.showLoaderGif = function(id) {
        $('#loaderGif' + id).css('display', 'block');
    }

    window.hideLoaderGif = function(id) {
        $('#loaderGif' + id).css('display', 'none');

    }




    // adds coins into array chosenCoins
    $(document).on('click', '.coinBlock>.toggle, .modalToggleBox>.toggle', function() {
        const toggleId = $(this).children("input").attr("id").replace('toggler', '');
        if ($(this).hasClass('off')) {
            if (chosenCoins.includes(toggleId)) {
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
            console.log(chosenCoins)
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
        for (let i = 0; i < chosenCoinsModal.length; i++) {
            chosenCoins[i] = chosenCoinsModal[i]
        }
    });

    $(document).on('click', '#modalSaveButton', function() {
        console.log(chosenCoins)
        displayChosenCoin()
        $('#insideModal').modal('hide');

    });

    // displays toggle for load
    function displayChosenCoin() {
        $(".coinBlock > .toggle").removeClass("btn-primary");
        $(".coinBlock > .toggle").addClass("btn-light");
        $(".coinBlock > .toggle").addClass("off");
        $(".coinBlock > .toggle>input").prop("checked", false);
        for (const chosenCoin of chosenCoins) {
            $(`.coinBlockOf${chosenCoin}>div`).removeClass("off");
        }
    }

    // displays toggles for home
    function displayChosenCoinHoemButton() {
        $(".coinBlock > .toggle>input").prop("checked", false);
        for (const chosenCoin of chosenCoins) {
            $(`.coinBlockOf${chosenCoin}>div>input`).prop("checked", true);
            $(`.coinBlockOf${chosenCoin}>div`).removeClass("off");
        }
    }




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
                        <div class='coinBlock text-left card coinBlockOf${coinList[coin].symbol}' >
                            <h5 class='card-title'>${coinList[coin].name}</h5>
                            <input id='toggler${coinList[coin].symbol}' type="checkbox"  data-toggle="toggle" data-on="Selected" data-off="Select" data-style='ios'>
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
            .finally(() => displayChosenCoin())
    });





});