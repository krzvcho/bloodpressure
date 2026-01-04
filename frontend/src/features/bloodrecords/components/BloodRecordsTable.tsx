import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BloodRecord } from "../api/bloodrecords-api";

interface BloodRecordTableProps {
  records: BloodRecord[];
}

const BloodRecordsTable: React.FC<BloodRecordTableProps> = ({ records }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Systolic</TableCell>
            <TableCell>Diastolic</TableCell>
            <TableCell>Pulse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!records?.length && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No records found
              </TableCell>
            </TableRow>
          )}
          {records?.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{new Date(record.timestamp).toLocaleString()}</TableCell>
              <TableCell>{record.systolic}</TableCell>
              <TableCell>{record.diastolic}</TableCell>
              <TableCell>{record.pulse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BloodRecordsTable;