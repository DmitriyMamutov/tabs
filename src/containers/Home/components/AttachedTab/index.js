/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

import styles from './styles.module.scss';

const AttachedTab = (props) => {
  const { id, iconUrl, text } = props;

  const [pinVisibility, setPinVisibility] = useState(false);

  return (
    <div
    id={id}
      key={id}
      className={styles['tab']}
      onMouseEnter={() => setPinVisibility(true)}
      onMouseLeave={() => setPinVisibility(false)}
    >
      <div className={styles['tab__icon']}>
        <ReactSVG src={iconUrl} />
      </div>

      {pinVisibility && (
        <div className={styles['tab-pin']}>
          <div className={styles['tab-pin__icon']}>
            <ReactSVG src={iconUrl} />
          </div>
          <div className={styles['tab-pin__text']}>{text}</div>
        </div>
      )}
    </div>
  );
};

export default AttachedTab;
