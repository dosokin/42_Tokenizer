import {getCurrentAddress, getOwnerFarms} from "./utils.js";
import {getFarmProduction} from "./statistics.js";
import {grillzFarm42ContractAddress} from "./ethClient.js";

async function displayOwnedFarms() {
    const table = document.getElementById("owned-farms");
    const ownerAddress = await getCurrentAddress();

    const farms = await getOwnerFarms(ownerAddress);

    farms.forEach(async (farm) => {
        const buildTime = new Date(parseInt(farm.buildTime) * 1000);
        const formattedDate = [buildTime.getDate(), buildTime.getMonth(), buildTime.getFullYear()].join("/");
        const cricketsProduced = await getFarmProduction(farm.buildTime);

        table.innerHTML += [
            "<tr class=\"text-center\">",
            `<td class=\"py-3\">${formattedDate}</td>`,
            `<td><a target="_blank" href="https://testnets.opensea.io/assets/sepolia/${grillzFarm42ContractAddress}/${farm.tokenId}" class="p-1 cursor-pointer! text-neutral-900 font-bold text-xl inset-shadow-[0_0_12px_cyan] shadow-[0_0_20px_cyan] hover:shadow-[0_0_30px_cyan] flex md:flex-col rounded-xl bg-cyan-200 col-span-1 text-center justify-center items-center">${farm.name}</a></td>`,
            `<td>(${parseInt(farm.latitude) / 100}, ${parseInt(farm.longitude) / 100})</td>`,
            `<td>${cricketsProduced}</td>`,
            "</tr>"
        ].join("");
    })
}


if (window.ethereum){
    displayOwnedFarms();
}
