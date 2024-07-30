/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import useScreenSize from 'hooks/useScreenSize';
import { ReactSVG } from 'react-svg';
import { REMOVE, PIN } from 'constants/index';

import styles from './styles.module.scss';

const Tab = (props) => {
  const {
    id,
    provided,
    text,
    handleAttach,
    iconUrl,
    snapshot,
    list,
    setList,
    handleDelete,
  } = props;

  const [pinVisibility, setPinVisibility] = useState(false);

  const screenSize = useScreenSize();
  const ref = useRef();

  let newArr = [...list];

  useEffect(() => {
    if (
      window &&
      ref.current.getBoundingClientRect().right > screenSize.width - 40
    ) {
      newArr.forEach((obj) => {
        if (obj.id === id) {
          obj.isVisible = false;
        }
      });

      setList(newArr);
    }
  }, []);

  return (
    <div
      className={cn(styles['tab'], 'tab', {
        [styles['tab--dragging']]: snapshot.isDragging,
      })}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onMouseEnter={() => setPinVisibility(true)}
      onMouseLeave={() => setPinVisibility(false)}
    >
      <div
        className={cn(styles['tab__icon'], {
          [styles['tab__icon--dragging']]: snapshot.isDragging,
        })}
      >
        <ReactSVG src={iconUrl} />
      </div>
      <div
        ref={ref}
        className={cn(styles['tab__text'], {
          [styles['tab__text--dragging']]: snapshot.isDragging,
        })}
      >
        {text}
      </div>

      {pinVisibility && (
        <div
          className={styles['tab-pin']}
          onClick={() =>
            handleAttach(
              provided.dragHandleProps['data-rbd-drag-handle-draggable-id'],
            )
          }
        >
          <div className={styles['tab-pin__icon']}>
            <ReactSVG src={PIN} />
          </div>
          <div className={styles['tab-pin__text']}>Tab anpinnen</div>
        </div>
      )}
      {pinVisibility && (
        <div
          className={styles['tab__remove']}
          onClick={() =>
            handleDelete(
              provided.dragHandleProps['data-rbd-drag-handle-draggable-id'],
            )
          }
        >
          <ReactSVG src={REMOVE} />
        </div>
      )}
    </div>
  );
};

export default Tab;
