import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  BoxProps,
} from "@chakra-ui/react";

export const WWWTableContainer = (props: BoxProps) => (
  <TableContainer bgColor="primary.50" {...props} />
);
export const WWWTable = (props: BoxProps & { size?: "sm" | "md" | "lg" }) => (
  <Table colorScheme="primary" variant="simple" {...props} />
);
export const WWWThead = (props: BoxProps) => <Thead {...props} />;
export const WWWTfoot = (props: BoxProps) => <Tfoot {...props} />;
export const WWWTbody = (props: BoxProps) => <Tbody {...props} />;
export const WWWTr = (props: BoxProps) => <Tr {...props} />;
export const WWWTh = (props: BoxProps & { isNumeric?: boolean }) => (
  <Th
    bgColor="primary.500"
    color="primary.50"
    fontWeight={800}
    border="3px solid var(--chakra-colors-white)"
    {...props}
  />
);
export const WWWTd = (props: BoxProps & { isNumeric?: boolean }) => (
  <Td
    border="3px solid var(--chakra-colors-white)"
    color="primary.900"
    {...props}
  />
);
export const WWWTableCaption = (props: BoxProps) => (
  <TableCaption fontWeight={600} {...props} />
);
