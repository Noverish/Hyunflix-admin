import React from 'react';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { YoutubeOutlined, FolderOutlined, PlayCircleOutlined, HomeOutlined, DatabaseOutlined, DownloadOutlined, BuildOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

class AdminLayout extends React.Component<RouteComponentProps> {
  renderMenu = () => {
    const path: string = this.props.location.pathname;

    const items = [
      { name: 'Encoding List', path: '/encode', icon: YoutubeOutlined },
      { name: 'File Explorer', path: '/explorer', icon: FolderOutlined },
      { name: 'Video List', path: '/video', icon: PlayCircleOutlined },
      { name: 'Download Youtube', path: '/youtube', icon: YoutubeOutlined },
    ];

    const selectedKeys: string[] = items.filter(i => path.startsWith(i.path)).map(i => i.path);

    const itemComps = items.map(i => (
      <Menu.Item key={i.path}>
        <Link to={i.path}>
          <i.icon />
          <span className="nav-text">{i.name}</span>
        </Link>
      </Menu.Item>
    ));

    const links = [
      { name: 'Home', path: 'http://home.hyunsub.kim', icon: HomeOutlined },
      { name: 'Database', path: 'http://home.hyunsub.kim:5000', icon: DatabaseOutlined },
      { name: 'Torrent', path: 'http://home.hyunsub.kim:8082', icon: DownloadOutlined },
      { name: 'File Browser', path: 'http://home.hyunsub.kim:8090', icon: FolderOutlined },
      { name: 'Visual Studio Code', path: 'http://home.hyunsub.kim:8443', icon: BuildOutlined },
    ];

    const linkComps = links.map(i => (
      <Menu.Item key={i.path}>
        <a href={i.path} target="_blank" rel="noopener noreferrer">
          <i.icon />
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
  };

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
