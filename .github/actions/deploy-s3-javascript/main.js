const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    try {
        // Get input values
        core.notice('Hello from my custom JS action!');
        const bucket = core.getInput('bucket', { required: true });
        const region = core.getInput('region', { required: true });
        const distfolder = core.getInput('dist-folder', { required: true });

        // Upload files to S3
        const s3Uri = `s3://${bucket}`;
        await exec.exec(`aws s3 sync ${distfolder} ${s3Uri} --region ${region}`);
        
        core.notice(`Files successfully uploaded to ${s3Uri}`);
        const WebsiteURL = `http://${bucket}.s3-website.${region}.amazonaws.com`;
        // http://${bucket}.s3-website.ap-south-1.amazonaws.com

        core.setOutput ('URL' , WebsiteURL) //SET OUTPUT
        
    } catch (error) {
        core.setFailed(`Action failed: ${error.message}`);
    }
}

run();
