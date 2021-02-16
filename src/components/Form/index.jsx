import React from 'react';
import { useForm } from 'react-hook-form';
import FORMFIELDS from '../../config/formConfig';

function Form({ template, onSubmit }) {
  const { register, handleSubmit } = useForm();

  function renderFields() {
    const { fields } = template;

    if (fields && Array.isArray(fields) && fields.length > 0) {
      return fields.map((field) => {
        const { type, name, id, additionalProps } = field;

        switch (type) {
          case FORMFIELDS.TEXT:
            return (
              <TextInput
                id={id}
                name={name}
                register={register}
                additionalProps={additionalProps}
              />
            );
          case FORMFIELDS.NUMBER:
            return (
              <NumberInput
                id={id}
                name={name}
                register={register}
                additionalProps={additionalProps}
              />
            );
          default:
            return <div>Invalid Element</div>;
        }
      });
    }
    return <div>Invalid Template</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderFields()}
      <button type="submit">Save</button>
    </form>
  );
}

function TextInput({ id, name, register, additionalProps }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{name}</label>
      <input
        type={FORMFIELDS.TEXT}
        name={id}
        id={id}
        ref={register}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...additionalProps}
      />
    </div>
  );
}

function NumberInput({ id, name, register, additionalProps }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{name}</label>
      <input
        type={FORMFIELDS.NUMBER}
        name={id}
        id={id}
        ref={register({
          valueAsNumber: true,
        })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...additionalProps}
      />
    </div>
  );
}

export default Form;
