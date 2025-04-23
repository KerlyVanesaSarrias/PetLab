fetch("/pages/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("container-navbar").innerHTML = data;
    });