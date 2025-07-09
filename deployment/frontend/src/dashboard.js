import {disconnectMetamask} from "./metamask.js";
import {getBalance,  getCurrentAddress} from "./utils.js";
import { getProvider, getSigner} from "./ethClient.js";
import {claimGrz} from "./claimGrz.js";
import {getFarmerProduction, getFarmerRank, getOwnerFarmCount, getTotalProduction} from "./statistics.js";

let currentAccount = null;


export const updateStats = async () => {

    const account = await getSigner();

    const balance = await getBalance(account);

    document.getElementById("balance-dashboard").innerText = balance;
    document.getElementById("balance-header").innerText = balance;
    document.getElementById("connected-address").innerText = await account.getAddress();
}


const handleAccountsChanged = async () => {

    const connectedAccounts = await getProvider().listAccounts();

    if (connectedAccounts.length === 0){
        window.location.replace('connection.html');
    } else if (currentAccount !== connectedAccounts[0]) {
        currentAccount = connectedAccounts[0];
        await updateStats(currentAccount);
    }
}

async function getStats() {

    const currentAddress = await getCurrentAddress();

    const farmCount = await getOwnerFarmCount(currentAddress);
    const cricketCount = await getFarmerProduction(currentAddress);

    document.getElementById("farms-count").innerText = String(farmCount);
    document.getElementById("crickets-count").innerText = String(cricketCount);
    document.getElementById("meals-count").innerText = String(Math.round(cricketCount / 77));
    document.getElementById("farmer-rank").innerText = await getFarmerRank(currentAddress);
}


if (window.ethereum) {

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // get accounts with authorization
    handleAccountsChanged();

    document.getElementById("disconnect").addEventListener("click", disconnectMetamask);
    document.getElementById("airdrop").addEventListener("click", claimGrz);

    getStats();
} else { // prompt to install wallet extension with a link to the metamask extension in chrome web store
    window.location.replace('connection.html');
}