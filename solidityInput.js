/// solidityJsonInput.js

const { gatherSources } = require("@resolver-engine/imports");
const { ImportsFsEngine } = require("@resolver-engine/imports-fs");

async function getSolidityInput(contractPath) {
    const input = await gatherSources([contractPath], process.cwd() + '/contracts', ImportsFsEngine());
    for (const obj of input) {
        obj.url = obj.url.replace(`${process.cwd()}/`, "");
    }

    const sources = {};
    for (const file of input) {
        sources[file.url] = {content: file.source};
    }

    const waffleConfig = require('./truffle-config')
    waffleConfig.compilerOptions

    const inputJSON = {
        language: "Solidity",
        // these settings must match the ones
        // you use for contract compilation
        settings: {
            ...waffleConfig.compilers.solc.settings
        },
        sources,
    };

    return JSON.stringify(inputJSON, null, 2);
}

getSolidityInput('ERC20PresetMinterPauser.sol').then(console.log);
