import { useResource } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { Form } from 'antd';
import { SchemaForm } from '../components/SchemaForm';
import { schemas } from '../fields';

export function ResourceEdit() {
  const { resource } = useResource();
  const { formProps, saveButtonProps, formLoading } = useForm();
  const fields = resource ? schemas[resource.name] : undefined;

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        {fields && <SchemaForm fields={fields} />}
      </Form>
    </Edit>
  );
}
