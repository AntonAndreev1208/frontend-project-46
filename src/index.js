import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const parseData = (data) => JSON.parse(data);

const buildDiff = (obj1, obj2) => {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)].sort());
  const diff = Array.from(keys).map((key) => {
    if (!obj1.hasOwnProperty(key)) {
      return `+ ${key}: ${JSON.stringify(obj2[key])}`;
    }
    if (!obj2.hasOwnProperty(key)) {
      return `- ${key}: ${JSON.stringify(obj1[key])}`;
    }
    if (obj1[key] === obj2[key]) {
      return `  ${key}: ${JSON.stringify(obj1[key])}`;
    }
    return [
      `- ${key}: ${JSON.stringify(obj1[key])}`,
      `+ ${key}: ${JSON.stringify(obj2[key])}`,
    ];
  });
  return diff.flat().join('\n');
};

const genDiff = (filepath1, filepath2) => {
  const file1Data = readFile(filepath1);
  const file2Data = readFile(filepath2);
  const obj1 = parseData(file1Data);
  const obj2 = parseData(file2Data);
  return buildDiff(obj1, obj2);
};

export default genDiff;