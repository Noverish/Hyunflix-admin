import React, { useState, useCallback, useMemo } from 'react';
import { Button, Table, Input, Checkbox } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { basename, extname, dirname, join } from 'path';

import { Video, File } from 'models';
import { RootState } from 'states';
import { videoUpdate, rename, readdir } from 'api';

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

  const putToFront = useCallback(() => {
    setModifyList(list => list.map((v) => {
      const tmp = { ...v };
      tmp.path = input1 + v.path;
      return tmp;
    }));
  }, [input1]);

  const putToEnd = useCallback(() => {
    setModifyList(list => list.map((v) => {
      const tmp = { ...v };
      tmp.path = v.path + input1;
      return tmp;
    }));
  }, [input1]);

  const setAsIndexNumber = useCallback(() => {
    setModifyList(list => list.map((v, i) => {
      const tmp = { ...v };
      tmp.path = i.toString().padStart(parseInt(input1), '0');
      return tmp;
    }));
  }, [input1]);

  const execute = useCallback(() => {
    (async () => {
      for (let i = 0; i < modifyList.length; i += 1) {
        const modify = modifyList[i];
        const modifyTitle = basename(modify.path, extname(modify.path));
        const modifyParent = dirname(modify.path);

        const origin = originList[i];
        const originTitle = basename(origin.path, extname(origin.path));
        const originParent = dirname(origin.path);

        await videoUpdate(modify.id, { title: modifyTitle, path: modify.path });
        await rename(origin.path, modify.path);
        setMsgs(msg => [...msg, `${origin.path} => ${modify.path}`]);

        const files: File[] = (await readdir(originParent))
          .filter(f => basename(f.name, extname(f.name)) === originTitle)
          .filter(f => extname(f.path) !== '.mp4');

        for (const file of files) {
          const originPath = file.path;
          const modifyPath = join(modifyParent, modifyTitle + extname(file.name));
          await rename(originPath, modifyPath);
          setMsgs(msg => [...msg, `${originPath} => ${modifyPath}`]);
        }
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

  const messages = useMemo(() => msgs.map(str => <p key={str}>{str}</p>), [msgs]);

  return (
    <div>
      <Button.Group>
        <Button onClick={backToOrigin}>Back to origin</Button>
        <Button onClick={stringReplace}>String Replace</Button>
        <Button onClick={putToFront}>Put to Front</Button>
        <Button onClick={putToEnd}>Put to End</Button>
        <Button onClick={setAsIndexNumber}>Set as index number</Button>
        <Button type="primary" onClick={execute}>Execute</Button>
      </Button.Group>
      <Input onChange={onInputChange1} value={input1} placeholder="input 1" />
      <Input onChange={onInputChange2} value={input2} placeholder="input 2" />
      <Checkbox onChange={onCheckChange} checked={checked}>is Regex</Checkbox>
      <Table dataSource={dataSource} columns={columns} size="small" rowKey="index" />
      {messages}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  originList: state.video.checklist,
});

export default connect(mapStateToProps)(VideoEditTitlePage);
