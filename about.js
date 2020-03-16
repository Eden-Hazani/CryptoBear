$(function() {

    $('#about').click(() => {
        $('.coinContainer').empty();
        $('.coinContainer').html(
            `
            <div class='col-6 colAboutInfo infoTxt'>
                <div class="aboutInfo card">
                <div class="aboutMe card">
                    <h5 class="card-title">About Me</h5>
                    <div class="card-body">
                        Started programming at John Bryce in 2019.
                        Fell in love with the world of code and how
                        It affects our daily lives.
                        Always striding to improve my work.
                        Coding is a passion and I seek to
                        Improve myself with every project I take.
                        I love to learn, evolve and excel
                        In everything I do.
                    </div>
                    <h6 class="card-subtitle mb-2 text-muted">Cheak Out My Portfolio <a target='_blank' href="https://shockhit.github.io/Portfolio/">Here!</a></h6>
                </div>
                <div class="aboutProject"></div>
                </div> 
            </div>
            <div  class='col-4 colAboutInfo'>
                <div class="selfImage">
                    <img class='selfImage' src='assets/images/Portrait.jpg'>
                </div>
            </div>
            <div class='col'>
                <video class='dancingBears' autoplay loop src="assets/images/dancingBears.mp4"></video>
            </div>
            </div>
           
            `
        );
    });

});