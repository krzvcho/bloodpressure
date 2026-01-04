const express = require('express');

const { getAllForUser, get, add, replace, remove } = require('../data/bloodrecords');
const { checkAuth } = require('../util/auth');
const { isValidText, isValidDate } = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const userId = req?.query?.userId;

  if(!userId || !isValidText(userId)) {
    return res.status(422).json({
      message: 'Fetching blood pressure records failed due to validation errors.',  
      errors: { userId: 'Invalid userId.' },
    });
  }

  try {
    const records = await getAllForUser(userId);
    res.json({ bloodPressureRecords: records });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const userId = req?.query?.userId;
  if (!userId) {
    return res.status(422).json({
      message: 'Fetching blood pressure record failed due to missing userId.',
      errors: { userId: 'Invalid userId.' },
    });
  }
  try {
    const records = await getAllForUser(userId);
    const record = records.find((rec) => rec.id === req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Blood pressure record not found.' });
    }
    res.json({ bloodPressureRecord: record });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  const data = req.body;
  const userId = req?.query?.userId;
  let errors = {};
  if (!userId) {
    return res.status(401).json({
      message: "Adding blood pressure record failed due to authentication error.",
    });
  }
  if (!isValidDate(data.timestamp)) {
    errors.timestamp = 'Invalid timestamp.';
  }
  if (typeof data.systolic !== 'number' || data.systolic < 0) {
    errors.systolic = 'Invalid systolic value.';
  }
  if (typeof data.diastolic !== 'number' || data.diastolic < 0) {
    errors.diastolic = 'Invalid diastolic value.';
  }
  if (typeof data.pulse !== 'number' || data.pulse < 0) {
    errors.pulse = 'Invalid pulse value.';
  }
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the blood pressure record failed due to validation errors.",
      errors,
    });
  }
  try {
    const newRecord = await add(userId, data);
    res.status(201).json({ message: "Blood pressure record saved.", bloodPressureRecord: newRecord });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;
  const userId = req?.query?.userId;
  let errors = {};
  if (!userId) {
    return res.status(401).json({
      message: "Updating blood pressure record failed due to authentication error.",
    });
  }
  if (!isValidDate(data.timestamp)) {
    errors.timestamp = 'Invalid timestamp.';
  }
  if (typeof data.systolic !== 'number' || data.systolic < 0) {
    errors.systolic = 'Invalid systolic value.';
  }
  if (typeof data.diastolic !== 'number' || data.diastolic < 0) {
    errors.diastolic = 'Invalid diastolic value.';
  }
  if (typeof data.pulse !== 'number' || data.pulse < 0) {
    errors.pulse = 'Invalid pulse value.';
  }
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the blood pressure record failed due to validation errors.',
      errors,
    });
  }
  try {
    await replace(userId, req.params.id, data);
    res.json({ message: 'Blood pressure record updated.', bloodPressureRecord: { ...data, id: req.params.id } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Blood pressure record deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
