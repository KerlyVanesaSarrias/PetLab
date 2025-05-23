fetch("/pages/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("container-footer").innerHTML = data;

    });
    