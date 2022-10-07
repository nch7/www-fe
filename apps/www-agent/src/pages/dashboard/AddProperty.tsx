import {
  SimpleGrid,
  Flex,
  Box,
  WWWHeading,
  InputGroup,
  InputRightElement,
  WWWInput as Input,
  WWWButton,
  Image,
  FormControl,
  WWWFormErrorMessage as FormErrorMessage,
  WWWFormLabel as FormLabel,
} from "ui";
import { FiType, FiFileText, FiImage, FiUser, FiMapPin } from "react-icons/fi";
import { useFormik } from "formik";

import useAddProperty from "../../hooks/useAddProperty";
import { propertySchema, PropertyFormData } from "../../schema";

export default function AddProperty() {
  const { mutate, isLoading } = useAddProperty();
  const onSubmit = (data: PropertyFormData) => mutate(data);
  const formik = useFormik<PropertyFormData>({
    onSubmit,
    initialValues: {
      name: "",
      location: "",
      boughtFrom: "",
      image: "",
      legalDoc: "",
    },
    validationSchema: propertySchema,
  });

  return (
    <Flex wrap="wrap" align="center" p={{ base: 4, md: 6 }}>
      <Box w={{ base: "100%", lg: "35%" }} p={{ base: 0, md: 6 }}>
        <form onSubmit={formik.handleSubmit}>
          <WWWHeading as="h2" hasUnderline>
            Add Property
          </WWWHeading>

          <SimpleGrid columns={2} spacing={2} mt={6}>
            <FormControl isInvalid={!!formik.errors.name}>
              <FormLabel>Property Name</FormLabel>
              <InputGroup>
                <Input
                  id="name"
                  name="name"
                  placeholder="Property Name"
                  isInvalid={!!formik.errors.name}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <InputRightElement children={<FiType />} pointerEvents="none" />
              </InputGroup>
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.boughtFrom}>
              <FormLabel>Bought From</FormLabel>
              <InputGroup>
                <Input
                  id="boughtFrom"
                  name="boughtFrom"
                  placeholder="Bought From"
                  isInvalid={!!formik.errors.boughtFrom}
                  onChange={formik.handleChange}
                  value={formik.values.boughtFrom}
                />
                <InputRightElement children={<FiUser />} pointerEvents="none" />
              </InputGroup>
              <FormErrorMessage>{formik.errors.boughtFrom}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <FormControl isInvalid={!!formik.errors.location}>
            <FormLabel>Location</FormLabel>
            <InputGroup>
              <Input
                id="location"
                name="location"
                placeholder="Location"
                isInvalid={!!formik.errors.location}
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              <InputRightElement children={<FiMapPin />} pointerEvents="none" />
            </InputGroup>
            <FormErrorMessage>{formik.errors.location}</FormErrorMessage>
          </FormControl>

          <FormControl my={2} isInvalid={!!formik.errors.image}>
            <FormLabel>Upload Image:</FormLabel>
            <InputGroup>
              <Input
                id="image"
                name="image"
                placeholder="Upload Image"
                type="file"
                isInvalid={!!formik.errors.image}
                onChange={(e) =>
                  formik.setFieldValue(
                    "image",
                    e.target.files ? e.target.files[0] : ""
                  )
                }
                sx={{
                  "&::-webkit-file-upload-button, &::file-selector-button": {
                    borderColor: "transparent",
                    borderWidth: 1,
                    bgColor: "primary.100",
                    color: "primary.700",
                    rounded: "sm",
                    mt: 1,
                  },
                  _hover: {
                    "&::-webkit-file-upload-button, &::file-selector-button": {
                      borderColor: "primary.700",
                    },
                  },
                }}
              />
              <InputRightElement children={<FiImage />} pointerEvents="none" />
            </InputGroup>
            <FormErrorMessage>{formik.errors.image as string}</FormErrorMessage>
          </FormControl>

          <FormControl my={2} isInvalid={!!formik.errors.legalDoc}>
            <FormLabel>Upload Legal Document:</FormLabel>
            <InputGroup>
              <Input
                id="legalDoc"
                name="legalDoc"
                placeholder="Upload Legal"
                type="file"
                onChange={(e) =>
                  formik.setFieldValue(
                    "legalDoc",
                    e.target.files ? e.target.files[0] : ""
                  )
                }
                isInvalid={!!formik.errors.legalDoc}
                sx={{
                  "&::-webkit-file-upload-button, &::file-selector-button": {
                    borderColor: "transparent",
                    borderWidth: 1,
                    bgColor: "primary.100",
                    color: "primary.700",
                    rounded: "sm",
                    mt: 1,
                  },
                  _hover: {
                    "&::-webkit-file-upload-button, &::file-selector-button": {
                      borderColor: "primary.700",
                    },
                  },
                }}
              />
              <InputRightElement
                children={<FiFileText />}
                pointerEvents="none"
              />
            </InputGroup>
            <FormErrorMessage>
              {formik.errors.legalDoc as string}
            </FormErrorMessage>
          </FormControl>

          <WWWButton
            type="submit"
            w="full"
            colorScheme="primary"
            mt={6}
            loadingText="Adding Property"
            isLoading={isLoading}
          >
            Add
          </WWWButton>
        </form>
      </Box>

      <Box w={{ base: "100%", lg: "65%" }} p={6}>
        <Image src="/bg-art.svg" w="100%" height="auto" />
      </Box>
    </Flex>
  );
}
