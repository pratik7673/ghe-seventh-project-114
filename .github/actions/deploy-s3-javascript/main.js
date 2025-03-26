const core= require('@actions/core');
const github= require('@actions/github');
const exec=require('@actions/exec');

function run() {
    // get input values
    core.notice('Hello from my custome js actions!');
    const bucket = core.getInput('bucket',{required:true});
    const region = core.getInput('region',{required:true});
    const distfolder = core.getInput('dist-folder',{required:true});

    // upload file
    const s3Uri = `s3://${bucket}`;
    exec.exec('aws s3 sync ${distfolder} ${s3Uri} --region ${region}');
}

run();