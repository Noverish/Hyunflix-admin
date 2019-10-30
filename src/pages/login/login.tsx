import React from 'react';
import { Form, Icon, Input, Button, Typography, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import './login.css';

const { Title } = Typography;

interface Props extends FormComponentProps {

}

class LoginPage extends React.Component<Props> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err);
        return;
      }

      const password = values['password'];

      console.log(password);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const passwordField = getFieldDecorator('password', {
      rules: [{ required: true, message: '비밀번호를 입력해주세요!' }],
    })(
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="비밀번호"
      />,
    );

    return (
      <div className="login-form-container">
        <Title>로그인</Title>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {passwordField}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginPage);
