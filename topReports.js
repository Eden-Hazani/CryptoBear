$(function() {
    let highCoinsWorth = [];
    let highCoinsName = [];


    function highChart() {
        let chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Highest Coins"
            },
            axisY: {
                title: "Price in USD"
            },
            data: [{
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints: [
                    { label: highCoinsName[0], y: highCoinsWorth[0] },
                    { label: highCoinsName[1], y: highCoinsWorth[1] },
                    { label: highCoinsName[2], y: highCoinsWorth[2] },
                    { label: highCoinsName[3], y: highCoinsWorth[3] },
                    { label: highCoinsName[4], y: highCoinsWorth[4] },
                    { label: highCoinsName[5], y: highCoinsWorth[5] },
                    { label: highCoinsName[6], y: highCoinsWorth[6] },
                    { label: highCoinsName[7], y: highCoinsWorth[7] },
                    { label: highCoinsName[8], y: highCoinsWorth[8] },
                    { label: highCoinsName[9], y: highCoinsWorth[9] }
                ]
            }]
        });
        chart.render();
    }
    // filter higest to lowest:
    $(document).on('click', '#filterCoins', function() {
        getTopCoins()
            .then(coinList => {
                console.log(JSON.stringify(coinList))
                for (coin in coinList.Data) {
                    let worth = coinList.Data[coin].DISPLAY.USD.PRICE.replace('$', '').replace(',', '')
                    highCoinsWorth.push(parseFloat(worth))
                    highCoinsName.push(coinList.Data[coin].CoinInfo.FullName)
                }
                console.log(highCoinsWorth)
                console.log(highCoinsName)
                $('.coinContainer').empty();
                $('.coinContainer').html(`<div id="chartContainer"></div>`);
                highChart()
            })
    });


});