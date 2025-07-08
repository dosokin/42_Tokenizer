import {getSignedGrillz42Contract} from "./ethClient.js";
import {errorAlert} from "./popup.js";
import {getBalance, spinnerOpts} from "./utils.js";
import {productPurchaseSuccess} from "./orderSuccess.js";
import {Spinner} from "spin.js";

async function purchaseProduct(productPrice, productName, productImage) {

    const signedContract = await getSignedGrillz42Contract();

    const orderId = (Math.random() + 1).toString(15).substring(2);

    if (await getBalance() < productPrice) {
        errorAlert("You don't have enough $GRZ to purchase this product");
        return
    }

    const tx = await signedContract.purchaseProduct(orderId, BigInt(productPrice * 10 ** 18));
    await tx.wait();

    await productPurchaseSuccess(productName, productImage);
}

async function mintGoldCricket(productName) {

    const signedContract = await getSignedGrillz42Contract();

    if (await getBalance() < 100000) {
        errorAlert("You don't have enough $GRZ to purchase this product");
        return
    }

    let target = document.getElementById('nft');
    let spinner = new Spinner(spinnerOpts).spin(target);

    try {
        const tx = await signedContract.mintGoldCricket();
        await tx.wait();
    } catch (err) {
        errorAlert(err.reason);
    }

    spinner.stop();

}

function initButtons() {

    const item1 = document.getElementById("snackbar");
    const item2 = document.getElementById("cricketbox");
    const item3 = document.getElementById("chocolate");
    const item4 = document.getElementById("nft");

    item1.addEventListener("click", () => purchaseProduct(1000, "GRZ Cricket Based Chocolate Bar", "/snackbar.png"));
    item2.addEventListener("click", () => purchaseProduct(5000, "GRZ 100g of 100% Natural Crickets", "/cricketbox.png"));
    item3.addEventListener("click", () => purchaseProduct(10000, "GRZ Cricket Chocolate", "/chocolate.png"));
    item4.addEventListener("click", () => mintGoldCricket("GRZ Gold Cricket NFT"));
}

initButtons();