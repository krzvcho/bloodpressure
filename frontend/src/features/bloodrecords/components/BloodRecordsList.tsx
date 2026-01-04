import React from "react";
import { BloodRecord } from "../api/bloodrecords-api";
import BloodRecordsListItem from "./BloodRecordItem";

interface BloodRecordListProps {
  records: BloodRecord[];
}

const BloodRecordsList: React.FC<BloodRecordListProps> = ({ records }) => {
  return records?.length
    ? records.map((record: BloodRecord) => (
        <BloodRecordsListItem key={record.timestamp} record={record} />
      ))
    : 'no records found';
};

export default BloodRecordsList;
