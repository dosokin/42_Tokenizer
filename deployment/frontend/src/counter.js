import {CountUp} from "countup.js";
import {getGrillzFarm42Contract} from "./ethClient.js";
import {getTotalProduction, getTotalFarmCount} from "./statistics.js";

async function launchCounter(target, count) {
    const options = {
        startVal: 0,
        duration: 1.5,
    };

    let demo = new CountUp(target, count, options);
    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }
    return demo;
}

async function launchCounters() {

    const farmCount = await getTotalFarmCount();
    const cricketCount = await getTotalProduction();

    Promise.all([
        launchCounter("global-farm-count", farmCount),
        launchCounter("global-crickets-count", cricketCount),
        launchCounter("global-meals-count", cricketCount / 77)])
        .then((c) => {

            const contract = getGrillzFarm42Contract();
            const buildFilter = contract.filters.BuildFarm();

            contract.on(buildFilter, () => {
                c[0].update(c[0].endVal + 1);
            })

            if (farmCount) {
                setInterval(() => {
                    c[1].update(c[1].endVal + 1);
                }, 5_000 / farmCount);

                setInterval(() => {
                    c[2].update(c[2].endVal + 1);
                }, 5_000 / farmCount * 20);
            }

        })
}

if (window.ethereum) {
    launchCounters();
}
