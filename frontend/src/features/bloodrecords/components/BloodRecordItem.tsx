import React from "react";
import { Card, Button, Stack } from '@mui/material';
import { BloodRecord } from '../api/bloodrecords-api';
import { Link } from 'react-router-dom';

interface BloodRecordItemProps {
  record: BloodRecord;
}

const BloodRecordItem: React.FC<BloodRecordItemProps> = ({ record }) => {
  return (
    <Card
      variant="outlined"
      sx={{ padding: 0.5, mb: 1, textAlign: 'left', width: '100%' }}
    >
      {record.systolic} / {record.diastolic} mmHg
      <br />
      Pulse: {record.pulse} bpm
      <br />
      Measured At: {new Date(record.timestamp).toLocaleString()}
      <Stack direction="row" spacing={1} mt={1}>
        <Button
          component={Link}
          to={`/bloodrecords/${record.id}`}
          size="small"
          variant="outlined"
        >
          View
        </Button>
        <Button
          component={Link}
          to={`/bloodrecords/${record.id}/edit`}
          size="small"
          variant="contained"
        >
          Edit
        </Button>
      </Stack>
    </Card>
  );
};

export default BloodRecordItem;
