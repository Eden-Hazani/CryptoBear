$(function() {
    let coinsWorth = [null, null, null, null, null];




    function chart() {
        let data1 = [{ y: coinsWorth[0] }];
        let data2 = [{ y: coinsWorth[1] }];
        let data3 = [{ y: coinsWorth[2] }];
        let data4 = [{ y: coinsWorth[3] }];
        let data5 = [{ y: coinsWorth[4] }];
        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Dynamic Data"
            },
            data: [{
                    type: "spline",
                    dataPoints: data1
                },
                {
                    type: "spline",
                    dataPoints: data2
                },
                {
                    type: "spline",
                    dataPoints: data3
                },
                {
                    type: "spline",
                    dataPoints: data4
                },
                {
                    type: "spline",
                    dataPoints: data5
                }

            ]
        });

        chart.render();

        updateCount = 0;
        var updateChart = function() {

            updateCount++;

            data1.push({
                y: coinsWorth[0]
            });
            data2.push({
                y: coinsWorth[1]
            });
            data3.push({
                y: coinsWorth[2]
            });
            data4.push({
                y: coinsWorth[3]
            });
            data5.push({
                y: coinsWorth[4]
            });

            chart.options.title.text = "Update " + updateCount;
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
            $.ajax({
                url: wholeUrl,
                success: coinChart => resolve(coinChart),
                error: error => reject(error)
            });
        })
    }

    $('#liveReports').click(() => {
        // if (coinList.length === 0) {
        //     alert('error')
        // }
        $('.coinContainer').empty();
        $('.coinContainer').html('<div id="chartContainer" style="height: 300px; width: 100%;"></div>');
        chart();
        let coinList = returnCoinList();
        getChart(coinList)
            .then(coinChart => {
                let index = 0;
                console.log(coinChart)
                for (let coin in coinChart) {
                    const priceUSD = coinChart[coin].USD
                    const priceEUR = coinChart[coin].EUR
                    coinsWorth.splice(index, 1, priceUSD)
                    index++
                    console.log(coinsWorth)
                }
            })
    });

});