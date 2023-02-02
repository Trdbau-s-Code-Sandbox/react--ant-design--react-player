/* eslint-disable no-unused-vars */
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Col, Row, notification } from 'antd';
import ReactPlayer from 'react-player/youtube';
import PropTypes from 'prop-types';

import { emptyFn } from 'utils';
import { useCountdown } from 'utils/hooks';

import config from './config.js';

function VideoScreen(props) {
  const { isDarkMode, isPlayingVideo, isLastVideo, countdown, video, onVideoDone } = props;

  const [api, contextHolder] = notification.useNotification();

  // EX: Countdown for SkyX's Info pop-up
  const [count, { startCountdown, stopCountdown, resetCountdown, isCountdownRunning }] =
    useCountdown({
      countStart: countdown,
    });

  const videoRef = useRef();
  const [forceVideoPlay, setForceVideoPlay] = useState(false);

  const onEnded = useCallback(() => {
    if (isLastVideo) {
      resetCountdown();

      startCountdown();
    } else {
      onVideoDone();
    }
  }, [isLastVideo, resetCountdown, startCountdown, onVideoDone]);

  useEffect(() => {
    if (isPlayingVideo) {
      api.open({
        message: 'Video',
        description: `Video: ${video}`,
        duration: 0,
      });

      setTimeout(() => {
        setForceVideoPlay(true);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayingVideo]);

  return (
    <div>
      {contextHolder}

      <ReactPlayer
        key={video}
        url={video}
        onEnded={onEnded}
        playing={forceVideoPlay}
        ref={videoRef}
        width="100%"
        height="100%"
      />
    </div>
  );
}

VideoScreen.propTypes = {
  isDarkMode: PropTypes.bool,
  isPlayingVideo: PropTypes.bool,
  isLastVideo: PropTypes.bool,
  countdown: PropTypes.number,
  video: PropTypes.string,
  onVideoDone: PropTypes.func,
};

VideoScreen.defaultProps = {
  isDarkMode: false,
  isPlayingVideo: false,
  isLastVideo: false,
  countdown: 0,
  video: '',
  onVideoDone: emptyFn,
};

export default memo(VideoScreen);
