import React, { useState, useCallback, useMemo } from 'react';
import { Button, Table, Input, Checkbox } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { basename, extname } from 'path';

import { Video } from 'models';
import { RootState } from 'states';
import { videoUpdate, rename } from 'api';

interface Props extends RouteComponentProps {
  originList: Video[];
}

const columns = [
  {
    title: 'origin',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: 'modify',
    dataIndex: 'modify',
    key: 'modify',
  },
];

const VideoEditTitlePage: React.FC<Props> = (props) => {
  const { originList } = props;
  const [modifyList, setModifyList] = useState(originList as Video[]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [checked, setChecked] = useState(false);
  const [msgs, setMsgs] = useState([] as string[]);

  // functions
  const onInputChange1 = useCallback((e) => {
    setInput1(e.target.value);
  }, [setInput1]);

  const onInputChange2 = useCallback((e) => {
    setInput2(e.target.value);
  }, [setInput2]);

  const onCheckChange = useCallback((e) => {
    setChecked(e.target.checked);
  }, [setChecked]);

  const backToOrigin = useCallback(() => {
    setModifyList(originList);
  }, [originList]);

  const stringReplace = useCallback(() => {
    setModifyList(list => list.map((v) => {
      const tmp = { ...v };
      const replace = checked ? new RegExp(input1, 'g') : input1;
      tmp.path = v.path.replace(replace, input2);
      return tmp;
    }));
  }, [checked, input1, input2]);

  const execute = useCallback(() => {
    (async () => {
      for (let i = 0; i < modifyList.length; i += 1) {
        const { id, path } = modifyList[i];
        const title = basename(path, extname(path));
        const origin = originList[i];

        await videoUpdate(id, { title, path });
        setMsgs(msg => [...msg, `${origin.title} => ${title}`]);
        await rename(origin.path, path);
        setMsgs(msg => [...msg, `${origin.path} => ${path}`]);
      }
      setMsgs(msg => [...msg, 'done']);
    })();
  }, [originList, modifyList]);

  // components
  const dataSource = useMemo(() => Array.from(
    { length: originList.length },
    (_, i) => ({
      index: i,
      origin: originList[i].path,
      modify: modifyList[i].path,
    }),
  ), [originList, modifyList]);

  const messages = useMemo(() => {
    return msgs.map((str, i) => <p key={i}>{str}</p>);
  }, [msgs]);

  return (
    <div>
      <Button.Group>
        <Button onClick={backToOrigin}>Back to origin</Button>
        <Button onClick={stringReplace}>String Replace</Button>
      </Button.Group>
      <Input onChange={onInputChange1} value={input1} placeholder="input 1" />
      <Input onChange={onInputChange2} value={input2} placeholder="input 2" />
      <Checkbox onChange={onCheckChange} checked={checked}>is Regex</Checkbox>
      <Table dataSource={dataSource} columns={columns} size="small" rowKey="index"/>
      <Button onClick={execute}>Execute</Button>
      {messages}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  originList: state.video.checklist,
});

export default connect(mapStateToProps)(VideoEditTitlePage);
