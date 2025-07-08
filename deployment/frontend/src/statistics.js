import {getBuildEvents, getOwnerFarms} from "./utils.js";
import {getGrillzFarm42Contract} from "./ethClient.js";
import {getLeaderboard} from "./leaderboard-utils.js";

export async function getTotalFarmCount() {
    const buildEvents = await getBuildEvents();

    return buildEvents.length;
}

export async function getOwnerFarmCount(owner) {

    const contract = getGrillzFarm42Contract();

    return await contract.ownerFarmCount(owner);
}

export async function getBuildDate(e) {
    const block = await e.getBlock();
    return block.timestamp;
}

export function getFarmProduction(timestamp) {
    const now = Date.now() / 1000;
    return Math.round((now - parseInt(timestamp)) / 10);
}

export async function getFarmerProduction(owner) {
    let cricketProduction = 0;

    const ownedFarms = await getOwnerFarms(owner);

    ownedFarms.forEach((farm) => cricketProduction += getFarmProduction(farm.buildTime));

    return cricketProduction;
}

export async function getTotalProduction() {
    let totalCricketProduction = 0;

    const events = await getBuildEvents();

    for (let i = 0; i < events.length; i++){
        const farm = events[i].args.toObject();
        totalCricketProduction += getFarmProduction(farm.buildTime);
    }

    return totalCricketProduction;
}

export async function getFarmerRank(address){
    const leaderboard = await getLeaderboard();

    for (let i = 0; i < leaderboard.length; i++){
        if (leaderboard[i].address === address){
            return i + 1;
        }
    }
    return "?";
}
