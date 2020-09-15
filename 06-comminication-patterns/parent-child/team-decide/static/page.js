(function(){
    const buyButton = document.querySelector("buy-button");
    const check = document.querySelector(".version_check");
    const image = document.querySelector("img");
    
    check.addEventListener("change", e => {
        const version = e.target.checked ? "platinum" : "standard";
        buyButton.setAttribute("version", version);
        image.src = image.src.replace(/(standard|platinum)/, version)
    })
})();
