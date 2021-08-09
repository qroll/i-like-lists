import axios from "axios";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { z } from "zod3";
import { FlexContainer } from "../components/Layout";
import { FormikTextField } from "../components/form/Input";
import { FormikSelect } from "../components/form/Select";
import { Button } from "../components/Button";

const options = [
  {
    label: "A",
    item: { id: "A" },
  },
  {
    label: "B",
    item: { id: "B" },
  },
  {
    label: "C",
    item: { id: "C" },
  },
  {
    label: "D",
    item: { id: "D" },
  },
  {
    label: "E",
    item: { id: "E" },
  },
  {
    label: "F",
    item: { id: "F" },
  },
];

const initialValues: FormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  favouritePie: null,
};

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  favouritePie: { label: string; item: any } | null;
}

const FormSchema = z
  .object({
    username: z.string().min(1, { message: "Enter your username" }),
    email: z.string().email("Enter a valid email").min(1, { message: "Enter your email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .min(1, { message: "Enter your password" }),
    confirmPassword: z.string(),
    favouritePie: z.any().refine((val) => options.includes(val), {
      message: "Select a pet",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage(): JSX.Element {
  const validateForm = (values: FormValues) => {
    const result = FormSchema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path.join(".")] = issue.message;
      });
      return errors;
    }
  };

  const postForm = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    actions.setStatus({
      error: null,
    });

    try {
      const res = await axios.post(
        "/api/register",
        { username: values.username, email: values.email, password: values.password },
        { maxRedirects: 0 }
      );
      window.location.href = res.request.responseURL;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.errorCode === "ERR_USERNAME_EXISTS") {
          actions.setErrors({
            username: "Username already exists",
          });
        } else if (err.response?.data.errorCode === "ERR_INVALID_PARAMS") {
          actions.setStatus({
            error: "Verify your entered details",
          });
        } else {
          actions.setStatus({
            error: "An error occured",
          });
        }
      } else {
        actions.setStatus({
          error: "An error occured",
        });
      }
    }
  };

  return (
    <FlexContainer>
      <Formik initialValues={initialValues} onSubmit={postForm} validate={validateForm}>
        {(props: FormikProps<FormValues>) => (
          <Form style={{ minWidth: "80vw" }}>
            {props.status?.error ? <div>{props.status.error}</div> : null}
            <FormikTextField mt="$s" label="Username" name="username" />
            <FormikTextField mt="$s" label="Email" name="email" />
            <FormikTextField mt="$s" label="Password" name="password" type="password" />
            <FormikTextField
              mt="$s"
              label="Confirm password"
              name="confirmPassword"
              type="password"
            />
            <FormikSelect
              mt="$s"
              label="Select your favourite pie flavour"
              name="favouritePie"
              items={options}
            />
            <Button mt="$m" type="submit">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </FlexContainer>
  );
}
