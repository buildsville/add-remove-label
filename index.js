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
var label = core.getInput("label");
function editLabel() {
    var client = new github.GitHub(token);
    var context = github.context;
    var pr = context.payload.pull_request;
    if (!pr) {
        return;
    }
    if (type == "add") {
        client.issues.addLabels(__assign(__assign({}, context.repo), { issue_number: pr.number, labels: [label] }))["catch"](function (e) {
            console.log(e.message);
        });
    }
    if (type == "remove") {
        client.issues.removeLabel(__assign(__assign({}, context.repo), { issue_number: pr.number, name: label }))["catch"](function (e) {
            console.log(e.message);
        });
    }
}
editLabel();
