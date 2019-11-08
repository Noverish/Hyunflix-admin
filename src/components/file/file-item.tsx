import React from 'react';
import { Checkbox, Icon } from 'antd';
import * as classnames from 'classnames';
import ClickNHold from 'react-click-n-hold';

import { File } from 'models';
import { LONG_CLICK_TIME } from 'config';

interface Props {
  file: File;
  onClick?(file: File): void;
  onLongClick?(file: File): void;
  selected?: boolean;
}

const FileItem: React.FunctionComponent<Props> = (props) => {
  const { file, onClick, onLongClick, selected } = props;
  const iconType = file.isdir ? 'folder' : 'file';
  const className = classnames('article-item', { selected });

  const onEnd = (_, enough) => {
    (onClick && !enough) && onClick(file);
  };

  const onClickNHold = () => {
    onLongClick && onLongClick(file);
  };

  return (
    <ClickNHold
      time={LONG_CLICK_TIME}
      onClickNHold={onClickNHold}
      onEnd={onEnd}
    >
      <div className={className}>
        <div className="first section">
          {selected !== undefined && <Checkbox className="check-box" checked={selected} />}
          <Icon type={iconType} />
          <span>{file.name}</span>
        </div>
        <div className="second section">
          <div className="article-date">{file.size}</div>
        </div>
      </div>
    </ClickNHold>
  );
};

export default FileItem;
