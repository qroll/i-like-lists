import { useField } from "formik";
import { ColumnContainer } from "../Layout";
import { SystemProps } from "../Theme";
import { TextLabel, TextInput, Error } from "./Blocks";

interface FormikTextFieldProps extends SystemProps {
  isRequired?: boolean;
  label: string;
  name: string;
  type?: "text" | "password" | "email";
}

export const FormikTextField = (props: FormikTextFieldProps): JSX.Element => {
  const { isRequired = false, label, name, type = "text", ...sx } = props;
  const [field, meta, helpers] = useField(name);
  const hasError = !!(meta.touched && meta.error);

  return (
    <ColumnContainer {...sx}>
      <TextLabel htmlFor={field.name}>{label}</TextLabel>
      <TextInput
        type={type}
        id={field.name}
        {...field}
        hasError={hasError}
        aria-required={isRequired}
        aria-invalid={hasError}
      />
      <Error hasError={hasError}>{meta.error || "Nil"}</Error>
    </ColumnContainer>
  );
};
