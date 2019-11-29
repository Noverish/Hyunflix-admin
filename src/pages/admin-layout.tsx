import React from 'react';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Content, Sider } = Layout;

class AdminLayout extends React.Component<RouteComponentProps> {
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
        <Link to={i.path}>
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
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
        {itemComps}
        <Menu.ItemGroup key="g1" title="Links">
          {linkComps}
        </Menu.ItemGroup>
      </Menu>
    );
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>{this.renderMenu()}</Sider>
        <Content style={{ padding: '24px', background: 'white' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default withRouter(AdminLayout);
