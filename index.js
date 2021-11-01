const core = require('@actions/core');
const github = require('@actions/github')
const axios = require('axios')

var checkfile = null
async function run (){
  try {    
    let github_token = core.getInput("GITHUB_TOKEN")
    let path_file = core.getInput("path_file")
    let octokit = github.getOctokit(github_token)    
    let {data} = await octokit.rest.repos.getContent({
      owner: github.context.payload.repository.owner.login,
      repo: github.context.payload.repository.name,
      path: path_file,
    })

    let path = data.download_url
    await setCheckFile(path)
    const file = getCheckFile()    
    core.setOutput("result", file)
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function setCheckFile(path){
  await axios.get(path).then((res)=>{
     checkfile = res.data      
   }).catch((error)=>{
    core.setFailed(error.message);
   })
 }

function getCheckFile(){
  return checkfile
}

run()