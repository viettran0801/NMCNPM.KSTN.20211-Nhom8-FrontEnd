import { Field, ErrorMessage } from "formik";
export default function Input({ label, name }) {
  return (
    <div className="space-y-1">
      <label className="text-gray-500 text">{label}</label>
      <Field
        type="text"
        name={name}
        className="w-full p-3 focus:outline-none rounded-lg focus:shadow-sm border"
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
}
