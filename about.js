$(function() {

    $('#about').click(()=> { 
        $('.coinContainer').empty();
        $('.coinContainer').html(
            `
            <div class='col-4 colAboutInfo'>
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
                        I love to learn and evolve and excel
                        In everything I do.
                    </div>
                    </div>
                <div class="aboutProject"></div>
                </div> 
            </div>
            <div  class='col-4 colAboutInfo'>
                <div class="selfImage">
                    <img class='selfImage' src='/assets/images/Portrait.jpg'>
                </div>
            </div>
           
            `
        );
    });

});