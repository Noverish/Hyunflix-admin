import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Button, Pagination, List, message, PageHeader } from 'antd';
import * as socketio from 'socket.io-client';

import { EncodeItem } from 'components';
import { Encode } from 'models';
import { ffmpegPause, ffmpegResume, encodeList } from 'api';
import { SOCKET_SERVER, FFMPEG_SOCKET_PATH, PAGE_SIZE } from 'config';

interface Props extends RouteComponentProps {

}

interface State {
  encodes: Encode[];
  page: number;
}

class EncodePage extends React.Component<Props, State> {
  socket: SocketIOClient.Socket | null = null;

  state: State = {
    encodes: [],
    page: 1,
  };

  componentDidMount() {
    encodeList()
      .then((encodes: Encode[]) => this.setState({ encodes }))
      .catch(() => {});

    this.socket = socketio.connect(SOCKET_SERVER, { path: FFMPEG_SOCKET_PATH });
    this.socket.on('message', (data: Buffer) => {
      const payload = JSON.parse(data.toString());
      const encodes = this.state.encodes;

      const index = encodes.findIndex((item: Encode) => {
        return item.id === payload['encodeId'];
      });

      if (index >= 0) {
        encodes[index].progress = payload['progress'];
        this.setState({ encodes: [...encodes] });
      }
    });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  render() {
    const page: number = this.state.page;
    const encodes: Encode[] = this.state.encodes;
    const subItems: Encode[] = encodes.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);

    return (
      <div className="article-list-page">
        <div className="page-header">
          <PageHeader backIcon={false} title="비디오 인코딩" />
          <Button.Group className="button-group">
            <Button icon="caret-right" onClick={this.onResumeClicked}>Resume</Button>
            <Button icon="pause" onClick={this.onPauseClicked}>Pause</Button>
          </Button.Group>
          <Link to="/encode/add" style={{ marginLeft: '12px' }}>
            <Button type="primary">Add</Button>
          </Link>
        </div>
        <div className="page-content">
          <List
            dataSource={subItems}
            renderItem={(item: Encode) => (
              <EncodeItem encode={item} key={item.id} />
            )}
          />
        </div>
        <div className="page-footer">
          <div className="left wrapper"/>
          <div className="center wrapper">
            <Pagination current={page} total={encodes.length} pageSize={PAGE_SIZE} onChange={this.onChange} />
          </div>
          <div className="right wrapper"/>
        </div>
      </div>
    );
  }

  onChange = (page: number) => {
    this.setState({ page });
  }

  onPauseClicked = () => {
    ffmpegPause()
      .then(() => {
        message.success('success');
      })
      .catch(() => {});
  }

  onResumeClicked = () => {
    ffmpegResume()
      .then(() => {
        message.success('success');
      })
      .catch(() => {});
  }
}

export default EncodePage;
