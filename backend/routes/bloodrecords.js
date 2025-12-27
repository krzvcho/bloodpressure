const express = require('express');

const { getAll, get, add, replace, remove } = require('../data/bloodrecord');
const { checkAuth } = require('../util/auth');
const {
  isValidDate,
  isValidNumber,
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const records = await getAll();
    res.json({ records });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const record = await get(req.params.id);
    res.json({ record });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }
  if (!isValidNumber(data.systolic)) {
    errors.systolic = 'Invalid systolic value.';
  }
  if (!isValidNumber(data.diastolic)) {
    errors.diastolic = 'Invalid diastolic value.';
  }
  if (!isValidNumber(data.pulse)) {
    errors.pulse = 'Invalid pulse value.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the blood record failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: 'Blood record saved.', record: data });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }
  if (!isValidNumber(data.systolic)) {
    errors.systolic = 'Invalid systolic value.';
  }
  if (!isValidNumber(data.diastolic)) {
    errors.diastolic = 'Invalid diastolic value.';
  }
  if (!isValidNumber(data.pulse)) {
    errors.pulse = 'Invalid pulse value.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the blood record failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'Blood record updated.', record: data });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Blood record deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
