import React from "react";
import DetailDataPageWrapper from "./styled";
import { useParams } from "react-router-dom";

const DetailDataPage = () => {
  const { id } = useParams();
  return (
    <DetailDataPageWrapper>
      <h1>Detail Page for ID: {id}</h1>
    </DetailDataPageWrapper>
  );
};

export default DetailDataPage;
