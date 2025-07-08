export function parseCords(standardCord){
    let contractCord;

    contractCord = Math.round(standardCord * Math.pow(10, 2));

    contractCord *= 10;

    if (contractCord < 0) {
        contractCord = contractCord * -1 + 1;
    }

    return contractCord;
}

export function formatCords(contractCord) {

    let standardCord;

    standardCord = parseFloat(contractCord) / 10;

    if (parseInt(contractCord) % 2) {
        standardCord *= -1;
    }

    standardCord = standardCord / Math.pow(10, 2);

    return standardCord;
}
