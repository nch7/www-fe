import {
  Input,
  type InputProps,
  Switch,
  type SwitchProps,
  Checkbox,
  type CheckboxProps,
  FormLabel,
  type FormLabelProps,
  FormErrorMessage,
  type FormErrorMessageProps,
  FormHelperText,
  type HelpTextProps,
} from "@chakra-ui/react";

export const WWWInput = (props: InputProps) => (
  <Input
    rounded="sm"
    variant="outline"
    borderColor="primary.500"
    _hover={{ borderColor: "primary.300" }}
    _focus={{ outlineColor: "primary.300", borderColor: "primary.700" }}
    _active={{ outlineColor: "primary.300", borderColor: "primary.700" }}
    _invalid={{ outlineColor: "danger.200", borderColor: "danger.500" }}
    borderWidth="1.5px"
    {...props}
  />
);

export const WWWSwitch = (props: SwitchProps) => (
  <Switch colorScheme="primary" {...props} />
);

export const WWWCheckbox = (props: CheckboxProps) => (
  <Checkbox colorScheme="primary" {...props} />
);

export const WWWFormLabel = (props: FormLabelProps) => (
  <FormLabel color="primary.700" fontWeight={600} {...props} />
);

export const WWWFormErrorMessage = (props: FormErrorMessageProps) => (
  <FormErrorMessage color="danger.500" {...props} />
);

export const WWWFormHelperText = (props: HelpTextProps) => (
  <FormHelperText color="primary.500" {...props} />
);
