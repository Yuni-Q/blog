import React from 'react';
import './Spinner.scss';

interface Props {
  /**
   * 클래스명을 추가할 수 있습니다.
   * */
  className?: string;
  /**
   * 로딩 상태를 뜻합니다.
   * */
  status?: true;
  /**
   * 스피너 아이콘을 감싸는 영역의 높이 값입니다.
   * */
  size?: number;
}

const Spinner: React.FC<Props> = ({ className, status, size = 28 }) => {
  return (
    <div
      className={'spinner la-ball-pulse ' + (className || '')}
      style={{ height: size }}
    >
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
