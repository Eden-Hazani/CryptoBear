$(function() {
    let highCoinsWorth = [];
    let highCoinsVolume = [];
    let highCoinsName = [];

    function highChart() {
        let chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Highest Coins"
            },
            axisY: {
                title: "Volume"
            },
            data: [{
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints: [
                    { label: highCoinsName[0] + ` price USD: ${highCoinsWorth[0]} `, y: highCoinsVolume[0] },
                    { label: highCoinsName[1] + ` price USD:${highCoinsWorth[1]} `, y: highCoinsVolume[1] },
                    { label: highCoinsName[2] + ` price USD:${highCoinsWorth[2]} `, y: highCoinsVolume[2] },
                    { label: highCoinsName[3] + ` price USD:${highCoinsWorth[3]} `, y: highCoinsVolume[3] },
                    { label: highCoinsName[4] + ` price USD:${highCoinsWorth[4]} `, y: highCoinsVolume[4] },
                    { label: highCoinsName[5] + ` price USD:${highCoinsWorth[5]} `, y: highCoinsVolume[5] },
                    { label: highCoinsName[6] + ` price USD:${highCoinsWorth[6]} `, y: highCoinsVolume[6] },
                    { label: highCoinsName[7] + ` price USD:${highCoinsWorth[7]} `, y: highCoinsVolume[7] },
                    { label: highCoinsName[8] + ` price USD:${highCoinsWorth[8]} `, y: highCoinsVolume[8] },
                    { label: highCoinsName[9] + ` price USD:${highCoinsWorth[9]} `, y: highCoinsVolume[9] }
                ]
            }]
        });
        chart.render();
    }
    // filter higest to lowest:
    $(document).on('click', '#filterCoins', function() {
        highCoinsVolume = [];
        highCoinsName = [];
        highCoinsWorth = [];
        getTopCoins()
            .then(coinList => {
                console.log(JSON.stringify(coinList))
                for (coin in coinList.Data) {
                    let worth = coinList.Data[coin].RAW.USD.PRICE
                    let volume = coinList.Data[coin].RAW.USD.TOTALTOPTIERVOLUME24HTO
                    highCoinsVolume.push(parseInt(volume))
                    highCoinsName.push(coinList.Data[coin].CoinInfo.FullName)
                    highCoinsWorth.push(worth)
                }
                $('.coinContainer').empty();
                $('.coinContainer').html(`<div id="chartContainer"></div>`);
                highChart()
            })
    });


});