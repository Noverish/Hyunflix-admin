import React, { useState, useEffect } from 'react';
import { Modal, Radio, Input } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { extname, dirname, basename } from 'path';

import { File } from 'models';
import { encodePresets, encodeAdd } from 'api';

interface Props {
  visible: boolean;
  onDismiss(): void;
  files: File[];
}

const EncodeModal: React.FC<Props> = (props) => {
  const [presets, setPresets] = useState({} as object);
  const [option, setOption] = useState('');

  useEffect(() => {
    encodePresets()
      .then(setPresets);
  }, []);

  const radioButtons = Object.keys(presets).map((k: string) => {
    return <Radio.Button value={presets[k]} key={k}>{k}</Radio.Button>;
  });

  const onOk = () => {
    Promise.all(props.files.map((f: File) => {
      const inpath = f.path;
      const outpath = dirname(inpath) + '/' + basename(inpath, extname(inpath)) + '.mp4';
      return encodeAdd(inpath, option, outpath);
    })).then(() => {
      props.onDismiss();
    });
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setOption(e.target.value);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOption(e.target.value);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={props.visible}
      onOk={onOk}
      onCancel={props.onDismiss}
    >
      <Radio.Group value="large" onChange={onRadioChange} style={{ margin: '12px 0' }}>
        {radioButtons}
      </Radio.Group>
      <Input.TextArea
        autoSize={true}
        placeholder="options"
        value={option}
        onChange={onInputChange}
      />
    </Modal>
  );
};

export default EncodeModal;
