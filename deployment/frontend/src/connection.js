import {connectMetamask} from "./metamask.js";

const mainContent = document.getElementById("main-content");


async function handleAccountsChanged() {

    const accounts = await window.ethereum.request({method: "eth_accounts"});

    if (accounts.length === 0){

        mainContent.innerHTML = "<button class=\"cursor-pointer! text-neutral-900 font-bold text-3xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] flex md:flex-col rounded-xl bg-cyan-200 col-span-1 text-center justify-center p-4 items-center\" id=\"metamaskConnection\">CONNECT WITH METAMASK</button>"

        const metamaskButton = document.getElementById("metamaskConnection")
        metamaskButton.addEventListener("click", connectMetamask)
    } else {
        window.location.replace('dashboard.html');
    }
}


if (window.ethereum) {

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // get accounts with authorization
    handleAccountsChanged();

} else { // prompt to install wallet extension with a link to the metamask extension in chrome web store
    document.getElementById("user-access-container").innerHTML = ""
    mainContent.innerHTML = "<a class=\"cursor-pointer! text-neutral-900 font-bold text-3xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] flex md:flex-col rounded-xl bg-cyan-200 col-span-1 text-center justify-center p-4 px-16 items-center\" id=\"dashboardAccess\" href='https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank'>DOWNLOAD METAMASK</a>"
}
