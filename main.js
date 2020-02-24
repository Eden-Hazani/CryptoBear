$(function() {
    window.getCoins = function() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.coingecko.com/api/v3/coins/list",
                success: coinList => resolve(coinList),
                error: error => reject(error)
            });
        })
    }

});