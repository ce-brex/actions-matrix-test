const semverCoerce = require("semver/functions/coerce");
const semverValid = require("semver/functions/valid");
const { generate } = require("build-number-generator");
const core = require("@actions/core");
const fs = require("fs");
const { join } = require("path");

try {
    const path = core.getInput("path");
    const packageJson = fs.readFileSync(join(path, 'package.json')).toString();
    const packageVersion = JSON.parse(packageJson).version;

    const version = semverValid(semverCoerce(packageVersion));

    const buildVersion = generate({
        version: version,
        versionSeparator: "-"
    });

    console.log(`Package Version: ${packageVersion}`);
    console.log(`Build Version: ${buildVersion}`);

    core.setOutput('version', buildVersion);
} catch (error) {
    core.setFailed(error.message);
}