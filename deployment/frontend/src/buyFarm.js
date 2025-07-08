import {getSelectedLocation, updateMap} from "./map.js";
import {getGrillzFarm42Contract, getProvider, getSignedGrillzFarm42Contract} from "./ethClient.js";
import {errorAlert, successAlert} from "./popup.js";
import {parseCords, formatCords} from "./map-utils.js";
import {confetti} from "@tsparticles/confetti";
import {parseEther} from "ethers";
import {Spinner} from 'spin.js';
import {spinnerOpts} from "./utils.js";
import {scale} from "leaflet/src/control/Control.Scale.js";


async function getEthPrice() {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    let ethPrice;

    await fetch('https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum', options)
        .then(res => res.json())
        .then(res => ethPrice = res.ethereum.usd)
        .catch(err => console.error(err));

    return parseFloat(ethPrice);
}

async function getEthFarmPrice() {

    const ethPrice = await getEthPrice();
    const USD_FARM_PRICE = 20;

    const ethFarmPrice = Math.round(USD_FARM_PRICE / ethPrice * 1e3) / 1e3;

    return ethFarmPrice.toString();
}

function successAnimation() {
    confetti({
        spread: 360,
        ticks: 200,
        gravity: 1,
        decay: 0.94,
        startVelocity: 30,
        particleCount: 100,
        scalar: 3,
        shapes: ["image"],
        shapeOptions: {
            image: [{
                src: "/cricket-circle.png",
                width: 32,
                height: 32,
            }],
        },
    });
}

async function handleBuyFarm() {
        const farmName = document.getElementById("farm-name").value;
        const location = getSelectedLocation();

        if (!farmName || !location) {
            errorAlert(location ? "Please choose a name for your farm" : "Please choose a location for your farm");
            return
        }

        const signedContract = await getSignedGrillzFarm42Contract();

        let latitude = Math.round(location.lat * 100);
        let longitude = Math.round(location.lng * 100);

        const weiAmount = parseEther(await getEthFarmPrice());

        let target = document.getElementById('buy-farm');
        let spinner = new Spinner({...spinnerOpts, scale: 1}).spin(target);

    try {

        const tx = await signedContract.buildFarm(
            latitude,
            longitude,
            farmName,
            {value: weiAmount}
        );

        await tx.wait();
        successAnimation();

    } catch (err) {

        if (err.toString().indexOf("INSUFFICIENT_FUNDS")){
            errorAlert("You don't have enough ETH")
        } else {
            errorAlert(err.reason);
        }
    }

    spinner.stop();

}

async function setFarmPrice() {
    document.getElementById("farm-price").innerText = await getEthFarmPrice();
}



if (window.ethereum){
    setFarmPrice();
    document.getElementById("buy-farm").addEventListener("click", handleBuyFarm);
    setInterval(setFarmPrice, 60_000);
} else {
    window.location.replace("connection.html");
}
