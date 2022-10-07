import {
  Flex,
  Box,
  WWWHeading,
  InputGroup,
  InputRightElement,
  WWWInput as Input,
  WWWFormErrorMessage as FormErrorMessage,
  FormControl,
  WWWButton,
  Text,
  Image,
} from "ui";
import { FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import { useAtomValue } from "jotai";

import useLogin from "../hooks/useLogin";
import { authAtom } from "../atoms/auth.atom";
import { loginSchema, LoginFormData } from "../schema";

export default function Home() {
  const authState = useAtomValue(authAtom);
  const { mutate, isLoading } = useLogin();
  const onSubmit = (data: LoginFormData) => mutate(data);
  const formik = useFormik<LoginFormData>({
    onSubmit,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  return (
    <Flex wrap="wrap" align="center" p={6}>
      <Box w={{ base: "100%", lg: "35%" }} p={6}>
        <form onSubmit={formik.handleSubmit}>
          <WWWHeading as="h1">Landing Token</WWWHeading>
          <Text mt={3} color="primary.500">
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
          </Text>

          {!authState && (
            <>
              <FormControl mt={6} isInvalid={!!formik.errors.email}>
                <InputGroup>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    autoComplete="email"
                    isInvalid={!!formik.errors.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <InputRightElement
                    children={<FiMail />}
                    pointerEvents="none"
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl mt={3} isInvalid={!!formik.errors.password}>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="password"
                    isInvalid={!!formik.errors.password}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <InputRightElement
                    children={<FiLock />}
                    pointerEvents="none"
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <WWWButton
                type="submit"
                w="full"
                colorScheme="primary"
                isLoading={isLoading}
                mt={3}
              >
                Login
              </WWWButton>
            </>
          )}
        </form>
      </Box>

      <Box w={{ base: "100%", lg: "65%" }} p={6}>
        <Image src="/bg-art.svg" w="100%" height="auto" />
      </Box>
    </Flex>
  );
}
