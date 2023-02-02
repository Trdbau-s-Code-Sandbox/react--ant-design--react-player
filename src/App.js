import React, { useEffect, useRef, useState } from 'react';
import { Carousel, ConfigProvider } from 'antd';

import VideoScreen from './components/VideoScreen';

import 'antd/dist/reset.css';
import 'index.css';

const videos = [
  // 'https://www.youtube.com/watch?v=Dgg3Zf4-zzo',
  'https://www.youtube.com/watch?v=7lUHfM0jI60',
  'https://www.youtube.com/watch?v=LJpgvQ0DixE',
];

function App() {
  const carouselRef = useRef();
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      carouselRef.current.next();
      setCarouselIndex(1);
    }, 5000);
  }, []);

  return (
    <Carousel className='w-100 h-100' infinite ref={carouselRef} dots={false}>
      <div>
        <span>
          full screen for showing some stuffs, pending for 5 seconds, after
          that, go to video 1 and play after another 3s it.
        </span>

        <span>
          <h1>
            But NOTHING!
          </h1>
        </span>
      </div>

      {videos.map((video, index) => (
        <VideoScreen
          video={video}
          key={video}
          isPlayingVideo={index + 1 === carouselIndex}
          isLastVideo={videos.length - 1 === index}
        />
      ))}
    </Carousel>
  );
}

export default App;
