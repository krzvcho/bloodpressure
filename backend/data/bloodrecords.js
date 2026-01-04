const { v4: generateId } = require('uuid');
const { NotFoundError } = require('../util/errors');
const fs = require('node:fs/promises');

async function readData() {
  const data = await fs.readFile('bloodrecords.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile('bloodrecords.json', JSON.stringify(data));
}


async function getAll() {
  const storedData = await readData();
  if (!storedData.bloodPressureRecords) {
    throw new NotFoundError('Could not find any blood pressure records.');
  }
  return storedData.bloodPressureRecords;
}

// Get all blood records for a specific userId
async function getAllForUser(userId) {
  const storedData = await readData();
  if (!storedData[userId]) {
    return [];
  }
  return storedData[userId];
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.bloodPressureRecords || storedData.bloodPressureRecords.length === 0) {
    throw new NotFoundError('Could not find any blood pressure records.');
  }
  const record = storedData.bloodPressureRecords.find((rec) => rec.id === id);
  if (!record) {
    throw new NotFoundError('Could not find blood pressure record for id ' + id);
  }
  return record;
}

async function add(userId, data) {
  const storedData = await readData();
  if (!storedData[userId]) {
    storedData[userId] = [];
  }
  const newRecord = { ...data, id: generateId() };
  storedData[userId].unshift(newRecord);
  await writeData(storedData);
  return newRecord;
}

async function replace(userId, id, data) {
  const storedData = await readData();
  if (!storedData[userId] || storedData[userId].length === 0) {
    throw new NotFoundError('Could not find any blood pressure records.');
  }
  const index = storedData[userId].findIndex((rec) => rec.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find blood pressure record for id ' + id);
  }
  storedData[userId][index] = { ...data, id };
  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  if (!storedData.bloodPressureRecords || storedData.bloodPressureRecords.length === 0) {
    throw new NotFoundError('Could not find any blood pressure records.');
  }
  const index = storedData.bloodPressureRecords.findIndex((rec) => rec.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find blood pressure record for id ' + id);
  }
  storedData.bloodPressureRecords.splice(index, 1);
  await writeData(storedData);
}

module.exports = { getAll, getAllForUser, get, add, replace, remove };
