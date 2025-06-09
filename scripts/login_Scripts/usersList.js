
function getUserList() {
    fetch('https://8mameppfds.us-east-1.awsapprunner.com/auth')
        .then(resp => resp.text())
        .then(text => {
            console.log("Respuesta cruda:", text);
            const data = JSON.parse(text); 
            console.log("Como JSON:", data);
            const tbody = document.getElementById("usersTableBody");
            tbody.innerHTML = '';

            data.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML=`
                    <td>${user.nombre}</td>
                    <td>${user.correo}</td>
                    <td>${user.telefono}</td>
                    <td>
                        <i>
                            <lord-icon
                            trigger="hover"
                            src="/lottie/system-regular-39-trash-hover-trash-empty.json"
                            style="width:24px;height:24px"
                            ></lord-icon>
                        </i>
                        <i>
                            <lord-icon
                            trigger="hover"
                            src="/lottie/wired-outline-245-edit-document-hover-pinch.json"
                            style="width:24px;height:24px"
                            ></lord-icon>
                        </i>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error("Error:", err));

    
}



getUserList();
