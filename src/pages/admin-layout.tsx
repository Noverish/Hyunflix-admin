import React from 'react';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './admin-layout.css';

const { Header, Content, Footer, Sider } = Layout;

interface Props extends RouteComponentProps {

}

interface State {
  collapsed: boolean;
}

class AdminLayout extends React.Component<Props, State> {
  state = {
    collapsed: false,
  };

  renderMenu = () => {
    const path: string = this.props.location.pathname;

    const items = [
      { name: 'Encoding List', path: '/encode',   icon: 'youtube' },
      { name: 'File Explorer', path: '/explorer', icon: 'folder'  },
      { name: 'Video List',    path: '/video',    icon: 'play-circle'  },
    ];

    const selectedKeys: string[] = items.filter(i => path.startsWith(i.path)).map(i => i.path);

    const itemComps = items.map(i => (
      <Menu.Item key={i.path}>
        <Link to={i.path} onClick={this.menuClicked}>
          <Icon type={i.icon} />
          <span className="nav-text">{i.name}</span>
        </Link>
      </Menu.Item>
    ));

    const links = [
      { name: 'Home',               path: 'http://home.hyunsub.kim',      icon: 'home' },
      { name: 'Database',           path: 'http://home.hyunsub.kim:5000', icon: 'database' },
      { name: 'Torrent',            path: 'http://home.hyunsub.kim:8082', icon: 'download' },
      { name: 'File Browser',       path: 'http://home.hyunsub.kim:8090', icon: 'folder' },
      { name: 'Visual Studio Code', path: 'http://home.hyunsub.kim:8443', icon: 'build' },
    ];

    const linkComps = links.map(i => (
      <Menu.Item key={i.path}>
        <a href={i.path} target="_blank" rel="noopener noreferrer">
          <Icon type={i.icon} />
          <span className="nav-text">{i.name}</span>
        </a>
      </Menu.Item>
    ));

    return (
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onClick={this.menuClicked}>
        {itemComps}
        <Menu.ItemGroup key="g1" title="Links">
          {linkComps}
        </Menu.ItemGroup>
      </Menu>
    );
  }

  render() {
    const isMobile = false; // TODO isMobile
    const { collapsed } = this.state;

    const siderLayoutClass = (collapsed)
      ? 'sider-layout collapsed'
      : 'sider-layout expanded';

    return (
      <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
        <div className={siderLayoutClass}>
          <Sider
            className="sider"
            breakpoint={isMobile ? 'md' : undefined}
            collapsed={isMobile ? collapsed : false}
            collapsedWidth={0}
            trigger={null}
          >
            <div className="logo" />
            {this.renderMenu()}
          </Sider>
          <div className="sider-rest" onClick={this.toggle}/>
        </div>
        <Layout className="main">
          <Header style={{ background: '#eee', padding: 0 }} >
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{ display: isMobile ? 'block' : 'none' }}
            />
          </Header>
          <Content className="content">
            <div className="content-inner">
              {this.props.children}
            </div>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Content>
        </Layout>
      </Layout>
    );
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  menuClicked = (e) => {
    this.toggle();
  }
}

export default withRouter(AdminLayout);
