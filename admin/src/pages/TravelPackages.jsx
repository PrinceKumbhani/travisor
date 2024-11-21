import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../components/loading/Loading";
import TravelPackagesTable from "../components/table/TravelPackagesTable";
import { getAgencyProfileAPI } from "../service/agency-api";
import { getAllTravelPackagesAPI } from "../service/package-api";

const Container = styled.div``;
const TableContainer = styled.div`
  width: 80%;
  margin: auto;
`;
const TravelPackages = () => {
  const [travelPackages, setTravelPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllPackages();
  }, []);
  const getAllPackages = async () => {
    const { _id } = await getAgencyProfileAPI(
      localStorage.getItem("admin-token")
    );
    const response = await getAllTravelPackagesAPI(_id);
    setTravelPackages(response);
    setLoading(false);
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer>
          <h1>Active Packages</h1>
          <TravelPackagesTable travelPackages={travelPackages} />
        </TableContainer>
      )}
    </Container>
  );
};

export default TravelPackages;
