$(function() {
    let coinsWorthShow = [null, null, null, null, null];
    let coinsWorthUSD = [null, null, null, null, null];
    let coinsWorthEUR = [null, null, null, null, null];
    let legendCoins = [false, false, false, false, false];
    let priceVar = 'USD';

    $(document).on('click', '.coinContainer>.toggle', function() {
        if ($(this).hasClass('off')) {
            let coinIndex = 0;
            for (let worth of coinsWorthUSD) {
                coinsWorthShow.splice(coinIndex, 1, worth)
                coinIndex++;
                priceVar = 'USD'
                console.log(coinsWorthShow)
                chart()
            }
        } else {
            let coinIndex = 0;
            for (let worth of coinsWorthEUR) {
                coinsWorthShow.splice(coinIndex, 1, worth)
                coinIndex++;
                priceVar = 'EUR'
                chart()
            }
        }
    });

    function chart() {
        let coinList = returnCoinList();
        let legendIndex = 0;
        for (let coin in coinList) {
            if (coin != '') {
                legendCoins.splice(legendIndex, 1, true)
            }
            legendIndex++;
        }
        let data1 = [{ x: new Date(), y: coinsWorthShow[0] }];
        let data2 = [{ x: new Date(), y: coinsWorthShow[1] }];
        let data3 = [{ x: new Date(), y: coinsWorthShow[2] }];
        let data4 = [{ x: new Date(), y: coinsWorthShow[3] }];
        let data5 = [{ x: new Date(), y: coinsWorthShow[4] }];
        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Crypto Chart " + priceVar + ' ' + new Date().toLocaleTimeString()
            },
            axisX: {
                title: "Time Line",
                gridThickness: 2
            },
            axisY: {
                title: "Price in " + priceVar
            },
            data: [{
                    showInLegend: legendCoins[0],
                    type: "spline",
                    dataPoints: data1,
                    legendText: coinList[0],
                },
                {
                    showInLegend: legendCoins[1],
                    type: "spline",
                    dataPoints: data2,
                    legendText: coinList[1],
                },
                {
                    showInLegend: legendCoins[2],
                    type: "spline",
                    dataPoints: data3,
                    legendText: coinList[2]

                },
                {
                    showInLegend: legendCoins[3],
                    type: "spline",
                    dataPoints: data4,
                    legendText: coinList[3],
                },
                {
                    showInLegend: legendCoins[4],
                    type: "spline",
                    dataPoints: data5,
                    legendText: coinList[4],
                }

            ]
        });

        chart.render();

        var updateChart = function() {

            let updateCount = new Date().toLocaleTimeString();


            data1.push({
                y: coinsWorthShow[0],
                x: new Date()
            });
            data2.push({
                y: coinsWorthShow[1],
                x: new Date()
            });
            data3.push({
                y: coinsWorthShow[2],
                x: new Date()
            });
            data4.push({
                y: coinsWorthShow[3],
                x: new Date()
            });
            data5.push({
                y: coinsWorthShow[4],
                x: new Date()
            });

            chart.options.title.text = "Crypto Chart " + priceVar + ' ' + updateCount;
            chart.render();

        };
        setInterval(function() { updateChart() }, 1000);

    }




    function getChart(coins) {
        return new Promise((resolve, reject) => {
            let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=`
            for (let i = 0; i < coins.length; i++) {
                url += coins[i] + ','
            }
            let fixedUrl = url.substring(0, url.length - 1);
            let wholeUrl = fixedUrl += '&tsyms=USD,EUR'
            console.log(wholeUrl)
            $.ajax({
                url: wholeUrl,
                success: coinChart => resolve(coinChart),
                error: error => reject(error)
            });
        })
    }

    $('#liveReports').click(() => {
        coinsWorthShow = [null, null, null, null, null];
        coinsWorthUSD = [null, null, null, null, null];
        coinsWorthEUR = [null, null, null, null, null];
        legendCoins = [false, false, false, false, false];
        let coinList = returnCoinList();
        console.log(coinList)
        if (coinList.length === 0) {
            Swal.fire({
                title: 'Oops!',
                text: "Please Select at least one coin to enter Charts!",
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return
        }
        $('.coinContainer').empty();
        $('.coinContainer').html(`
        <input id='togglerPriceUSDEUR' type="checkbox"  data-toggle="toggle" data-on="EUR" data-off="USD" data-style='ios'>
        <div id="chartContainer" ></div>`);
        $('input[type="checkbox"]').bootstrapToggle();
        getChart(coinList)
            .then(coinChart => {
                let index = 0;
                console.log(coinChart)
                for (let coin in coinChart) {
                    console.log(coin)
                    const priceUSD = coinChart[coin].USD
                    const priceEUR = coinChart[coin].EUR
                    coinsWorthUSD.splice(index, 1, priceUSD)
                    coinsWorthShow.splice(index, 1, priceUSD)
                    coinsWorthEUR.splice(index, 1, priceEUR)
                    console.log(index)
                    index++
                }
            })
        chart();

    });

});