(function(){
    const buyButton = document.querySelector("buy-button");
    const check = document.querySelector(".version_check");
    const image = document.querySelector("img");
    
    check.addEventListener("change", e => {
        const version = e.target.checked ? "platinum" : "standard";
        buyButton.setAttribute("version", version);
        image.src = image.src.replace(/(standard|platinum)/, version)
    })

    buyButton.addEventListener("checkout:item_added", e => {
        image.classList.add("animate-bounce");
        image.classList.add("motion-reduce");
        console.log(e);
        setTimeout(
            () => {
                image.classList.remove("animate-bounce");
                image.classList.remove("motion-redus");

            }, 4000
        );
    })

})();
