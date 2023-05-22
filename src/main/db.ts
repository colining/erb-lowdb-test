import fs from 'fs-extra';
import { JSONFileSync, LowSync } from "lowdb";

type Data = {
  installedGame: any;
};

const defaultData: Data = { installedGame: [] };

const file = 'db.json';
export function getDatabase(file: any, initData: any) {
  if (!fs.pathExistsSync(file)) {
    fs.writeJSONSync(file, initData);
  }
  console.log(JSONFileSync);
  const adapter = new JSONFileSync<any>(file);
  const db = new LowSync<any>(adapter);
  if (!db.data) {
    db.data = defaultData;
  }
  db.read();
  return db;
}
export default function setInstalledGame(installedGameInfo: any) {
  const db = getDatabase(file, defaultData);
  db.data.installedGame = installedGameInfo;
  db.write();
}
