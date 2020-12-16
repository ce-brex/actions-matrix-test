const semverCoerce = require("semver/functions/coerce");
const semverValid = require("semver/functions/valid");
const { generate } = require("build-number-generator");
const core = require('@actions/core');

const version = semverValid(semverCoerce(process.env.npm_package_version));

const buildVersion = generate({
    version: version,
    versionSeparator: "-"
});

try {
    core.setOutput('version', buildVersion);
    console.log(`Build Version: ${buildVersion}`);
} catch (error) {
    core.setFailed(error.message);
}