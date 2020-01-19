import * as core from '@actions/core'
import * as github from '@actions/github'

const token:string = core.getInput("token")
const type:string = core.getInput("type")
const label:string = core.getInput("label")

function editLabel(){
    let client = new github.GitHub(token)
    let context = github.context
    let pr = context.payload.pull_request
    if (!pr) {
        return
    }
    if ( type == "add" ){
        client.issues.addLabels({
            ...context.repo,
            issue_number: pr.number,
            labels: [label]
        }).catch(
            e => {
                console.log(e.message)
            }
        )
    }
    if ( type == "remove" ){
        client.issues.removeLabel({
            ...context.repo,
            issue_number: pr.number,
            name: label
        }).catch(
            e => {
                console.log(e.message)
            }
        )
    }
}
editLabel()
