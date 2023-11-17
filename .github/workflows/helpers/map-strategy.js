const inputString = process.argv[2];

let outputString;

switch (inputString) {
  case "major":
    outputString = "major";
    break;
  case "minor":
    outputString = "feature";
    break;
  case "patch":
    outputString = "bug";
    break;
  default:
    outputString = "unknown";
}

console.log(outputString);