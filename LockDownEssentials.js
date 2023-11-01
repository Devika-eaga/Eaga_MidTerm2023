const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol('Welcome'),
    LIST_ITEMS: Symbol('List_items'),
    UPSELL_ITEMS: Symbol('Upsell_items'),
    CALCULATE_TOTAL: Symbol('Calculate_total'),
    CONFIRMATION: Symbol('Conformation'),
});

class LockDownEssentials extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sItemsList = [];
        this.sUpsellItems = 0;
        this.sTotal = 0;
        this.sConfirmation = "";
    }

    handleInput(sInput) {
        let aReturn = [];

        switch (this.stateCur) {
            case OrderState.WELCOMING:
                aReturn.push("Welcome to the Devika's home maintenance essentials store! ");
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("Please select item from list :\nSnow shovels\n Garbage and Recycling containers\n Household cleaners\n Furnace filters\n Screen");
                this.stateCur = OrderState.LIST_ITEMS;
                break;

            case OrderState.LIST_ITEMS:
                if (isValidItem(sInput)) {
                    this.sItemsList.push(sInput);
                    aReturn.push(`Added ${sInput} to shopping cart.`);
                    aReturn.push("Would you like to order more items from items list? Please enter (Yes/No)");
                } else if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Choose any items from the list:\n Snow shovels\n Garbage and Recycling containers\n Household cleaners\n Furnace filters\n Screen");
                } else if (sInput.toLowerCase() === 'no') {
                    aReturn.push("Would you like to add any upsell items? Please enter (Yes/No)");
                    this.stateCur = OrderState.UPSELL_ITEMS;
                }
                else{
                    aReturn.push(`please choose the items from the above`);
                    this.stateCur = OrderState.LIST_ITEMS;
                }
                break;

            case OrderState.UPSELL_ITEMS:
                if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Choose an upsell item from the list:\n Car cloths \n Ear buds");
                    aReturn.push("Please visit the below url for more information:")
                    aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                    this.stateCur = OrderState.CALCULATE_TOTAL;
                    this.sUpsellItems = 50;
                } else if (sInput.toLowerCase() === "no") {
                    this.stateCur = OrderState.CALCULATE_TOTAL;
                }else{
                    aReturn.push(`please choose the items from the above`);
                    this.stateCur = OrderState.UPSELL_ITEMS;
                }
                break;

            case OrderState.CALCULATE_TOTAL:
                if(sInput.toLowerCase()=='ear buds'||sInput.toLowerCase() =='car cloths'){
                this.sTotal = calculateTotal(this.sItemsList) + this.sUpsellItems;
                const price = this.sTotal;
                const taxAmount = this.sTotal * TAX;
                const total = this.sTotal + taxAmount;
                aReturn.push(`Total price: $${price.toFixed(2)}`);
                aReturn.push(`Tax amount: $${taxAmount.toFixed(2)}`);
                aReturn.push(`Final bill with tax : $${total.toFixed(2)}.`);
                aReturn.push("Would you like to confirm your purchase? Please enter (Yes/No)");
                this.stateCur = OrderState.CONFIRMATION;}
                else{
                    aReturn.push("Please enter the valid input");
                    this.stateCur=OrderState.CALCULATE_TOTAL;
                }
                break;

            case OrderState.CONFIRMATION:
                if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Thank you for shopping with us!");
                    aReturn.push("We will let us know about your order from 567-435-1477 once your order is shipped");
                    this.isDone(true);
                } else if (sInput.toLowerCase() === "no") {
                    aReturn.push("your order is declined, Thank you!");
                    this.isDone(true);
                } else {
                    aReturn.push("Please enter 'Yes/No' to confirm or cancel the order");
                }
                break;
        }

        return aReturn;
    }

    renderForm() {
        return (`<html>

        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                ol {
                    margin: 0;
                    padding: 0
                }
        
                table td,
                table th {
                    padding: 0
                }
        
                .c3 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 222pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c5 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 219.8pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c12 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 223.5pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c7 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 221.2pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c15 {
                    padding-top: 0pt;
                    border-top-width: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    border-top-style: solid;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c1 {
                    padding-top: 0pt;
                    border-top-width: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    border-top-style: solid;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c13 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    height: 11pt
                }
        
                .c8 {
                    color: #202122;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 14.5pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c4 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c10 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c11 {
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }
        
                .c14 {
                    background-color: #ffffff;
                    max-width: 451.4pt;
                    padding: 72pt 72pt 72pt 72pt
                }
        
                .c9 {
                    height: 21.8pt
                }
        
                .c0 {
                    height: 24.8pt
                }
        
                .c2 {
                    height: 39.8pt
                }
        
                .c6 {
                    height: 34.5pt
                }
        
                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-size: 26pt;
                    padding-bottom: 3pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .subtitle {
                    padding-top: 0pt;
                    color: #666666;
                    font-size: 15pt;
                    padding-bottom: 16pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                h1 {
                    padding-top: 20pt;
                    color: #000000;
                    font-size: 20pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-size: 16pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h3 {
                    padding-top: 16pt;
                    color: #434343;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h4 {
                    padding-top: 14pt;
                    color: #666666;
                    font-size: 12pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h5 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h6 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    font-style: italic;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
            </style>
        </head>
        
        <body class="c14 doc-content">
            <p class="c15"><span class="c10">For Curbside Pick up:</span></p><a
                id="t.27db4d02f04a56aec994ad1c4da361ae957bcc63"></a><a id="t.0"></a>
            <table class="c11">
                <tr class="c9">
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c1"><span class="c4">Item</span></p>
                    </td>
                    <td class="c5" colspan="1" rowspan="1">
                        <p class="c1"><span class="c4">Cost</span></p>
                    </td>
                </tr>
                <tr class="c0">
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c1"><span class="c8">Snow Shovels</span></p>
                    </td>
                    <td class="c5" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">$25</span></p>
                    </td>
                </tr>
                <tr class="c2">
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c1"><span class="c8">Garbage and recycling containers</span></p>
                    </td>
                    <td class="c5" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">$30</span></p>
                    </td>
                </tr>
                <tr class="c0">
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c1"><span class="c8">Household cleaners</span></p>
                    </td>
                    <td class="c5" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">$10</span></p>
                    </td>
                </tr>
                <tr class="c0">
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c1"><span class="c8">Furnace filters</span></p>
                    </td>
                    <td class="c5" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">$8</span></p>
                    </td>
                </tr>
                <tr class="c0">
                    <td class="c12" colspan="1" rowspan="1">
                        <p class="c1"><span class="c8">Screen for screen door</span></p>
                    </td>
                    <td class="c5" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">$12</span></p>
                    </td>
                </tr>
            </table>
            <p class="c13"><span class="c10"></span></p><a id="t.54ae6ac63a0a57150386d7134980c578aaa934ea"></a><a id="t.1"></a>
            <table class="c11">
                <tr class="c9">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">Upsell Item</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">Price</span></p>
                    </td>
                </tr>
                <tr class="c0">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c1"><span class="c8">Car cloths</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">$50</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c3" colspan="1" rowspan="1">
                        <p class="c1"><span class="c8">Ear buds</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c1"><span class="c10">$50</span></p>
                        <p class="c13"><span class="c10"></span></p>
                    </td>
                </tr>
            </table>
            <p class="c13"><span class="c10"></span></p>
        </body>
        
        </html>`

        )
    }
}

function isValidItem(item) {
    const validItems = [
        "snow shovels", "garbage and recycling containers", "household cleaners", "furnace filters", "screen"
    ];
    return validItems.includes(item.toLowerCase());
}

const itemPrice = {
    "snow shovels": 35,
    "garbage and recycling containers": 25,
    "household cleaners": 15,
    "furnace filters": 13,
    "screen": 50,
};

const TAX = 0.13;

function calculateTotal(sItemsList) {
    let totalPrice = 0;
    for (const item of sItemsList) {
        if (itemPrice[item]) {
            totalPrice += itemPrice[item];
        }
    }
    return totalPrice;
}

module.exports = LockDownEssentials;

