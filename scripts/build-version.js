const semverCoerce = require("semver/functions/coerce");
const semverValid = require("semver/functions/valid");
const { generate } = require("build-number-generator");
const { exec } = require("child_process");

const version = process.argv.slice(2)[0] || process.env.npm_package_version || 0;

const buildVersion = generate({
	version: semverValid(semverCoerce(version)),
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