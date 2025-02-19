let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 100);
})


//Fetching the prediction data from python.
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let formData = new FormData(this);

        fetch("/predict", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.getElementById("result");
            if (data.prediction === 0) {
                resultDiv.innerHTML = '<div class="alert alert-danger">Negative Review!</div>';
            } else if (data.prediction === 1) {
                resultDiv.innerHTML = '<div class="alert alert-success">Positive Review!</div>';
            } else {
                resultDiv.innerHTML = '<div class="alert alert-warning">Unexpected response</div>';
            }
        })
        .catch(error => console.error("Error:", error));
    });
});