let moviesSelect = document.querySelector('#moviesSelect')

function allMovies(){
    fetch('https://studio-ghibli-films-api.herokuapp.com/')
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser()
        let doc = parser.parseFromString(html, 'text/html')
        let ghibliSelect = doc.querySelector('select')
        let ghibliMovies = ghibliSelect.outerHTML
        setMovies(ghibliMovies)
    })

    function setMovies(movies){
        moviesSelect.innerHTML += `
            ${movies}
        `
    }

    moviesSelect.addEventListener('change', function(){
        let selectedMovie = this.value
        console.log(selectedMovie)

        currentMovie()
        
        function currentMovie(){
            fetch(`https://studio-ghibli-films-api.herokuapp.com/api/${selectedMovie}`)
            .then(response => response.json())
            .then(info => {
                cardMovie.innerHTML = ""
                cardMovie.innerHTML += `
                    <div class="rounded-3 w-50" style="background: url('${info.poster}'); background-position: bottom; background-repeat: no-repeat; background-size: cover">
                        <div class="blur text-center rounded-4 mb-0"
                            <div class="card rounded-4">
                                <img src="${info.poster}" alt="Movie Picture" class="card-img w-50 mt-3 mx-auto rounded-3">
                                <div class="card-body text-white mt-2 mb-4">
                                    <span class="fs-5">Título:</span><br>
                                    <p class="card-title fs-6">${info.title}</p>
                                    <hr class="w-25 mx-auto">
                                    <div class="card-text px-4">
                                        <span class="fs-5">Descripción</span>
                                        <p class="fs-6">${info.synopsis}</p>
                                        <hr class="w-25 mx-auto">
                                        <span class="fs-5">Título original:</span>
                                        <p class="fs-6">${info.hepburn}</p>
                                        <hr class="w-25 mx-auto">
                                        <span class="fs-5">Fecha de estreno:</span>
                                        <p class="fs-6">${info.release}</p>
                                        <hr class="w-25 mx-auto">
                                        <span class="fs-5">Director:</span>
                                        <p class="fs-6">${info.director}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                `
            })
        }
    })
}

allMovies()
