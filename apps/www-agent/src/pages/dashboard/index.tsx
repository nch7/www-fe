import { WWWContainer as Container } from "ui";

import PropertySummary from "../../components/PropertySummary";
import PropertyTable from "../../components/PropertyTable";
import useProperties from "../../hooks/useProperties";

export default function Dashboard() {
  const { data: properties, isFetching } = useProperties();
  return (
    <Container w="100vw">
      <PropertySummary {...{ properties, isFetching }} />
      <PropertyTable {...{ properties, isFetching }} />
    </Container>
  );
}
