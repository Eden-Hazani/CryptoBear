$(function() {
    const coinList = returnCoinList();
function chart(){
    let data = [{y : 0}];
    let data2 = [{y : 10}];
	var chart = new CanvasJS.Chart("chartContainer", {
			title : {
				text : "Dynamic Data"
			},
            data: [
                {        
                  type: "spline",
                  dataPoints: data
                },
                  {        
                  type: "spline",
                  dataPoints: data2
                },
                  {        
                  type: "spline",
                  dataPoints: data
                },
                  {        
                  type: "spline",
                  dataPoints: data
                }
            ]
		});

	chart.render();
	
	var yVal = 15, updateCount = 0;
	var updateChart = function () {

		yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
      	updateCount++;
		
		data.push({
			y : yVal
		});
		data2.push({
			y : yVal
		});
      	
        chart.options.title.text = "Update " + updateCount;
		chart.render();    
		
    };
    setInterval(function(){updateChart()}, 1000);

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