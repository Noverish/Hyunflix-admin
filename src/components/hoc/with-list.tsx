import React, { ComponentType, FC } from 'react';
import { List } from 'antd';

export interface ExternalProps<T> {
  items: T[];
  checklist?: T[];
  onItemClick?(item: T): void;
  loading?: boolean;
}

export interface InjectedProps<T> {
  item: T;
  checked?: boolean;
}

export interface Options<T> {
  isEqual(t1: T, t2: T): boolean;
}

function withList<T>(options: Options<T>) {
  return function (Component: ComponentType<InjectedProps<T>>) {
    const { isEqual } = options;

    function bindedOnItemClick(onItemClick: (item: T) => void, item: T, e: React.MouseEvent) {
      e.preventDefault();
      onItemClick(item);
    }

    function renderItem(props: ExternalProps<T>, item: T) {
      const { checklist, onItemClick } = props;

      const checked = (checklist !== undefined)
        ? checklist.some(i => isEqual(i, item))
        : undefined;

      const onClick = (onItemClick !== undefined)
        ? bindedOnItemClick.bind(null, onItemClick, item)
        : undefined;

      return (
        <List.Item onClick={onClick}>
          <Component
            {...props}
            item={item}
            checked={checked}
          />
        </List.Item>
      );
    }

    const HOCList: FC<ExternalProps<T>> = (props) => {
      const { items, loading } = props;

      return (
        <List
          className="list"
          size="small"
          dataSource={items}
          renderItem={renderItem.bind(null, props)}
          loading={loading}
          bordered
        />
      );
    };

    return HOCList;
  };
}

export default withList;
