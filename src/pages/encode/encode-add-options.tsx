import React, { useState, useEffect } from 'react';
import { Radio, Input, Button } from 'antd';

import { encodePresets } from 'api';

interface Props {
  onNext(): void;
}

interface State {
  presets: object;
  options: string;
}

class EncodeAddOptions extends React.Component<Props, State> {
  state: State = {
    presets: {},
    options: '',
  };

  componentDidMount() {
    encodePresets()
      .then(presets => this.setState({ presets }));
  }

  render() {
    const { onNext } = this.props;
    const { presets, options } = this.state;

    const radioButtons = Object.keys(presets).map((k: string) => {
      return <Radio.Button value={presets[k]} key={k}>{k}</Radio.Button>;
    });

    return (
      <div className="border-top">
        <Radio.Group value="large" onChange={this.onPresetSelect} style={{ margin: '12px 0' }}>
          {radioButtons}
        </Radio.Group>
        <Input.TextArea
          autosize={true}
          placeholder="options"
          value={options}
          onChange={this.onChange}
        />
        <Button type="primary" disabled={!options} onClick={onNext} style={{ margin: '12px 0' }}>Next</Button>
      </div>
    );
  }

  onChange = (e) => {
    this.setState({ options: e.target.value });
  }

  onPresetSelect = (e) => {
    this.setState({ options: e.target.value });
  }
}

export default EncodeAddOptions;
