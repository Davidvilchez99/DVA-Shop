var carrito;
var gastosDeEnvio = 3;

$(document).ready(function () {
    if (localStorage.carrito != null)
        carrito = JSON.parse(localStorage.carrito);
    else {
        carrito = [];
    }

    inicioVista()

})

function inicioVista() {
    const xhttp = new XMLHttpRequest();
    let vistaInicio = `
    <section id="hero">
                <div class="container">
                    <div id="carousel">
                    <div>
                    <img src="concepto/pexels-ksenia-chernaya-3965548.jpg" alt="">
                </div>
                <div>
                    <img src="concepto/pexels-shattha-pilabut-135620.jpg" alt="">
                </div>
                <div>
                    <img src="concepto/pexels-freestocksorg-291762.jpg" alt="">
                </div>
                <div>
                    <img src="concepto/pexels-roman-pohorecki-16170.jpg" alt="">
                </div>
                <div>
                    <img src="concepto/pexels-andrea-piacquadio-3775602.jpg" alt="">
                </div>
                <div>
                    <img src="concepto/pexels-andrea-piacquadio-972995.jpg" alt="">
                </div>
                <div>
                    <img src="concepto/pexels-karolina-grabowska-5706277.jpg" alt="">
                </div>
                <div>
                    <img src="concepto/pexels-erik-mclean-4062467.jpg" alt="">
                </div>
                <div>
                <img src="concepto/pexels-max-fischer-5868737.jpg" alt="">
                </div>
                    </div>
                </div>
                <div id="eslogan-carousel">
                    <h2>Perfila tu estilo, tú eres tu mejor diseñador</h2>
                </div>
            </section>
            <section id="eslogan">
                <div>
                    <div>
                        <h2>Bienvenido a DVA Shop</h2>
                        <p>Aqui encontraras todo lo que necesites, desde ropa hasta producto electronicos</p>
                        <p>¡¡Descubrenos!!</p>
                    </div>
                    <div><img src="concepto/pexels-cottonbro-studio-4937350.jpg" alt=""></div>
                </div>
                </section>
                <section id="siguenos">
                    <div id="div-big-siguenos">
                    <div>
                        <img src="concepto/pexels-anastasia-shuraeva-5704410.jpg" alt="img-siguenos">
                    </div>
                        <div>
                            <h2>SÍGUENOS</h2>
                            <p>Te esperamos en nuestras redes sociales.</p>
                            <p>Aquí sucede todo. No te lo pierdas.</p>
                            <i class="fa fa-instagram"></i>
                            <i class="fa fa-twitter"></i>
                            <i class="fa fa-youtube-play"></i>
                        </div>
                    </div>
                </section>
            <section id="email">
                <div>
                    <form action="">
                        <h2>Recibe nuestras novedades</h2>
                        <p>Suscríbete a nuestra Newsletter y consigue un -10% en tu próxima compra. Disfruta de descuentos y novedades exclusivas.</p>
                        <input type="text" placeholder="Escribe tu correo..." required><br>
                        <input type="submit" value="Suscribirme">
                    </form>
                </div>
            </section>`;
    $("main").html(vistaInicio);

    function cambiarVistaProductos(vista, orden) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                datos = JSON.parse(xhttp.responseText);
                $("main").html("");
                $("main").css("background-color", "#0c2a44");
                if (datos[1].category == "women's clothing") {
                    $("#mujer").css("color", "#ED4545");
                    $("#hombre").css("color", "#F3F0ED");
                    $("#joyeria").css("color", "#F3F0ED");
                    $("#accesorios").css("color", "#F3F0ED");
                }
                else if (datos[1].category == "men's clothing") {
                    $("#mujer").css("color", "#F3F0ED");
                    $("#hombre").css("color", "#ED4545");
                    $("#joyeria").css("color", "#F3F0ED");
                    $("#accesorios").css("color", "#F3F0ED");
                }
                else if (datos[1].category == "jewelery") {
                    $("#mujer").css("color", "#F3F0ED");
                    $("#hombre").css("color", "#F3F0ED");
                    $("#joyeria").css("color", "#ED4545");
                    $("#accesorios").css("color", "#F3F0ED");
                }
                else if (datos[1].category == "electronics") {
                    $("#mujer").css("color", "#F3F0ED");
                    $("#hombre").css("color", "#F3F0ED");
                    $("#joyeria").css("color", "#F3F0ED");
                    $("#accesorios").css("color", "#ED4545");
                }
                let divContainer = `<div id="div--select">
                <select id="select">
                <option>Orden</option>
                <option value="desc">Descendente</option>
                <option value="asc">Ascendente</option>
                </select>
                <button class="ordenarProductos">Ordenar</button>
                </div><div class="div--container">`;
                for (i = 0; i < datos.length; i++) {
                    divContainer += `<div class="div--producto">
                <div class="div--product--img"><img  src="${datos[i].image}"></div>
                <div class="info--div--product">
                <h2>${datos[i].title}</h2>
                <p>${datos[i].price} €</p>
                </div>
            </div>`


                }
                divContainer += `</div>`;
                $(divContainer).addClass("div--container");
                $("main").append(divContainer);
                AnañdirEventoClickDivProducto();
                AnañdirEventoClickOrdenarProductos(datos[1].category);
            }

        }
        xhttp.open("GET", "https://fakestoreapi.com/products/category/" + vista + "?sort=" + orden);
        xhttp.send();
        if (this.readyState != 4 && this.status != 200) {
            $("main").css("background-color", "white");
            $("main").html('<img id="gif" src="concepto/progress.gif" alt="">')
        }
    }

    function AnañdirEventoClickDivProducto() {
        $(".div--producto").on("click", function () {
            var index = $(".div--producto").index(this);
            cambiarVistaProducto(index);

        })
    }
    function AnañdirEventoEliminarProducto() {
        $(".papelera").on("click", function () {
            var index = $(".papelera").index(this);
            $(this).fadeOut("normal", function () {
                $(this).parent().parent().remove();
            });
            carrito.splice(index, 1);
            localStorage.carrito = JSON.stringify(carrito);
            cambiarVistaCarrito();
        })
    }
    function AnañdirEventoTramitarPedido() {
        $("#tramitarPedido").on("click", function () {
            cambiarVistaFinalizarCompra();
        })
    }

    function cambiarVistaFinalizarCompra() {
        let vistaFinalizarPedido = `<div id="container--compra">
        <div id="datos-compra">
            <h2>Datos</h2>
            <input type="text" id="name" placeholder="Nombre" required>
            <input type="text" id="surname" placeholder="Apellidos" required>
            <input type="tel" id="tel" pattern="[0-9]{9}" placeholder="Telefono" required>
            <input type="email" id="email-btn" placeholder="Correo" required>
            <input type="text" id="direction" placeholder="Direccion" required>
            <input type="tel" id="postalCode" pattern="[0-9]{5}" maxlength="5" placeholder="Código Postal" required>
        </div>
        <div id="tarjeta-compra">
            <h2>Tarjeta</h2>
            <input type="tel" id="targetNumber"  maxlength="19" placeholder="Nº Tarjeta" required>
            <select name='expireMM' id='expireMM'>
                <option value=''>Mes</option>
                <option value='01'>January</option>
                <option value='02'>February</option>
                <option value='03'>March</option>
                <option value='04'>April</option>
                <option value='05'>May</option>
                <option value='06'>June</option>
                <option value='07'>July</option>
                <option value='08'>August</option>
                <option value='09'>September</option>
                <option value='10'>October</option>
                <option value='11'>November</option>
                <option value='12'>December</option>
            </select> 
            <select name='expireYY' id='expireYY'>
                <option value=''>Año</option>
                <option value='20'>2020</option>
                <option value='21'>2021</option>
                <option value='22'>2022</option>
                <option value='23'>2023</option>
                <option value='24'>2024</option>
            </select> 
            <input type="tel" id="CVV" pattern="[0-9]{3}" maxlength="3" placeholder="CVV" required>
            <input type="submit" id="buy" value="Pagar">
            <div id="div-finalizar-compra">
                <p id="p-finalizar-compra"></p>
                <p id="p2-finalizar-compra"></p>
            </div>
        </div>
    </div>`;
        $("main").html("");
        $("main").append(vistaFinalizarPedido);
        AnañdirEventoEnviarEmailCompra()
    }

    function AnañdirEventoEnviarEmailRegistro() {
        $("#registrarse-submit").on("click", () => {
            sendEmailRegister($("#userName").val(), $("#name").val(), $("#surname").val(), $("#password").val(), $("#tel").val(), $("#email-btn").val());
        });
    }

    function sendEmailRegister(username, name, surname, password, tel, email) {
        emailjs.send("service_9l2m11s", "template_3snb592", {
            from_name: "DVA Shop",
            username: username,
            name: name,
            surname: surname,
            password: password,
            tel: tel,
            email: email,
        }).then(response => {
            console.log("success", response.status);
            $("#p-registro-respuesta").text("Registro completado");
            $("#p2-registro-respuesta").text("Correo enviado con éxito");
            $("#userName").val("");
            $("#name").val("");
            $("#surname").val("");
            $("#password").val("");
            $("#tel").val("");
            $("#email-btn").val("");

        }, (error) => {
            console.log(error);
            $("#p-registro-respuesta").text("Registro fallido, revise los datos");
            $("#p2-registro-respuesta").text("Correo no enviado");
        })
    }

    function AnañdirEventoEnviarEmailCompra() {
        $("#buy").on("click", () => {
            subtotal = actualizarCarrito().toFixed(2);
            total = (actualizarCarrito()+3).toFixed(2);
            sendEmailBuy($("#email-btn").val(), subtotal, total);
        });
    }

    function sendEmailBuy(email, subtotal, total) {
        emailjs.send("service_9l2m11s", "template_amf0jcn", {
            from_name: "DVA Shop",
            subtotal: subtotal,
            total: total,
            email: email,
        }).then(response => {
            console.log("success", response.status);
            $("#p-finalizar-compra").text("Compra realizada");
            $("#p2-finalizar-compra").text("Correo enviado con éxito");
            $("#userName").val("");
            $("#name").val("");
            $("#surname").val("");
            $("#password").val("");
            $("#tel").val("");
            $("#email-btn").val("");
            $("#postalCode").val("");
            $("#tel").val("");
            $("#direction").val("");
            $("#targetNumber").val("");
            $("#expireYY").val("");
            $("#expireMM").val("");
            $("#CVV").val("");

        }, (error) => {
            console.log(error);
            $("#p-finalizar-compra").text("Compra fallida, revise loss datos");
            $("#p2-finalizar-compra").text("Correo no enviado");
        })
    }



    function AnañdirEventoClickActualizarProducto() {
        $(".actualizarProducto").on("click", function () {
            var index = $(".actualizarProducto").index(this);
            carrito[index].amount = $(".cantidadProducto")[index].value;
            localStorage.carrito = JSON.stringify(carrito);
            cambiarVistaCarrito();

        })
    }
    function AnañdirEventoClickAñadirProducto(datosProducto) {
        const button = document.querySelector(".addtocart");
        const done = document.querySelector(".done");
        let added = false;
        button.addEventListener('click', () => {
            if (added) {
                done.style.transform = "translate(-110%) skew(-40deg)";
                added = false;
            }
            else {
                if ($("select").val() == "Talla") {
                    alert("Debe escoger una talla");
                }
                else {
                    done.style.transform = "translate(0px)";
                    let producto = {
                        id: datosProducto.id,
                        category: datosProducto.category,
                        image: datosProducto.image,
                        title: datosProducto.title,
                        price: datosProducto.price,
                        size: $("select").val(),
                        amount: parseInt($("#cantidad-producto").val())
                    }
                    var prodcutosExistentes = false;
                    for (j = 0; j < carrito.length; j++) {
                        if (carrito[j].id == producto.id && carrito[j].size == producto.size) {
                            carrito[j].amount += parseInt($("#cantidad-producto").val());
                            prodcutosExistentes = true;
                        }
                    }
                    if (!prodcutosExistentes) {
                        carrito.push(producto);
                    }
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                }
                added = true;
            }

        });
    }

    function cambiarVistaUsuario() {
        let vistaUsuario = `<div id="user--div">
        <div id="registro">
            <h2>Inicio de sesión</h2>
            <input type="text" id="user-register" placeholder="Usuario" required>
            <input type="password" id="userName-register" pattern="(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.
            ])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Contraseña" required><br>
            <input type="submit" id="registrado-submit" value="Iniciar Sesion">
        </div>
        <div id="registrarse">
        <h2>Registrarse</h2>
        <input type="text" id="userName" placeholder="Nombre de usuario" required>
        <input type="text" id="name" placeholder="Nombre" required>
        <input type="text" id="surname" placeholder="Apellidos" required>
        <input type="tel" id="tel" pattern="[0-9]{9}" placeholder="Telefono" required>
        <input type="email" id="email-btn" placeholder="Correo" required>
        <input type="password" id="password" pattern="(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.
        ])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Contraseña" required><br>
        <input type="submit" id="registrarse-submit" value="Registrarse">
        </div>
        <div id="registro--div--respuesta">
        <p id="p-registro-respuesta"></p>
        <p id="p2-registro-respuesta"></p>
    </div>
    </div>`
        $("main").html("");
        $("main").append(vistaUsuario);
        AnañdirEventoEnviarEmailRegistro();
    }

    function cambiarVistaCarrito() {
        if (carrito.length == 0) {
            let vistaCarritoVacio = `<div id="div--carritoVacio"><h1 id="h1carritoVacio">Tu carrito está vacío</h1></div>`;
            $("main").html(vistaCarritoVacio);
        }
        else {
            productosCarrito = JSON.parse(localStorage.carrito);
            let vistaCarrito = `<div id="container--cesta--productos"><div id="productos">`;
            for (j = 0; j < productosCarrito.length; j++) {
                vistaCarrito += `<div id="cesta-producto">
            <div><img src="${productosCarrito[j].image}" alt=""></div>
            <div>
                <h3>${productosCarrito[j].title}</h3>`
                if (productosCarrito[j].category == "women's clothing" || productosCarrito[j].category == "men's clothing") {
                    vistaCarrito += `<p>Talla: ${productosCarrito[j].size}</p>`
                }
                vistaCarrito += `<p class="pPrecio">${productosCarrito[j].price} €</p>
            </div>
            <div class="div-delete-producto">
            <button class="actualizarProducto">Actualizar</button>
            </div>
            <div class="div-actualizar-producto">
            <label>Cantidad: </label><input type="number" min="1" max="20" class="cantidadProducto" value="${productosCarrito[j].amount}" name="cantidadProducto">
            <i class="papelera fa fa-trash"></i>
            </div>
        </div>`;
            }
            vistaCarrito += `</div>
        <div id="cesta">
            <p id="subtotal">Subtotal: `+ actualizarCarrito().toFixed(2) + ` €</p>
            <p id="gastosdeEnvio">Gastos de envio: `+ gastosDeEnvio + ` €</p>
            <p id="total">Total: `+ (actualizarCarrito()+gastosDeEnvio).toFixed(2) + ` €</p>
            <button id="tramitarPedido">Tramitar pedido</button>
        </div></div>`;
            $("main").html("");
            $("main").append(vistaCarrito);
            AnañdirEventoClickActualizarProducto();
            AnañdirEventoEliminarProducto();
            AnañdirEventoTramitarPedido();
        }
    }

    function actualizarCarrito() {
        Subtotal = 0;
        for (j = 0; j < productosCarrito.length; j++) {
            Subtotal += (productosCarrito[j].price * productosCarrito[j].amount);
        }
        return Subtotal;
    }

    function cambiarVistaProducto(index) {
        datosProducto = datos[index];
        let vistaProducto = `<div id="product--container">
        <div id="imagenes">
            <img src="${datosProducto.image}" alt="">
        </div>
        <div id="info">
            <h1>${datosProducto.title}</h1>
            <p>${datosProducto.description}</p>
            <p>${datosProducto.price} €</p>
            <p>Valoracion: ${datosProducto.rating.rate}</p>
            <p>Votos: ${datosProducto.rating.count}</p>`;
        if (datosProducto.category == "women's clothing" || datosProducto.category == "men's clothing") {
            vistaProducto += `<select name="" id="">
                <option value="Talla">Talla</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>`;
        }        
        vistaProducto += `<br><label>Cantidad: </label><input type="number" min="0" max="20" value="1" id="cantidad-producto"><br><button class="addtocart">
        <div class="pretext">
          <i class="fa fa-cart-plus"></i> ADD TO CART
        </div>
        
        <div class="pretext done">
          <div class="posttext"><i class="fa fa-check"></i> ADDED</div>
        </div>
        
      </button>
        </div>
        </div>`;
        $("main").html("");
        $("main").append(vistaProducto);

        AnañdirEventoClickAñadirProducto(datosProducto);
    }


    $("#logo").on("click", function () {
        $("main").html(vistaInicio);
        $("#mujer").css("color", "#F3F0ED");
        $("#hombre").css("color", "#F3F0ED");
        $("#joyeria").css("color", "#F3F0ED");
        $("#accesorios").css("color", "#F3F0ED");
    })

    $("#carrito").on("click", function () {
        $("#mujer").css("color", "#F3F0ED");
        $("#hombre").css("color", "#F3F0ED");
        $("#joyeria").css("color", "#F3F0ED");
        $("#accesorios").css("color", "#F3F0ED");
        cambiarVistaCarrito();
    })

    $("#usuario").on("click", function () {
        $("#mujer").css("color", "#F3F0ED");
        $("#hombre").css("color", "#F3F0ED");
        $("#joyeria").css("color", "#F3F0ED");
        $("#accesorios").css("color", "#F3F0ED");
        cambiarVistaUsuario();
    })

    $("#mujer").on("click", function () {
        cambiarVistaProductos("women's%20clothing", "desc");
    })
    $("#hombre").on("click", function () {
        cambiarVistaProductos("men's%20clothing", "desc");
    })
    $("#joyeria").on("click", function () {
        cambiarVistaProductos("jewelery", "desc");
    })
    $("#accesorios").on("click", function () {
        cambiarVistaProductos("electronics", "desc");
    })

    function AnañdirEventoClickOrdenarProductos(categoria) {
        $(".ordenarProductos").on("click", function () {
            if ($("#select").val() == "Orden") {
                alert("Introduce un orden");
            } else {
                if (categoria == "women's clothing") {
                    if ($("#select").val() == "asc") {
                        cambiarVistaProductos("women's%20clothing", "asc")
                    }
                    else if ($("#select").val() == "desc") {
                        cambiarVistaProductos("women's%20clothing", "desc")
                    }
                }
                else if (categoria == "men's clothing") {
                    if ($("#select").val() == "asc") {
                        cambiarVistaProductos("men's%20clothing", "asc")
                    }
                    else if ($("#select").val() == "desc") {
                        cambiarVistaProductos("men's%20clothing", "desc")
                    }
                }
                else if (categoria == "jewelery") {
                    if ($("#select").val() == "asc") {
                        cambiarVistaProductos("jewelery", "asc")
                    }
                    else if ($("#select").val() == "desc") {
                        cambiarVistaProductos("jewelery", "desc")
                    }
                }
                else if (categoria == "electronics") {
                    if ($("#select").val() == "asc") {
                        cambiarVistaProductos("electronics", "asc")
                    }
                    else if ($("#select").val() == "desc") {
                        cambiarVistaProductos("electronics", "desc")
                    }
                }
            }
        })
    }
}