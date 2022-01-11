import { Field, ErrorMessage } from "formik";
export default function Input({
  label,
  name,
  type = "text",
  required = false,
  ...otherProps
}) {
  return (
    <div className="space-y-1">
      <label className="text-gray-500 text space-x-3">
        <span>{label}</span>
        {required && <span className="text-red-700">*</span>}
      </label>
      <Field
        type={type}
        name={name}
        component={type == "textarea" ? "textarea" : "input"}
        className={`w-full p-3 focus:outline-none rounded-lg focus:shadow-sm border ${
          type == "textarea" ? "h-60" : ""
        }`}
        {...otherProps}
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
}
