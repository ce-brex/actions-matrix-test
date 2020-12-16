const semverCoerce = require("semver/functions/coerce");
const semverValid = require("semver/functions/valid");
const { generate } = require("build-number-generator");
const { exec } = require("child_process");

const version = semverValid(semverCoerce(process.env.npm_package_version));

const buildVersion = generate({
	version: version,
	versionSeparator: "-"
});

exec(`npm version --no-git-tag ${buildVersion}`, (error, stdout, stderr) => {
	if (error) {
		console.error(error.message);
		return;
	}

	if (stderr) {
		console.error(stderr);
		return;
	}

	console.log(stdout);
});