import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { loginAction } from 'src/states/auth';
import './login.css';

interface Props {
  login: typeof loginAction.request;
}

class LoginPage extends React.Component<Props> {
  onFinish = (values) => {
    this.props.login(values.password);
  };

  render() {
    return (
      <div className="login-form-container">
        <Typography.Title>로그인</Typography.Title>
        <Form onFinish={this.onFinish} className="login-form">
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="비밀번호"
            />
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

const mapDispatchToProps = {
  login: loginAction.request,
};

export default connect(undefined, mapDispatchToProps)(LoginPage);
