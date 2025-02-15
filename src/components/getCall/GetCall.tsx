import { Formik, Form, FormikProps } from "formik";
import { PhoneIcon } from "@/assets/icon";
import CustomCard from "../CustomCard";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import showToast from "@/utils/showtoast";
import AxiosService from "@/services/AxiosService";
import { GetCallSchema } from "./getCall.types";

const initialValues: GetCallSchema = {
  name: "",
  phone: "",
  task: "",
};

const GetCall = () => {
  const handleSubmit = async (
    values: GetCallSchema,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("values", values);
    resetForm();

  //TODO need to shift this into api folder 
    try {
      const response = await AxiosService.post("/make-call", values);
      console.log(response);
       showToast("Call Initiated ! Check your phone" , 'success');
    } catch (error) {
      console.error(error);
       showToast("Something went wrong" , 'error');
    }
  };

  return (
    <CustomCard className="bg-lightpurple">
      <div className="flex gap-5 font-bold">
        <h1>Talk with our bot via phone</h1>
         <PhoneIcon /> 
      </div>

      <h1>Seems Interesting!</h1>
      <h1>Fill out some details to get a call immediately</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
              onChange={handleChange}
            />

            <CustomTextArea
              name="task"
              value={values.task}
              placeholder="What do you want to ask about?"
              onChange={handleChange}
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
