document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    // Captura los valores de los campos del formulario
    var paradero = document.getElementById("paradero").value;

    // Haz lo que necesites con los datos capturados
    console.log("paradero: " + paradero);

    cargaDatos(paradero)
});

const cargaDatos = async (paradero) => {
    try {
        const respuesta = await fetch(`http://localhost:5000/datos/${paradero}`);
        //console.log(respuesta);

        const datosJson = await respuesta.json();


        const datos = datosJson.map(x => x.bus);
        console.log(datos)

        console.log(datosJson);
        pintaCard1(datosJson);
    } catch (error) {
        console.log(error)
    }


}


const pintaCard = (datos) => {
    const container = document.querySelector('.card-container');
    container.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');
    const col = document.createElement('div');
    col.classList.add('col')

    const card = document.createElement('div');
    card.classList.add('card');
    datos.map(x =>
        card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">#${x.bus}</h5>
        <p class="card-text">${x.seDirige}</p>
      </div>
    `)

    col.appendChild(card)
    container.appendChild(card);
}



const pintaCard1 = (datos) => {
    const container = document.querySelector('.card-container');
    container.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');

    datos.forEach((x) => {
        const col = document.createElement('div');
        col.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = `#${x.bus}`;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = `se Dirige: ${x.seDirige}`;

        const cardH4 = document.createElement('h5');
        cardH4.classList.add('card-text', 'text-danger');
        cardH4.textContent = `Desvio Planificado: ${x.DesvioPlanificado}`;

        const cardH3 = document.createElement('h6');
        cardH3.classList.add('card-text', 'text-warning');
        cardH3.textContent = `Tiempo estimado: ${x.tiempoEstimado}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardH4);
        cardBody.appendChild(cardH3);

        card.appendChild(cardBody);
        col.appendChild(card);
        container.appendChild(col);
    });
};



