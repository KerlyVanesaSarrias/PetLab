
function registerUser (name, email, phoneNumber, password){
    console.log("datos recibidos desde el formulario");
    
    fetch('http://localhost:3000/users', {
        method : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify({
            name,
            email,
            phoneNumber,
            password
        })
    })
    .then(resp => resp.json())
    .then(data => console.log("Dostos subidos", data))
    .catch(err => console.log("Error en ....", err))

}

document.getElementById("form-register").addEventListener('submit',(e) =>{
    e.preventDefault();
    console.log("datos tomados");
    
    try {
        const name = document.getElementById("form-name").value;
        const email = document.getElementById("form-email").value;
        const phoneNumber = document.getElementById("form-number").value;
        const password = document.getElementById("form-password").value;

        registerUser(name,email,phoneNumber, password);
        console.log("datos enviados a la funcion");
        

        e.target.reset();

    } catch (error) {
        console.error("Error al enviar la info....", error);
        
    }
    
})