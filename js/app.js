import { db } from "./guitarras.js"

const carrito = []

const divContainer = document.querySelector('main div')
const carritoContainer = document.querySelector('#carrito')

const createCard = (guitar) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `<div class="col-4">
                    <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
                    <p>${guitar.descripcion}</p>
                    <p class="fw-black text-primary fs-3">${guitar.precio}</p>
                    <button 
                        data-id="${guitar.id}"
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`

    div.innerHTML = html
    return div
}

const createCart = (carrito) => {
    const p = document.createElement('p')
    p.className = 'text-center'
    p.innerText = 'EL carrito está vacío'
    const div = document.createElement('div')
    const html = `<table class="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img class="img-fluid" src="./img/guitarra_02.jpg" alt="imagen guitarra">
                                            </td>
                                            <td>SRV</td>
                                            <td class="fw-bold">
                                                    $299
                                            </td>
                                            <td class="flex align-items-start gap-4">
                                                <button
                                                    type="button"
                                                    class="btn btn-dark"
                                                >
                                                    -
                                                </button>
                                                    1
                                                <button
                                                    type="button"
                                                    class="btn btn-dark"
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    class="btn btn-danger"
                                                    type="button"
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p class="text-end">Total pagar: <span class="fw-bold">$899</span></p>
                                <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>`
    div.innerHTML = html
    if(carrito.length === 0){
        carritoContainer.innerHTML = ''
        carritoContainer.appendChild(p)
    } else {
        carritoContainer.innerHTML = ''    
        carritoContainer.appendChild(div)
    }
}
const buttonClicked = (e) => {
    if(e.target.classList.contains('btn')){
        const dataId = e.target.getAttribute('data-id')
        // Verificar si existe guitar en carrito
        const idCarrito = carrito .findIndex(g => g.id === Number(dataId))
        //Si no, crea un objeto nuevo
        if(idCarrito === -1){
            carrito.push({
                ...db[Number(dataId) - 1],
                cantidad: 1
            })
        } else {
            //Si si incrementa cantidad
            carrito[idCarrito].cantidad++
        } 
        createCart(carrito)
    }
}
db.forEach((guitar) => {
    console.log(guitar.nombre)
    divContainer.appendChild(createCard(guitar))
})
createCart(carrito)

divContainer.addEventListener('click', buttonClicked)