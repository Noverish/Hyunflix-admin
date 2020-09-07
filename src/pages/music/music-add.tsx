import React, { useState, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { File } from 'src/models';
import { RootState } from 'src/states';
import { musicAdd } from 'src/api';
import { FileList } from 'src/components';

interface Props extends RouteComponentProps {
  checklist: File[];
}

const MusicAddPage: React.FC<Props> = (props) => {
  const { checklist } = props;
  const [msgs, setMsgs] = useState([] as string[]);

  // functions
  const onClick = useCallback(() => {
    (async () => {
      for (const f of checklist) {
        await musicAdd(f.path);
        setMsgs(msg => [...msg, f.path]);
      }
      setMsgs(msg => [...msg, 'done']);
    })();
  }, [checklist]);

  const messages = useMemo(() => msgs.map(str => <p key={str}>{str}</p>), [msgs]);

  return (
    <div>
      <FileList items={checklist} />
      <Button onClick={onClick}>추가</Button>
      {messages}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  checklist: state.file.checklist,
});

export default connect(mapStateToProps)(MusicAddPage);
