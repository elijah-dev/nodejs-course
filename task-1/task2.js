const fs = require("fs/promises");
const csvtojson = require("csvtojson");

const run = async () => {
  try {
    console.log("Reading csv...");
    const buffer = await fs.readFile("./csv/example.csv");

    console.log("Converting to JSON...");
    const json = await csvtojson().fromString(buffer.toString());

    console.log("Writing to file...");
    await fs.mkdir("./output", { recursive: true });
    await fs.writeFile("./output/example.json", JSON.stringify(json), {
      encoding: "utf-8",
    });

    console.log("File written");
  } catch (error) {
    console.error(error);
  }
};

run();
