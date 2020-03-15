import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Radio, Input, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { extname, dirname, basename } from 'path';

import { File } from 'src/models';
import { RootState } from 'src/states';
import { encodePresets, encodeAdd } from 'src/api';
import { FileList } from 'src/components';

interface Props extends RouteComponentProps {
  checklist: File[];
}

const EncodeAddPage: React.FC<Props> = (props) => {
  const { checklist } = props;
  const [presets, setPresets] = useState({} as object);
  const [option, setOption] = useState('');
  const [msgs, setMsgs] = useState([] as string[]);

  useEffect(() => {
    encodePresets()
      .then(setPresets);
  }, []);

  // functions
  const onClick = useCallback(() => {
    (async () => {
      for (const f of checklist) {
        const inpath = f.path;
        const outpath = `${dirname(inpath)}/${basename(inpath, extname(inpath))}.mp4`;
        await encodeAdd(inpath, option, outpath);
        setMsgs(msg => [...msg, inpath]);
      }
      setMsgs(msg => [...msg, 'done']);
    })();
  }, [checklist, option]);

  const onRadioChange = (e: RadioChangeEvent) => {
    setOption(e.target.value);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOption(e.target.value);
  };

  // components
  const radioButtons = useMemo(() => Object.keys(presets).map((k: string) => <Radio.Button value={presets[k]} key={k}>{k}</Radio.Button>), [presets]);

  const messages = useMemo(() => msgs.map(str => <p key={str}>{str}</p>), [msgs]);

  return (
    <div>
      <FileList items={checklist} />
      <Radio.Group value="large" onChange={onRadioChange}>
        {radioButtons}
      </Radio.Group>
      <Input.TextArea
        autoSize
        placeholder="options"
        value={option}
        onChange={onInputChange}
      />
      <Button onClick={onClick}>인코딩</Button>
      {messages}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  checklist: state.file.checklist,
});

export default connect(mapStateToProps)(EncodeAddPage);
