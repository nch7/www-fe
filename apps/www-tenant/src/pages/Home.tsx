import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  WWWHeading,
  WWWButton,
  WWWInput as Input,
  InputGroup,
  InputRightElement,
  Text,
  Image,
} from "ui";
import { FiLock } from "react-icons/fi";
import useProperty from "../hooks/useProperty";
import { useAtomValue } from "jotai";

import { propertyAtom } from "../atoms/propertyID.atom";

export default function Home() {
  const savedProperty = useAtomValue(propertyAtom);
  const [propertyID, setPropertyID] = useState<string>("");
  const [searchablePropertyID, setSearchablePropertyID] = useState<
    string | undefined
  >(undefined);

  const { data, isFetching } = useProperty(
    // "0f0f9130-d8a7-4690-bdc5-515bd6de8179"
    searchablePropertyID
  );

  useEffect(() => console.log({ data }), [data]);

  return (
    <Flex wrap="wrap" align="center" p={6}>
      <Box w={{ base: "100%", lg: "35%" }} p={6}>
        <WWWHeading as="h1">Landing Token</WWWHeading>
        <Text mt={3} color="primary.500">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </Text>

        {!savedProperty && (
          <>
            <InputGroup mt={6}>
              <Input
                id="property"
                name="property"
                placeholder="Enter Property ID"
                value={propertyID}
                onChange={(e) => setPropertyID(e.target.value)}
              />
              <InputRightElement children={<FiLock />} pointerEvents="none" />
            </InputGroup>

            <WWWButton
              w="full"
              colorScheme="primary"
              mt={6}
              onClick={() => setSearchablePropertyID(propertyID)}
              isLoading={isFetching}
            >
              Login
            </WWWButton>
          </>
        )}
      </Box>

      <Box w={{ base: "100%", lg: "65%" }} p={6}>
        <Image src="/bg-art.svg" w="100%" height="auto" />
      </Box>
    </Flex>
  );
}
