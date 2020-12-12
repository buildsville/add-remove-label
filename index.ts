import * as core from '@actions/core'
import * as github from '@actions/github'

const token:string = core.getInput("token")
const type:string = core.getInput("type")
const inputLabel:string = core.getInput("label")
const inputLabels:string = core.getInput("labels")
let labels:string[]
if (inputLabels) {
    labels = inputLabels.split(",").map(x => x.trim()).filter(x => x)
} else {
    labels = [inputLabel]
}

function editLabel(){
    let client = new github.GitHub(token)
    let context = github.context
    let pr = context.payload.pull_request
    let issue = context.payload.issue
    let target = pr || issue
    if (!target) {
        return
    }
    if ( type == "add" ){
        client.issues.addLabels({
            ...context.repo,
            issue_number: target.number,
            labels: labels
        }).catch(
            e => {
                console.log(e.message)
            }
        )
    }
    if ( type == "remove" ){
        for (const label of labels) {
            client.issues.removeLabel({
                ...context.repo,
                issue_number: target.number,
                name: label
            }).catch(
                e => {
                    console.log(e.message)
                }
            )
        }
    }
}
editLabel()
