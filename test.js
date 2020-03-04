
"use strict";

$(function () {

    $("#homeLink").click(async function () {
        $("#contentDiv").empty();
        const coinsList = await getCoins();
        showCoinsInfo(coinsList)
        displayChosenCoin();
    });
    const coinsOfUser = [];

    function displayChosenCoin() {
        $(".mainCard > .toggle").addClass("off");
        for (const chosenCoin of coinsOfUser) {
            console.log(chosenCoin);
            $(`#divOf${chosenCoin}>div`).removeClass("off");
        }
    }
    async function showCoinsInfo(coinsArray) {
        try {
            let html = "";
            for (const coin of coinsArray) {
                if (coinsArray.indexOf(coin) < 100) {
                    const div = `
                <div class="text-left card mainCard" id="divOf${coin.id}">
                    <h5 class="card-title">${coin.symbol}</h5>
                    <input type="checkbox" class="toggles checkBox" id="toggle${coin.id}" data-toggle="toggle" data-style="ios" data-size="xs">
                    <span class="card-text">${coin.id}</span>
                   <p>
                    <button class="moreInfoButton btn btn-primary btn-sm" id="${coin.id}" data-toggle="collapse" data-target="#outCollapse${coin.id}"aria-expanded="false" aria-controls="#multiCollapse${coin.id}">More info</button>
                    </p>
                    <div class="collapse colArea" id="outCollapse${coin.id}">
                        <div class="insideCollapse" id="multiCollapse${coin.id}"></div>
                    </div>
               </div>`;
                    html += div;

                }

            }
            $("#contentDiv").append(html);
            $(`input[type="checkbox"]`).bootstrapToggle();
        }
        catch (err) {
            alert(err);
        }


    }

    $(document).on("click", ".toggle", function () {
        if ($(this).hasClass(`off`)) {
            const coinIdByUser = $(this).children("input").attr("id");
            if (coinIdByUser.includes("toggle")) {
                const fixedCoinIdByUser = coinIdByUser.replace("toggle", "");
                const toggleIndex = coinsOfUser.indexOf(fixedCoinIdByUser);
                coinsOfUser.splice(toggleIndex, 1);
                console.log(coinsOfUser);
            }
            else if (coinIdByUser.includes("inside")) {
                const fixedCoinIdByUser = coinIdByUser.replace("inside", "");
                const toggleIndex = coinsOfUser.indexOf(fixedCoinIdByUser);
                coinsOfUser.splice(toggleIndex, 1);
                console.log(coinsOfUser);
            }


        }
        else {

            const coinIdByUser = $(this).children("input").attr("id");
            const fixedStrCoin = coinIdByUser.replace("toggle", "")
            if (coinsOfUser.length >= 5) {
                coinsOfUser.push(fixedStrCoin);
                console.log(fixedStrCoin);
                $("#modalDiv").append(getCoinsToRemove());
                $("#exampleModal").modal("show");
                $(`input[type="checkbox"]`).bootstrapToggle();

            }
            else {
                const fixedStrCoin = coinIdByUser.replace("toggle", "")
                coinsOfUser.push(fixedStrCoin);
                console.log(fixedStrCoin);
            }
        }
    })

    function getCoinsToRemove() {
        let index = 0;
        let insideHtml = "";
        for (const coin of coinsOfUser) {
            const fixedStrCoin = coin.replace("toggle", "")
            const coinHtml = `
      <div class="modalToggleDiv" id="modelToggleDiv${coin}">
  <h5>${fixedStrCoin}<h5>
  <input type="checkbox" checked id="inside${coin}" data-toggle="toggle" data-style="ios" data-size="xs">
  </div>`
            index++;
            insideHtml += coinHtml;
        }
        const html = `
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Coins list can't be over 5. Please choose coin to remove.</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="insideModalDiv">
${insideHtml}
        </div>
        <div class="modal-footer">
        <button type="button" id="cancelButton" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" id="saveChangesButton" class="btn btn-primary">Save changes</button>
      </div>
        </div>
        
      </div>
    </div>
  </div>`;

        return html;


    }

    //After cenceled modal function
    $(document).on("click", "#cancelButton", function () {
        coinsOfUser.splice(5, 1);
        displayChosenCoin();
        console.log("After cancel: " + coinsOfUser);

    });
    //After saving modal changes function

    $(document).on("click", "#saveChangesButton", function () {

        displayChosenCoin();
        $("#exampleModal").modal("hide");

    });
    //After closin modal function

    $(document).on("click", ".close", function () {
        coinsOfUser.splice(5, 1);
        displayChosenCoin();
        console.log("After cancel: " + coinsOfUser);

    })
    $(`.mainCard`).toggle();
    function getCoins() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.coingecko.com/api/v3/coins/list",
                error: err => reject(err),
                success: coins => resolve(coins),
            });
        });

    }
    console.log(coinsOfUser);
    function getCoinByID(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://api.coingecko.com/api/v3/coins/${id}`,
                error: err => reject(err),
                success: coin => resolve(coin),
            });
        });

    }

    $(document).on(`click`, `.moreInfoButton`, async function () {
        try {
            const coinObj = await getCoinByID(this.id);
            $(`#multiCollapse${this.id}`).html(
                `<div class="card card-body">
                    <img src="${coinObj.image.small} heigt="35px" width="35px">
                    <br>
                    <span>USD: ${coinObj.market_data.current_price.usd} &#36;</span>
                    <span>EUR: ${coinObj.market_data.current_price.eur} &#128;</span>
                    <span>ILS: ${coinObj.market_data.current_price.ils} &#8362;</span>
                </div>`);
        }
        catch (err) {
            alert(JSON.stringify(err));
        }

    })
});
