const backendUrl = "https://retoolapi.dev/uZVNRL/data";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("get").addEventListener("click", async () =>{
        fetch(backendUrl)
        .then(Response => Response.json())
        .then(data => Datafutar(data));
    });
});

function Datafutar(data){
    let szoveg = "";
    for (let i = 0; i < data.length; i++) {
        szoveg += `<div class="card border-dark col-mb-3" style="max-width: 30rem;">

        <div class="card-body text-dark">
        <div class="col-mb-3">
                <label for="megnevezes">megnevezes: ${data[i].id}</label>
            </div>
            <div class="col-mb-3">
                <label for="egysegar">egysegar: ${data[i].egysegar}</label>
            </div>
            <div class="col-mb-3">
                <label for="mennyisegiegyseg">mennyisegiegyseg: ${data[i].mennyisegiegyseg}</label>
            </div>
            <div class="col-mb-3">
                <label for="mennyiseg">mennyiseg: ${data[i].mennyiseg}</label>
            </div>

            
            <button type="button" id="update" class="btn btn-outline-warning" onclick ="modositas(${data[i].id})">Módosítás</button>
            <button type="button" id="delete" class="btn btn-outline-danger">Törlés</button>

        </div>
    </div>`
        
    };
    let card = document.getElementById("card").innerHTML = szoveg;
};

