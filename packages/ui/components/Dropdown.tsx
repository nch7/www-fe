import { Select as SelectChakra, SelectProps } from "@chakra-ui/react";

export const WWWSelect = ({
    ...props
}: any) => {
    return <SelectChakra {...props}>
        {
            props.options.map((option: any, index: number) => {
                return <option key={index} value={option.value}>{option.name}</option>
            })
        }
    </SelectChakra>
}