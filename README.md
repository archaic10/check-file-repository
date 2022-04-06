# check-file-repository
### This action performs a scan of a file within the repository

## Example
```yml
jobs:
  verify_file:
    runs-on: ubuntu-latest
    name: verify file
    steps:
      - uses: actions/checkout@v2
      - id: foo
        uses: archaic10/check-file-repository@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          path_file: 'apps.js'
      - name: Get the output foo
        run: echo "The time was ${{ steps.foo.outputs.result }}"
```
### To use this action, simply pass the github_token and the path_file and a search for the file will start, if the file is not found the action will return not found.
