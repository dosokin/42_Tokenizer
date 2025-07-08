import {getLeaderboard} from "./leaderboard-utils.js";


async function displayLeaderboard() {
    const table = document.getElementById("leaderboard");

    const leaderboard = await getLeaderboard();

    leaderboard.forEach((farmer, i) => {
        table.innerHTML += [
            "<tr class=\"text-center\">",
            `<td class=\"py-3\">${i + 1}</td>`,
            `<td>${farmer.address}</td>`,
            `<td>${farmer.score}</td>`,
            `<td>${farmer.farmCount}</td>`,
            `<td>${farmer.cricketCount}</td>`,
            "</tr>"
        ].join("");
    });
}

if (window.ethereum){
    displayLeaderboard();
}
