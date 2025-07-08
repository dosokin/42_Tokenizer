import {getGrillzFarm42Contract} from "./ethClient.js";
import {getFarmProduction} from "./statistics.js";


async function getFarmersData() {
    const contract = getGrillzFarm42Contract();

    const farmsIds = await contract.getFarmsIds();

    const farmers = new Map();

    for (let i = 0; i < farmsIds.length; i++){
        const farm = (await contract.farms(farmsIds[i])).toObject();

        if (!farmers.has(farm.owner)) {
            farmers.set(farm.owner, {address: farm.owner, score: 0, farmCount: 0, cricketCount: 0});
        }

        const farmer = farmers.get(farm.owner);

        const farmProduction = getFarmProduction(farm.buildTime);

        farmer.farmCount += 1;
        farmer.cricketCount += farmProduction
        farmer.score += 1000 + farmProduction;
    }

    return farmers;
}

export async function getLeaderboard() {

    const farmers = await getFarmersData();

    const leaderboard = [];
    let bestScore = 0;
    let bestScorerAddress = "0x";
    const farmersCount = farmers.size;

    for (let i = 0; i < farmersCount; i++){
        farmers.forEach((value, key, map) => {
            if (value.score > bestScore){
                bestScore = value.score;
                bestScorerAddress = key;
            }
        })
        leaderboard.push(farmers.get(bestScorerAddress));
        farmers.delete(bestScorerAddress);
        bestScore = 0;
        bestScorerAddress = "0x";
    }

    return leaderboard;
}