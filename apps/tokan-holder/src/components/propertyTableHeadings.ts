export const propertyTableHeadings: { key: string; value: string; isNumeric?: boolean }[] = [
  { key: "name", value: "Name" },
  { key: "location", value: "Location" },
  { key: "bought_from", value: "Bought From" },
  { key: "date_bought", value: "Date Bought" },
  { key: "tenant_status", value: "Tenant Status" },
  { key: "rent_status", value: "Rent Status" },
  {
    key: "rent_collected",
    value: "Rent Collected",
    isNumeric: true,
  },
];