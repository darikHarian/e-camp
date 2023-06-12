const groups = [1, 2, 3]

for (const group of groups){
    const mouseEvent = document.querySelector(`#cardGroup${group}`)
    const mouseAction = document.querySelector(`#gr${group}Chr1`)
    mouseEvent.addEventListener('mouseenter', function(){
        mouseAction.style.visibility = 'visible'
    })
}

async function* generateCard(){

}

let id = 1
const URL = 'https://swapi.dev/api/people/'
const getData = () => {
    response = fetch(`${URL}${id}`)
    info = response.json()
    console.log(response)
} 


    

    // $("#cardGroup1").mouseenter(function(){
    //     $("#gr1Chr1").css({
    //         "visibility":"visible"
    //     });
    // });

    // $("#cardGroup2").mouseenter(function(){
    //     $("#gr2Chr1").css({
    //         "visibility":"visible"
    //     });
    // });

    // $("#cardGroup3").mouseenter(function(){
    //     $("#gr3Chr1").css({
    //         "visibility":"visible"
    //     });
    // });
