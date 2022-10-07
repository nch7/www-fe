import { WWWContainer as Container } from "ui";

import PropertySummary from "../../components/PropertySummary";
import PropertyTable from "../../components/PropertyTable";

export default function Dashboard() {
  return (
    <Container w="100vw">
      <PropertySummary />
      <PropertyTable />
    </Container>
  );
}
