import fs from "fs";

const writeJsonToFile = (filePathWithName: string, data: any) => {
    fs.writeFileSync(filePathWithName, JSON.stringify(data, null, 4), "utf-8");
};

const readJsonFromFile = (filePathWithName: string) => {
    if (!fs.existsSync(filePathWithName)) {
        return null;
    }
    const data = fs.readFileSync(filePathWithName, "utf-8");
    return JSON.parse(data);
};

export { readJsonFromFile, writeJsonToFile };
