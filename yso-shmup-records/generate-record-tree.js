const fs = require("fs");

const data = fs.readFileSync("./records.json", "utf-8");
const records = JSON.parse(data);

if (fs.existsSync("./records")) {
  fs.rmSync("./records", { force: true, recursive: true });
}
fs.mkdirSync("./records");

const typeIds = Array.from(new Set(records.map((record) => record.typeId)));
typeIds.forEach((typeId) => {
  fs.mkdirSync(`./records/${typeId}`);

  const filteredRecordsByTypeId = records.filter(
    (record) => typeId === record.typeId
  );
  fs.writeFileSync(
    `./records/${typeId}.json`,
    JSON.stringify(filteredRecordsByTypeId)
  );
});

records.forEach((record) => {
  fs.writeFileSync(
    `./records/${record.typeId}/${record.when}`,
    JSON.stringify(record)
  );
});
