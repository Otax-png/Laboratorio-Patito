console.log("estas aqui")

function login() {
    let usuario = document.getElementById("usuario");
    let password = document.getElementById("password");
    console.log(usuario.value)
    console.log(password.value)

    alert("hola " + usuario.value);
}