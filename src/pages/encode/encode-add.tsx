import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Radio, Input, Button, Form, Collapse } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { extname, dirname, basename } from 'path';

import { File } from 'src/models';
import { RootState } from 'src/states';
import { encodePresets, encodeAdd } from 'src/api';
import { FormInstance } from 'antd/lib/form';

const { Panel } = Collapse;

interface Props extends RouteComponentProps {
  checklist: File[];
}

const EncodeAddPage: React.FC<Props> = (props) => {
  const { checklist } = props;
  const [presets, setPresets] = useState({} as object);
  const [msg, setMsg] = useState('');

  const forms: FormInstance[] = Array.from({ length: checklist.length }, () => Form.useForm()[0]);

  useEffect(() => {
    encodePresets()
      .then(setPresets)
      .catch(() => {});
  }, []);

  useEffect(() => {
    checklist.forEach((item, i) => {
      const inpath = item.path;
      forms[i].setFieldsValue({
        inpath,
        outpath: `${dirname(inpath)}/${basename(inpath, extname(inpath))}.mp4`,
      });
    });
  }, [checklist, forms]);

  // functions
  const onSubmit = useCallback(() => {
    Promise.all(forms.map(f => f.validateFields()))
      .then(values => (
        Promise.all(values.map(value => (
          encodeAdd(value.inpath, value.options, value.outpath)
        )))
      ))
      .then(() => setMsg('done'))
      .catch(error => setMsg(error.toString()));
  }, [forms]);

  const onRadioChange = useCallback((e: RadioChangeEvent) => {
    forms.forEach(f => f.setFieldsValue({ options: e.target.value }));
  }, [forms]);

  // components
  const radioButtons = useMemo(() => (
    Object.keys(presets).map((k: string) => (
      <Radio.Button value={presets[k]} key={k}>{k}</Radio.Button>
    ))
  ), [presets]);

  const panels = useMemo(() => (
    checklist.map((item, i) => (
      <Panel header={item.name} key={item.name} forceRender>
        <Form
          name={i.toString()}
          form={forms[i]}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="inpath" name="inpath">
            <Input disabled />
          </Form.Item>
          <Form.Item label="options" name="options">
            <Input />
          </Form.Item>
          <Form.Item label="outpath" name="outpath">
            <Input />
          </Form.Item>
        </Form>
      </Panel>
    ))
  ), [checklist, forms]);

  return (
    <div>
      <Radio.Group value="large" onChange={onRadioChange}>
        {radioButtons}
      </Radio.Group>
      <Collapse>
        {panels}
      </Collapse>
      <Button type="primary" onClick={onSubmit}>
        인코딩
      </Button>
      <p>{msg}</p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  checklist: state.file.checklist,
});

export default connect(mapStateToProps)(EncodeAddPage);
