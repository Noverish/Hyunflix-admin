import React from 'react';
import { Steps, Progress } from 'antd';

import { YoutubeStatus, YoutubeStage } from 'models';

const { Step } = Steps;

const renderStep = (status: YoutubeStatus, stepStage: YoutubeStage) => {
  const { stage, progress, eta, error } = status;

  const title = (stepStage === YoutubeStage.download) ? 'Download' : 'Encode';

  let percent = 0;
  if (stage < stepStage) {
    percent = 0;
  } else if (stage === stepStage) {
    percent = progress;
  } else {
    percent = 100;
  }

  let subTitle = '';
  if (stage < stepStage) {
    subTitle = 'Ready';
  } else if (stage === stepStage) {
    subTitle = `${eta}s`;
  } else {
    subTitle = 'Finished';
  }

  const description = (error && stage === stepStage)
    ? <pre>{error}</pre>
    : <Progress percent={percent} />;

  return <Step title={title} subTitle={subTitle} description={description} />;
};

const YoutubeDownloadStatus: React.FC<YoutubeStatus> = (props) => {
  const { stage, error } = props;

  return (
    <Steps direction="vertical" current={stage} status={error ? 'error' : 'process'}>
      {renderStep(props, YoutubeStage.download)}
      {renderStep(props, YoutubeStage.encode)}
    </Steps>
  );
};

export default YoutubeDownloadStatus;
