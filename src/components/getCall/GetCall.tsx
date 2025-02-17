import { useCallback } from "react";
import { Formik, Form, FormikProps } from "formik";
import { PhoneIcon } from "@/assets/icon";
import showToast from "@/utils/showtoast";
import useCallAPis from "@/api/call/useCallApis";
import CustomCard from "../CustomCard";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { GetCallSchema } from "./getCall.types";
import { GetCallvalidationSchema } from "./getCall.validation";


const initialValues: GetCallSchema = {
  name: "",
  phone: "",
  task: "",
};

const GetCall = () => {
  //Apis
  const { initiateCall } = useCallAPis();
  const handleSubmit = useCallback(
    async (values: GetCallSchema, { resetForm }: { resetForm: () => void }) => {
      resetForm();

      const { success, errorMsg } = await initiateCall(values);
      if (success) {
        showToast("Call Initiated ! Check your phone", "success");
      } else {
        showToast(`Something went wrong ${errorMsg}`, "error");
      }
    },
    [initiateCall]
  );

  return (
    <CustomCard className="bg-lightpurple">
      <div className="flex gap-5 font-bold">
        <h1>Talk with our bot via phone</h1>
        <PhoneIcon />
      </div>

      <h1>Seems Interesting!</h1>
      <h1>Fill out some details to get a call immediately</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={GetCallvalidationSchema}
      >
        {({
          handleChange,
          values,
          touched,
          errors,
          handleBlur,
        }: FormikProps<GetCallSchema>) => (
          <Form className="flex flex-col gap-3">
            <CustomInput
              placeholder="Enter your name"
              name="name"
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
              isInvalid={!!(touched.name && errors.name)}
              errorMessage={errors.name}
            />

            <CustomInput
              placeholder="Enter phone number"
              name="phone"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              isInvalid={!!(touched.phone && errors.phone)}
              errorMessage={errors.phone}
            />

            <CustomTextArea
              name="task"
              value={values.task}
              placeholder="What do you want to ask about?"
              onChange={handleChange}
              isInvalid={!!(touched.task && errors.task)}
              errorMessage={errors.task}
            />

            <CustomButton
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Call Now <PhoneIcon />
            </CustomButton>
          </Form>
        )}
      </Formik>
    </CustomCard>
  );
};

export default GetCall;
