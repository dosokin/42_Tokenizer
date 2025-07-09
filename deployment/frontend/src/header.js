import {getGrillz42Contract, getGrillzFarm42Contract, getProvider, getSigner} from "./ethClient.js";
import {getBalance} from "./utils.js";
import {successAlert} from "./popup.js";
import {NftMintSuccess} from "./orderSuccess.js";

const userAccessContainer = document.getElementById("user-access-container")


function displayDisconnectedHeader() {

    userAccessContainer.innerHTML = "<button class=\"cursor-pointer! text-neutral-900 font-bold text-xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] flex md:flex-col rounded-xl bg-cyan-200 col-span-1 text-center justify-center p-4 items-center\" id=\"metamaskConnection\">CONNECT WITH METAMASK</button>"

    const metamaskButton = document.getElementById("metamaskConnection")
    metamaskButton.addEventListener("click", async () => {await getSigner();})
}

async function displayConnectedHeader(account){

    const balance = await getBalance(account);

    userAccessContainer.innerHTML = [
        "<a href='dashboard.html' class=\"cursor-pointer! text-neutral-900 font-bold text-xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] rounded-xl bg-cyan-200 col-span-1 text-center justify-center p-4 px-16 items-center\" id=\"dashboardAccess\">MY DASHBOARD</a>",
        "   <a class='cursor-pointer! gap-1 flex flex-row text-neutral-900 font-bold text-xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] rounded-xl bg-cyan-200 col-span-1 text-center justify-center p-4 items-center' href='marketplace.html'>",
        "       <img class='cursor-pointer! h-7 w-7' alt='shopping-cart' src='shopping-cart.png'/>",
        "   </a>",
        "<div class=\"gap-1 flex flex-row text-neutral-900 font-bold text-xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] rounded-xl bg-cyan-200 col-span-1 text-center justify-center p-4 items-center\">",
        "   <img alt='wallet' class='h-7 w-7' src='wallet.png' />",
        `    <p><span id="balance-header">${balance}</span> $GRZ</p>`,
        "</div>",
    ].join('\n');
}

async function updateHeader(){
    const provider = getProvider();

    const connectedAccounts = await provider.listAccounts();

    if (connectedAccounts.length === 0) {
        displayDisconnectedHeader();
    } else if (connectedAccounts[0] !== currentAccount) {
        currentAccount = connectedAccounts[0];
        await displayConnectedHeader(currentAccount);
        await setListeners(currentAccount);
    }
}

async function refreshBalance() {
    const balanceDashboard = document.getElementById("balance-dashboard");
    const balanceHeader = document.getElementById("balance-header");

    const balance = await getBalance();
    if (balanceHeader){
        balanceHeader.innerText = balance;
    }
    if (balanceDashboard) {
        balanceDashboard.innerText = balance;
    }
}

async function setListeners(address) {

    const grillz42contract = getGrillz42Contract();
    const grillzFarm42contract = getGrillzFarm42Contract();

    const buildFilter = grillzFarm42contract.filters.BuildFarm(address);
    const mintFilter = grillzFarm42contract.filters.Mint(address);
    const purchaseFilter = grillz42contract.filters.PurchaseProduct(address);
    const claimGrzFilter = grillz42contract.filters.ClaimGrz(address);

    grillzFarm42contract.on(mintFilter, async (e) => {
        const transaction = e.args.toObject();
        await refreshBalance();
        await NftMintSuccess(transaction.IPFSUrl);
    })

    grillzFarm42contract.on(buildFilter, async (e) => {
        await refreshBalance();
    })

    grillz42contract.on(purchaseFilter, async (e) => {
        await refreshBalance();
    })

    grillz42contract.on(claimGrzFilter, async (e) => {
        const transaction = e.args.toObject();
        await refreshBalance();
        successAlert(`You successfully redeemed ${transaction.amount} $GRZ42!`)
    })
}

let currentAccount = null;

if (window.ethereum) {

    window.ethereum.on('accountsChanged', updateHeader);
    updateHeader();

} else {
    userAccessContainer.innerHTML = "<a class=\"cursor-pointer! text-neutral-900 font-bold text-xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] flex md:flex-col rounded-xl bg-cyan-200 col-span-1 text-center justify-center p-4 px-16 items-center\" id=\"dashboardAccess\" href='https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank'>DOWNLOAD METAMASK</a>"
}
