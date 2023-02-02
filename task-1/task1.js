const prompt = "\nType something:\n";

process.stdout.write(prompt);

const GREEN_COLOR = "\x1b[32m";
const WHITE_COLOR = "\x1b[32m";

process.stdin.on("data", (buffer) => {
  const string = buffer.toString().split("");
  string.reverse();
  process.stdout.write(
    `\nReversed: ${GREEN_COLOR} " + string.join("") + " ${WHITE_COLOR} \n\n`
  );
  process.stdout.write(prompt);
});
