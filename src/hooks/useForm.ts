import { ref, watch } from "vue";
import { Ref } from "vue-demi";
import { ValidationError } from "yup";

import { SchemaLike } from "yup/lib/types";

export default function ({
  initialValues,
  schema,
  onSubmit,
}: {
  initialValues:
    | { [key: string]: unknown }
    | (() => Ref<{ [key: string]: unknown }>);
  schema: SchemaLike;
  onSubmit: (formData: Ref) => void;
}): {
  formData: Ref;
  errorMessages: Ref;
  handleChange: (fieldKey: string, value: unknown) => void;
  handleSubmit: (ev: MouseEvent) => void;
} {
  const formData = ref(
    typeof initialValues === "function" ? initialValues() : initialValues
  );
  const errorMessages = ref(
    Object.keys(
      typeof initialValues === "function" ? initialValues() : initialValues
    ).reduce((acc, curr) => {
      return { ...acc, [curr]: "" };
    }, {})
  );

  const handleChange = function (fieldKey: string, value: unknown) {
    formData.value = { ...formData.value, [fieldKey]: value };
    try {
      schema.validateSyncAt(fieldKey, formData.value, {
        abortEarly: false,
      });

      errorMessages.value = { ...errorMessages.value, [fieldKey]: "" };
    } catch (err) {
      if (err instanceof ValidationError) {
        errorMessages.value = {
          ...errorMessages.value,
          [fieldKey]: err.message,
        };
      }
    }
  };

  if (typeof initialValues === "function") {
    watch(initialValues, (newValue) => {
      formData.value = { ...newValue };
    });
  }

  const handleSubmit = function (ev: MouseEvent) {
    ev.preventDefault();

    try {
      schema.validateSync(formData.value, { abortEarly: false });

      onSubmit(formData);
    } catch (err) {
      if (err instanceof ValidationError) {
        errorMessages.value = err.inner.reduce(
          (fieldErrors, error) => ({
            ...fieldErrors,
            [error.path as string]: error.message,
          }),
          {}
        );
      }
    }
  };

  return { formData, errorMessages, handleChange, handleSubmit };
}
