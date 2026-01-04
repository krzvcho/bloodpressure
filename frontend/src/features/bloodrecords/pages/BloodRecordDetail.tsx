import React from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { UserProfileData } from "../../../types/user";
import { useQuery } from "@tanstack/react-query";
import { BloodRecord, getBloodRecordById } from "../api/bloodrecords-api";

const BloodRecordDetail: React.FC = () => {
  const userData = useRouteLoaderData("bloodrecords-root") as UserProfileData;
    const { recordId } = useParams();
  
    if (!recordId) {
      return <div>Invalid record ID</div>;
    }
    /* Example use of React Query to fetch blood records */
    const { data, isLoading, error } = useQuery<BloodRecord, Error>({
      queryKey: ["bloodrecords", userData.userId, recordId],
      queryFn: () => getBloodRecordById(recordId, userData.token, userData.userId),
    });
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error loading blood record: {error.message}</div>;
    }
    return (<div>
      <h2>Blood Record Detail</h2>
      <p><strong>Timestamp:</strong> {data?.timestamp}</p>
      <p><strong>Systolic:</strong> {data?.systolic}</p>
      <p><strong>Diastolic:</strong> {data?.diastolic}</p>
      <p><strong>Pulse:</strong> {data?.pulse}</p>
      <p><strong>Notes:</strong> {data?.notes}</p>
      <p><strong>Measurement Location:</strong> {data?.measurementLocation}</p>
    </div>
  );
};

export default BloodRecordDetail;
