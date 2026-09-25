import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlay } from 'react-icons/fi';
import './blocks.css';

// Poster first; the 4 MB video only downloads when someone presses play
const VideoIntro = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current && ref.current.play());
  };

  return (
    <figure className="video-intro">
      <div className="video-intro__frame">
        {playing ? (
          <video ref={ref} src="/media/alina-intro-web.mp4" poster="/media/alina-intro-poster.jpg" controls playsInline preload="auto" />
        ) : (
          <button type="button" className="video-intro__poster" onClick={play} aria-label={t('widgets.video.play')}>
            <img src="/media/alina-intro-poster.jpg" alt="" loading="lazy" width="960" height="540" />
            <span className="video-intro__play" aria-hidden="true">
              <FiPlay />
            </span>
            <span className="video-intro__len">{t('widgets.video.length')}</span>
          </button>
        )}
      </div>
      <figcaption>{t('widgets.video.caption')}</figcaption>
    </figure>
  );
};

export default VideoIntro;
