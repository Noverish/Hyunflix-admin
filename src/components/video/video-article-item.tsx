import React from 'react';
import { Tag, Tooltip, Checkbox } from 'antd';
import { connect } from 'react-redux';

import { VideoArticle } from 'models';
import { resolution2Color } from 'utils';

interface Props {
  onClick(article: VideoArticle): void;
  onCheck(article: VideoArticle, checked: boolean): void;
  highlight: string;
  article: VideoArticle;
  checkable: boolean;
  checked: boolean;
}

class VideoItem extends React.Component<Props> {
  renderTitle = (title: string) => {
    const { highlight } = this.props;

    // TODO const index = title.search(new RegExp(highlight, 'i'));
    const index = title.indexOf(highlight);
    const beforeStr = title.substr(0, index);
    const matchStr = title.substr(index, highlight.length);
    const afterStr = title.substr(index + highlight.length);
    return (index > -1)
      ? (
        <span className="article-title">
          {beforeStr}
          <span style={{ color: '#f50' }}>{matchStr}</span>
          {afterStr}
        </span>
      )
      : (
        <span className="article-title">{title}</span>
      );
  }

  renderTags = () => {
    const { article } = this.props;

    return article.tags.map(t => (
      <Tag key={t}>{t}</Tag>
    ));
  }

  render() {
    const { article, checkable, checked } = this.props;

    // TODO 여러 비디오 지원
    const video = article.videos[0];
    const color = resolution2Color(video.resolution);

    return (
      <div className="article-item" onClick={this.onClick}>
        <div className="first section">
          {checkable && <Checkbox className="check-box" checked={checked} />}
          <span className="article-id">{article.id}</span>
          {this.renderTags()}
          {this.renderTitle(article.title)}
        </div>
        <div className="second section">
          <span className="article-date">{video.durationString}</span>
          <Tooltip placement="top" title={`${video.width}x${video.height}`}>
            <Tag className="resolution" color={color}>{video.resolution}</Tag>
          </Tooltip>
          <span className="article-date">{article.date}</span>
        </div>
      </div>
    );
  }

  onClick = () => {
    const { checkable, article, checked } = this.props;

    if (checkable) {
      this.props.onCheck(article, !checked);
    } else {
      this.props.onClick(article);
    }
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(VideoItem);