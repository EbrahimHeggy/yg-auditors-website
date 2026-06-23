import type { ReactNode } from 'react';
import { Button, Form, Input, InputNumber, Switch, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FieldDef } from '../fields';

type Path = (string | number)[];

function renderField(field: FieldDef, parentPath: Path): ReactNode {
  const path = [...parentPath, field.name];

  switch (field.widget) {
    case 'text':
      return (
        <Form.Item key={field.name} label={field.label} name={path}>
          <Input.TextArea rows={3} />
        </Form.Item>
      );

    case 'number':
      return (
        <Form.Item key={field.name} label={field.label} name={path}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      );

    case 'boolean':
      return (
        <Form.Item key={field.name} label={field.label} name={path} valuePropName="checked">
          <Switch />
        </Form.Item>
      );

    case 'image':
      return (
        <Form.Item key={field.name} label={field.label} name={path} extra="Path under /public or a full image URL">
          <Input />
        </Form.Item>
      );

    case 'object':
      return (
        <div
          key={field.name}
          style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: 16, marginBottom: 16 }}
        >
          <div style={{ fontWeight: 600, marginBottom: 12 }}>{field.label}</div>
          {field.fields?.map((sub) => renderField(sub, path))}
        </div>
      );

    case 'list':
      return (
        <Form.Item key={field.name} label={field.label}>
          <Form.List name={path}>
            {(items, { add, remove }) => (
              <>
                {items.map((item) => (
                  <Space
                    key={item.key}
                    style={{ display: 'flex', marginBottom: 8, alignItems: 'start' }}
                  >
                    <div style={{ flex: 1 }}>
                      {field.fields ? (
                        field.fields.map((sub) => renderField(sub, [item.name]))
                      ) : (
                        <Form.Item name={[item.name]} style={{ marginBottom: 0 }}>
                          <Input />
                        </Form.Item>
                      )}
                    </div>
                    <Button icon={<DeleteOutlined />} onClick={() => remove(item.name)} />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add(field.fields ? {} : '')}
                  block
                  icon={<PlusOutlined />}
                >
                  Add {field.label}
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
      );

    case 'string':
    default:
      return (
        <Form.Item key={field.name} label={field.label} name={path}>
          <Input />
        </Form.Item>
      );
  }
}

export function SchemaForm({ fields }: { fields: FieldDef[] }) {
  return <>{fields.map((field) => renderField(field, []))}</>;
}
