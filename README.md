# add remove label
add or remove label.

## Inputs
### token
github token.

### label
label for edit.

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
        uses: buildsville/add-remove-label@v1
        with:
          token: ${{secrets.GITHUB_TOKEN}}
          label: WFR
          type: remove
```
