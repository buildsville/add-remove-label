"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var core = require("@actions/core");
var github = require("@actions/github");
var token = core.getInput("token");
var type = core.getInput("type");
var inputLabel = core.getInput("label");
var inputLabels = core.getInput("labels");
var labels;
if (inputLabels) {
    labels = inputLabels.split(",").map(function (x) { return x.trim(); }).filter(function (x) { return x; });
}
else {
    labels = [inputLabel];
}
function editLabel() {
    var client = github.getOctokit(core.getInput('token'));
    var context = github.context;
    var pr = context.payload.pull_request;
    var issue = context.payload.issue;
    var target = pr || issue;
    if (!target) {
        return;
    }
    if (type == "add") {
        client.rest.issues.addLabels(__assign(__assign({}, context.repo), { issue_number: target.number, labels: labels }))["catch"](function (e) {
            console.log(e.message);
        });
    }
    if (type == "remove") {
        for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
            var label = labels_1[_i];
            client.rest.issues.removeLabel(__assign(__assign({}, context.repo), { issue_number: target.number, name: label }))["catch"](function (e) {
                console.log(e.message);
            });
        }
    }
}
editLabel();
