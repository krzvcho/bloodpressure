import React from "react";
import BloodRecordForm from "../components/BloodRecordForm";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { UserProfileData } from "../../../types/user";
import { BloodRecord, fetchBloodRecords, getBloodRecordById } from "../api/bloodrecords-api";

const EditBloodRecord: React.FC = () => {
  const userData = useRouteLoaderData("bloodrecords-root") as UserProfileData;
  const { recordId } = useParams();
  
  if (!recordId) {
    return <BloodRecordForm mode="create" />;
  }
  
  /* Example use of React Query to fetch blood records */
  const { data, isLoading, error } = useQuery<BloodRecord, Error>({
    queryKey: ["bloodrecords", userData.userId, recordId],
    queryFn: () => getBloodRecordById(recordId, userData.token, userData.userId),
    enabled: !recordId,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading blood record: {error.message}</div>;
  }

  return <BloodRecordForm mode="edit" record={data} />;
};

export default EditBloodRecord;
