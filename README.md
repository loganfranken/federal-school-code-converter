# Get Federal School Code JSON

A command line utility for pulling in the list of Federal School Codes from
the [Federal Student Aid website](https://ifap.ed.gov/ifap/fedSchoolCodeList.jsp)
and converting them into JSON.

**This project is neither endorsed by nor affiliated with the Department of Education.**

## Usage

Simply enter an academic year (format "1516") on the command line to print the
results to the console:

```
node get-federal-school-code-json.js 1516
```

You can output the results to a file:

```
node get-federal-school-code-json.js 1516 > output.json
```

## License

[ISC](https://opensource.org/licenses/ISC)
