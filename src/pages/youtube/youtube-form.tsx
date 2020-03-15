import React, { useCallback } from 'react';
import { Input, Button, Form, Select } from 'antd';

interface Props {
  onSubmit: (url: string, tags: string[]) => void;
}

const YoutubeForm: React.FC<Props> = (props) => {
  const { onSubmit } = props;

  // functions
  const onFinish = useCallback((values) => {
    onSubmit(values.url, values.tags);
  }, [onSubmit]);

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Youtube URL"
        name="url"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tags"
      >
        <Select mode="tags" tokenSeparators={[',']} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  );
};

export default YoutubeForm;
