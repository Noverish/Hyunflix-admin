import React from 'react';
import { dirname } from 'path';
import { Spin, Button } from 'antd';

import { File } from 'models';
import { FileList } from 'components';
import { readdir } from 'api';

interface Props {
  onNext(): void;
}

interface State {
  path: string;
  files: File[];
  selectlist: File[];
  selectMode: boolean;
  loading: boolean;
}

class EncodeAddSelect extends React.Component<Props, State> {
  state: State = {
    path: '/',
    files: [],
    selectlist: [],
    selectMode: false,
    loading: false,
  };

  componentDidMount() {
    const { path } = this.state;
    this.refresh(path);
  }

  render() {
    const { onNext } = this.props;
    const { path, files, selectlist, selectMode, loading } = this.state;

    return (
      <Spin spinning={loading}>
        <FileList
          path={path}
          files={files}
          selectlist={selectMode ? selectlist : undefined}
          onItemClick={this.onItemClick}
          onItemLongClick={this.onItemLongClick}
          topRight={<Button type="primary" disabled={selectlist.length === 0} onClick={onNext}>Next</Button>}
        />
      </Spin>
    );
  }

  refresh = (path: string) => {
    const parent: File = {
      path: dirname(path),
      name: '../',
      isdir: true,
      size: '',
      url: '',
    };
    this.setState({ loading: true });

    readdir(path)
      .then((files: File[]) => {
        if (path !== '/') {
          files.unshift(parent);
        }

        this.setState({ files, path, selectlist: [], loading: false });
      });
  }

  onItemClick = (file: File) => {
    const { selectMode } = this.state;

    if (selectMode) {
      this.onSelect(file);
    } else {
      file.isdir && this.refresh(file.path);
    }
  }

  onItemLongClick = (file: File) => {
    const { selectMode } = this.state;

    if (selectMode) {
      this.onSelect(file);
    } else {
      this.setState({ selectMode: true, selectlist: [file] });
    }
  }

  private onSelect = (file: File) => {
    const { selectlist } = this.state;
    const isSelect = !selectlist.includes(file);
    const isWillBeEmpty = selectlist.length === 1 && !isSelect;
    const newSelectlist = (isSelect)
      ? [...this.state.selectlist, file]
      : selectlist.filter(f => f !== file);

    this.setState({
      selectMode: !isWillBeEmpty,
      selectlist: newSelectlist,
    });
  }
}

export default EncodeAddSelect;
