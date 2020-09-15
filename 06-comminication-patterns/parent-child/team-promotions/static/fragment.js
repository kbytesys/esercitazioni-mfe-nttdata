(function(){

    class PromotionsArea extends HTMLElement {
        connectedCallback() {
            this.items = [];
            console.log("MONTA", "promotion area")
            window.addEventListener("checkout:item_added", evt => {
                console.log("ti mostro le promozioni");
                this.items.push(evt.detail);
                this.render()
            });
            this.render();
        } 

        render(){

            const totale = this.items.reduce((acc, item) => acc + +item.price, 0);
            console.log(totale)
            if(
                totale > 100
            ){
                this.innerHTML = `Hai il 30% di sconto`;
            }else{
                this.innerHTML = `Non hai nessuno sconto`;
            }
        }
    }

    window.customElements.define("promotions-area", PromotionsArea);

})()