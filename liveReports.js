$(function() {
    const coinList = returnCoinList();

    function chart() {
        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Multi-Series Line Chart"
            },
            data: [{
                    type: "line",
                    dataPoints: [
                        { x: 10, y: 21 },
                        { x: 20, y: 25 },
                        { x: 30, y: 20 },
                        { x: 40, y: 25 },
                        { x: 50, y: 27 },
                        { x: 60, y: 28 },
                        { x: 70, y: 28 },
                        { x: 80, y: 24 },
                        { x: 90, y: 26 }

                    ]
                },
                {
                    type: "line",
                    dataPoints: [
                        { x: 10, y: 31 },
                        { x: 20, y: 35 },
                        { x: 30, y: 30 },
                        { x: 40, y: 35 },
                        { x: 50, y: 35 },
                        { x: 60, y: 38 },
                        { x: 70, y: 38 },
                        { x: 80, y: 34 },
                        { x: 90, y: 44 }

                    ]
                },
                {
                    type: "line",
                    dataPoints: [
                        { x: 10, y: 45 },
                        { x: 20, y: 50 },
                        { x: 30, y: 40 },
                        { x: 40, y: 45 },
                        { x: 50, y: 45 },
                        { x: 60, y: 48 },
                        { x: 70, y: 43 },
                        { x: 80, y: 41 },
                        { x: 90, y: 28 }

                    ]
                },
                {
                    type: "line",
                    dataPoints: [
                        { x: 10, y: 71 },
                        { x: 20, y: 55 },
                        { x: 30, y: 50 },
                        { x: 40, y: 65 },
                        { x: 50, y: 95 },
                        { x: 60, y: 68 },
                        { x: 70, y: 28 },
                        { x: 80, y: 34 },
                        { x: 90, y: 14 }

                    ]
                }
            ]
        });

        chart.render();
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

        getChart(coinList).then(coinChart => {
            console.log(coinChart)
        })
    });

});