const prompt = "\nType something:\n";

process.stdout.write(prompt)

process.stdin.on("data", (buffer) => {
  const string = buffer.toString().split("");
  string.reverse();
  process.stdout.write("\nReversed: \x1b[32m " + string.join("") + " \x1b[0m \n\n")
  process.stdout.write(prompt)
})
