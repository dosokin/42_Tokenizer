import {getSigner} from "./ethClient.js";
import {errorAlert, successAlert} from "./popup.js";

export async function connectMetamask() {

    if (window.ethereum) {

        try {
            await getSigner();
        } catch (err) {
            errorAlert("Connection failed, please try again!");
        }

    } else {
        errorAlert("PLEASE ACTIVATE METAMASK EXTENSION");
    }
}


export const disconnectMetamask = async () => {

    await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [
            {
                eth_accounts: {}
            }
        ]
    });

    window.location.replace('index.html');

    successAlert("Successfully disconnected!")
}

