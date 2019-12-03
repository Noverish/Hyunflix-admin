import React, { useCallback } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Input, Button, Form, Select } from 'antd';

interface Props extends FormComponentProps {
  onSubmit: (url: string, tags: string[]) => void;
}

const YoutubeForm: React.FC<Props> = (props) => {
  const { form, onSubmit } = props;
  const { getFieldDecorator } = form;

  // functions
  const onSubmit2 = useCallback(() => {
    const url: string = form.getFieldValue('url');
    const tags: string[] = form.getFieldValue('tags');
    onSubmit(url, tags);
  }, [form, onSubmit]);

  // components
  const urlField = getFieldDecorator('url')(
    <Input />,
  );

  const tagField = getFieldDecorator('tags')(
    <Select mode="tags" tokenSeparators={[',']} />,
  );

  return (
    <Form>
      <Form.Item label="Youtube URL">
        {urlField}
      </Form.Item>
      <Form.Item label="Tags">
        {tagField}
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={onSubmit2}>Add</Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>()(YoutubeForm);
