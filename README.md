# add remove label
Add or remove label.
Pull requests and Issues are supported.
## Inputs
### token
Github token.

### labels
Labels for edit.  
If you want to specify multiple labels,  
please set a comma-separated string

### label (deprecated)
Label for edit.  
This property is for compatibility with v1

### type
`add` or `remove`

## Example usage
```
name: remove label
on:
  pull_request_review:
    types:
      - submitted
jobs:
  remove_label:
    runs-on: ubuntu-latest
    name: remove label
    steps:
      - name: removelabel
        uses: buildsville/add-remove-label@v2.0.1
        with:
          token: ${{secrets.GITHUB_TOKEN}}
          labels: WFR, ASAP
          type: remove
```
