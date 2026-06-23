import { useResource } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';
import { SchemaForm } from '../components/SchemaForm';
import { schemas } from '../fields';

export function ResourceCreate() {
  const { resource } = useResource();
  const { formProps, saveButtonProps } = useForm();
  const fields = resource ? schemas[resource.name] : undefined;

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="ID (unique slug, can't be changed later)"
          name="id"
          rules={[{ required: true, message: 'An ID is required' }]}
        >
          <Input />
        </Form.Item>
        {fields && <SchemaForm fields={fields} />}
      </Form>
    </Create>
  );
}
