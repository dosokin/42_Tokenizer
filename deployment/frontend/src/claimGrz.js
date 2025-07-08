import {getSignedGrillz42Contract} from "./ethClient.js";
import {errorAlert} from "./popup.js";
import {Spinner} from "spin.js";
import {spinnerOpts} from "./utils.js";


export async function claimGrz() {
    const signedContract = await getSignedGrillz42Contract();

    let target = document.getElementById("airdrop");
    let spinner = new Spinner(spinnerOpts).spin(target);

    try {
        const tx = await signedContract.claimGrz();
        await tx.wait();

    } catch (err) {
        errorAlert(err.reason);
    }

    spinner.stop();
}