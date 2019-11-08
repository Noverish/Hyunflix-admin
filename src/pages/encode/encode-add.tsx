import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Steps, Button, Result } from 'antd';
import { extname, dirname, basename } from 'path';
import * as classnames from 'classnames';

import EncodeAddSelect from './encode-add-select';
import EncodeAddOptions from './encode-add-options';
import { encodeAdd } from 'api';
import { File } from 'models';
const { Step } = Steps;

interface Props extends RouteComponentProps {

}

interface State {
  step: number;
  encodes: string[];
}

class EcodeAddPage extends React.Component<Props, State> {
  selectPage = React.createRef<EncodeAddSelect>();
  optionsPage = React.createRef<EncodeAddOptions>();

  state: State = {
    step: 0,
    encodes: [],
  };

  render() {
    const { step, encodes } = this.state;

    return (
      <div>
        <Steps className="border-top" style={{ padding: '24px 0' }} current={step}>
          <Step title="1. 폴더/파일 선택" />
          <Step title="2. 인코딩 옵션" />
          <Step title="3. 목록 추가 완료" />
        </Steps>
        <div className={classnames({ hidden: step !== 0 })}>
          <EncodeAddSelect
            ref={this.selectPage}
            onNext={this.onNext.bind(null, step)}
          />
        </div>
        <div className={classnames({ hidden: step !== 1 })}>
          <EncodeAddOptions
            ref={this.optionsPage}
            onNext={this.onNext.bind(null, step)}
          />
        </div>
        { step === 2 &&
          <Result
            className="border-top"
            status="success"
            title="목록 추가 완료"
            subTitle={
              <div>
                {encodes.join(', ')}
              </div>
            }
            extra={
              <Link to="/encode">
                <Button type="primary" key="console">목록 보기</Button>
              </Link>
            }
          />
        }
      </div>
    );
  }

  onNext = (step) => {
    if (step === 0) {
      this.setState({ step: 1 });
    } else if (step === 1) {
      this.process();
    }
  }

  process = async () => {
    const selectlist: File[] = this.selectPage.current!.state.selectlist;
    const options: string = this.optionsPage.current!.state.options;

    for (const video of selectlist) {
      const inpath = video.path;
      const outpath = dirname(inpath) + '/' + basename(inpath, extname(inpath)) + '.mp4';

      await encodeAdd(inpath, options, outpath);
    }

    this.setState({
      encodes: selectlist.map(v => basename(v.path)),
      step: this.state.step + 1,
    });
  }
}

export default EcodeAddPage;
