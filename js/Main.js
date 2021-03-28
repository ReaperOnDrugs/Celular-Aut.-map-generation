let dens = document.getElementById("dens");

function info() {
    alert("Density represents how common walls are in percentage \n Best results are between 45% and 60%");
}

function check() {
    let txt = dens.value;
    if (isNaN(txt) || txt < 1){
        alert("Input is not a number! (Enter only a number between 1 and 99)");
        dens.value = "";
        return;
    }
    localStorage.setItem("generator_density", txt);
    location.href = "./Map.html";
}