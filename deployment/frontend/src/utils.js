import {ethers} from 'ethers';
import {getGrillzFarm42Contract, getGrillz42Contract, getProvider} from "./ethClient.js";


export const getBalance = async (address) => {

    const contract = await getGrillz42Contract();

    if (!address) {
        address = getCurrentAddress();
    }

    const balance = await contract.balanceOf(address);
    return ethers.formatEther(balance);

}
export const getCurrentAddress = async () => {

    const provider = getProvider();

    const accounts = await provider.listAccounts();
    if (accounts.length === 0){
        return undefined;
    }

    return accounts[0].getAddress();
}

export async function getOwnerFarms(owner) {
    const ownedFarms = [];

    const contract = getGrillzFarm42Contract();
    const farmsIds = await contract.getFarmsIds();

    for (let i = 0; i < farmsIds.length; i++){
        const farm = (await contract.farms(farmsIds[i])).toObject();

        if (farm.owner === owner) {
            ownedFarms.push({...farm, tokenId: farmsIds[i]});
        }
    }

    return ownedFarms;
}

export async function getBuildEvents(owner) {

    const contract = getGrillzFarm42Contract();

    const filter = await contract.filters.BuildFarm(owner);

    return await contract.queryFilter(filter);
}

export function eventToFarm(e) {
    const farm = e.args.toObject();

    return {
        "owner": farm.owner,
        "name": farm.farmName,
        "latitude": parseInt(farm.latitude) / 100,
        "longitude": parseInt(farm.longitude) / 100,
    }
}

export let spinnerOpts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 0.2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-default', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#ffffff', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
};

