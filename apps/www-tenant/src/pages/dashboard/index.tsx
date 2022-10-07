import { WWWContainer as Container } from "ui";

import RentSummary from "../../components/RentSummary";
// import RentTable from "../../components/RentTable";

export default function Dashboard() {
  return (
    <Container w="100vw">
      <RentSummary />
      {/* <RentTable /> */}
    </Container>
  );
}
