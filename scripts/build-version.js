const hrTime = process.hrtime();

console.log(hrTime[0] * 1000000 + hrTime[1] / 1000)
