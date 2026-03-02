import React, { useEffect, useState, useRef } from 'react';
import { animated, useSprings } from 'react-spring';
import './FloatingWords.css';

const words = [
    'Привіт - Hello',
    'Світ - World',
    'Україна - Ukraine',
    'Книга - Book',
    'Друг - Friend',
    'Сонце - Sun',
    'Місяць - Moon',
    'Вода - Water',
    'Любов - Love',
    'Місто - City',
    'Квітка - Flower',
    'Машина - Car',
    'Їжа - Food',
    'Дерево - Tree',
    'Хмара - Cloud',
    'День - Day',
    'Ніч - Night',
    'Школа - School',
    'Робота - Work',
    'Здоров’я - Health',
    'Час - Time',
    'Колір - Color',
    'Життя - Life',
    'Музика - Music',
    'Подорож - Journey',
    'Домівка - Home',
    'Чоловік - Man',
    'Жінка - Woman',
    'Дитина - Child',
    'Мрія - Dream',
    'Казка - Fairy tale',
    'Океан - Ocean',
    'Зірка - Star',
    'Небо - Sky',
    'Мистецтво - Art',
    'Поезія - Poetry',
    'Танець - Dance',
    'Творчість - Creativity',
    'Натхнення - Inspiration',
    'Гармонія - Harmony',
    'Мелодія - Melody',
    'Романтика - Romance',
    'Пейзаж - Landscape',
    'Сутінки - Twilight',
    'Світанок - Dawn',
    'Захід - Sunset',
    'Світло - Light',
    'Темрява - Darkness',
    'Космос - Space',
    'Барви - Colors',
    'Фантазія - Fantasy',
    'Тиша - Silence',
    'Шум - Noise',
    'Радість - Joy',
    'Смуток - Sadness',
    'Сльоза - Tear',
    'Усмішка - Smile',
    'Веселощі - Merriment',
    'Вітер - Wind',
    'Сніг - Snow',
    'Дощ - Rain',
    'Гора - Mountain',
    'Ріка - River',
    'Ліс - Forest',
    'Душа - Soul',
    'Відчуття - Feeling',
    'Тепло - Warmth',
    'Холод - Cold',
    'Острів - Island',
    'Море - Sea',
    'Пляж - Beach',
    'Птах - Bird',
    'Звір - Animal',
    'Рослина - Plant',
    'Гора - Mountain',
    'Долина - Valley',
    'Пустеля - Desert',
    'Вулкан - Volcano',
    'Озеро - Lake',
    'Лід - Ice',
    'Печера - Cave',
    'Водоспад - Waterfall',
    'Луг - Meadow',
    'Равлина - Ravine',
    'Замок - Castle',
    'Хата - Cottage',
    'Парк - Park',
    'Сад - Garden',
    'Галявина - Glade',
    'Берег - Shore',
    'Країна - Country',
    'Континент - Continent',
    'Планета - Planet',
    'Зоря - Star',
    'Галактика - Galaxy',
    'Всесвіт - Universe',
    'Комета - Comet',
    'Астероїд - Asteroid',
    'Сузір’я - Constellation',
    'Туманність - Nebula',
    'Північ - North',
    'Південь - South',
    'Схід - East',
    'Захід - West',
    'Центр - Center',
    'Ліворуч - Left',
    'Праворуч - Right',
    'Вгору - Up',
    'Вниз - Down'
  ];
    
  
  const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };
  
  const getRandomCoord = () => Math.random() * 100;
  const getRandomSize = () => Math.random() * 20 + 15;
  const getRandomSpeed = () => Math.random() * 2 - 1; // speed between -1 and 1
  const getRandomOpacity = () => Math.random();
  
  const MAX_SPEED = 0.03;
  const MIN_SPEED = 0.004;
  
  const clampSpeed = (speed) => {
      return Math.min(MAX_SPEED, Math.max(MIN_SPEED, Math.abs(speed)));
  };
  
  export const FloatingWords = () => {
    const [floatingWords, setFloatingWords] = useState([]);
    const requestRef = useRef();
  
    const animate = () => {
      setFloatingWords((prev) =>
        prev.map((word) => {
          let { x, y, vx, vy, ...rest } = word;
  
          // Move
          x += vx;
          y += vy;
  
          // Bounce off walls
          if (x < 0 || x > 100) vx = -vx;
          if (y < 0 || y > 100) vy = -vy;
  
          // Clamp speed
          vx = clampSpeed(vx) * Math.sign(vx);
          vy = clampSpeed(vy) * Math.sign(vy);
  
          return { x, y, vx, vy, ...rest };
        })
      );
      requestRef.current = requestAnimationFrame(animate);
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setFloatingWords((prev) => {
          if (prev.length >= 40) {
            prev.shift();
          }
          return [
            ...prev,
            {
              word: getRandomWord(),
              x: getRandomCoord(),
              y: getRandomCoord(),
              vx: getRandomSpeed(),
              vy: getRandomSpeed(),
              size: getRandomSize(),
              opacity: getRandomOpacity(),
            },
          ];
        });
      }, 1000);
  
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        clearInterval(intervalId);
        cancelAnimationFrame(requestRef.current);
      };
    }, []);
  
    return (
      <div className="floating-words">
        {floatingWords.map((props, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: `${props.y}vh`,
              left: `${props.x}vw`,
              fontSize: `${props.size}px`,
              opacity: props.opacity,
            }}
            className="floating-word"
          >
            {props.word}
          </div>
        ))}
      </div>
    );
  };
            

// Works great! But too many words and words repeat
// import React, { useEffect, useState } from 'react';
// import { animated, useSprings } from 'react-spring';
// import './FloatingWords.css';

// const words = [
//     'Привіт - Hello',
//     'Світ - World',
//     'Україна - Ukraine',
//     'Книга - Book',
//     'Друг - Friend',
//     'Сонце - Sun',
//     'Місяць - Moon',
//     'Вода - Water',
//     'Любов - Love',
//     'Місто - City',
//     'Квітка - Flower',
//     'Машина - Car',
//     'Їжа - Food',
//     'Дерево - Tree',
//     'Хмара - Cloud',
//     'День - Day',
//     'Ніч - Night',
//     'Школа - School',
//     'Робота - Work',
//     'Здоров’я - Health',
//     'Час - Time',
//     'Колір - Color',
//     'Життя - Life',
//     'Музика - Music',
//     'Подорож - Journey',
//     'Домівка - Home',
//     'Чоловік - Man',
//     'Жінка - Woman',
//     'Дитина - Child',
//     'Мрія - Dream',
//     'Казка - Fairy tale',
//     'Океан - Ocean',
//     'Зірка - Star',
//     'Небо - Sky',
//     'Мистецтво - Art',
//     'Поезія - Poetry',
//     'Танець - Dance',
//     'Творчість - Creativity',
//     'Натхнення - Inspiration',
//     'Гармонія - Harmony',
//     'Мелодія - Melody',
//     'Романтика - Romance',
//     'Пейзаж - Landscape',
//     'Сутінки - Twilight',
//     'Світанок - Dawn',
//     'Захід - Sunset',
//     'Світло - Light',
//     'Темрява - Darkness',
//     'Космос - Space',
//     'Барви - Colors',
//     'Фантазія - Fantasy',
//     'Тиша - Silence',
//     'Шум - Noise',
//     'Радість - Joy',
//     'Смуток - Sadness',
//     'Сльоза - Tear',
//     'Усмішка - Smile',
//     'Веселощі - Merriment',
//     'Вітер - Wind',
//     'Сніг - Snow',
//     'Дощ - Rain',
//     'Гора - Mountain',
//     'Ріка - River',
//     'Ліс - Forest',
//     'Душа - Soul',
//     'Відчуття - Feeling',
//     'Тепло - Warmth',
//     'Холод - Cold',
//     'Острів - Island',
//     'Море - Sea',
//     'Пляж - Beach',
//     'Птах - Bird',
//     'Звір - Animal',
//     'Рослина - Plant',
//     'Гора - Mountain',
//     'Долина - Valley',
//     'Пустеля - Desert',
//     'Вулкан - Volcano',
//     'Озеро - Lake',
//     'Лід - Ice',
//     'Печера - Cave',
//     'Водоспад - Waterfall',
//     'Луг - Meadow',
//     'Равлина - Ravine',
//     'Замок - Castle',
//     'Хата - Cottage',
//     'Парк - Park',
//     'Сад - Garden',
//     'Галявина - Glade',
//     'Берег - Shore',
//     'Країна - Country',
//     'Континент - Continent',
//     'Планета - Planet',
//     'Зоря - Star',
//     'Галактика - Galaxy',
//     'Всесвіт - Universe',
//     'Комета - Comet',
//     'Астероїд - Asteroid',
//     'Сузір’я - Constellation',
//     'Туманність - Nebula',
//     'Північ - North',
//     'Південь - South',
//     'Схід - East',
//     'Захід - West',
//     'Центр - Center',
//     'Ліворуч - Left',
//     'Праворуч - Right',
//     'Вгору - Up',
//     'Вниз - Down'
//   ];

// const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
// const getRandomCoord = () => Math.random() * 100;
// const getRandomSize = () => Math.random() * 20 + 15; // font-size between 15 and 35
// const getRandomSpeed = () => Math.random() * 2000 + 1000; // duration between 1000ms and 3000ms
// const getRandomOpacity = () => Math.random(); // opacity between 0 and 1

// export const FloatingWords = () => {
//     const [floatingWords, setFloatingWords] = useState([]);

//     const springs = useSprings(
//         floatingWords.length,
//         floatingWords.map((item) => ({
//             from: { transform: `translate(${item.left}vw, ${item.top}vh)`, opacity: item.opacity, fontSize: `${item.size}px` },
//             to: async (next) => {
//                 while (true) {
//                     await next({ transform: `translate(${item.left}vw, ${item.top}vh)` });
//                     await new Promise(resolve => setTimeout(resolve, item.speed));
//                     await next({ transform: `translate(${item.left + 10}vw, ${item.top + 10}vh)` });
//                     await new Promise(resolve => setTimeout(resolve, item.speed));
//                 }
//             },
//         }))
//     );

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setFloatingWords((prev) => [
//                 ...prev,
//                 {
//                     word: getRandomWord(),
//                     top: getRandomCoord(),
//                     left: getRandomCoord(),
//                     size: getRandomSize(),
//                     speed: getRandomSpeed(),
//                     opacity: getRandomOpacity(),
//                 },
//             ]);
//         }, 1000);

//         return () => clearInterval(intervalId);
//     }, []);

//     return (
//         <div className="floating-words">
//             {springs.map((props, index) => (
//                 <animated.div key={index} style={props} className="floating-word">
//                     {floatingWords[index].word}
//                 </animated.div>
//             ))}
//         </div>
//     );
// };


// Code worked fine, better than with CSS
// import React, { useEffect, useState } from 'react';
// import anime from 'animejs';
// import './FloatingWords.css';


// const words = [
//     'Привіт - Hello',
//     'Світ - World',
//     'Україна - Ukraine',
//     'Книга - Book',
//     'Друг - Friend',
//     'Сонце - Sun',
//     'Місяць - Moon',
//     'Вода - Water',
//     'Любов - Love',
//     'Місто - City',
//     'Квітка - Flower',
//     'Машина - Car',
//     'Їжа - Food',
//     'Дерево - Tree',
//     'Хмара - Cloud',
//     'День - Day',
//     'Ніч - Night',
//     'Школа - School',
//     'Робота - Work',
//     'Здоров’я - Health',
//     'Час - Time',
//     'Колір - Color',
//     'Життя - Life',
//     'Музика - Music',
//     'Подорож - Journey',
//     'Домівка - Home',
//     'Чоловік - Man',
//     'Жінка - Woman',
//     'Дитина - Child',
//     'Мрія - Dream',
//     'Казка - Fairy tale',
//     'Океан - Ocean',
//     'Зірка - Star',
//     'Небо - Sky',
//     'Мистецтво - Art',
//     'Поезія - Poetry',
//     'Танець - Dance',
//     'Творчість - Creativity',
//     'Натхнення - Inspiration',
//     'Гармонія - Harmony',
//     'Мелодія - Melody',
//     'Романтика - Romance',
//     'Пейзаж - Landscape',
//     'Сутінки - Twilight',
//     'Світанок - Dawn',
//     'Захід - Sunset',
//     'Світло - Light',
//     'Темрява - Darkness',
//     'Космос - Space',
//     'Барви - Colors',
//     'Фантазія - Fantasy',
//     'Тиша - Silence',
//     'Шум - Noise',
//     'Радість - Joy',
//     'Смуток - Sadness',
//     'Сльоза - Tear',
//     'Усмішка - Smile',
//     'Веселощі - Merriment',
//     'Вітер - Wind',
//     'Сніг - Snow',
//     'Дощ - Rain',
//     'Гора - Mountain',
//     'Ріка - River',
//     'Ліс - Forest',
//     'Душа - Soul',
//     'Відчуття - Feeling',
//     'Тепло - Warmth',
//     'Холод - Cold',
//     'Острів - Island',
//     'Море - Sea',
//     'Пляж - Beach',
//     'Птах - Bird',
//     'Звір - Animal',
//     'Рослина - Plant',
//     'Гора - Mountain',
//     'Долина - Valley',
//     'Пустеля - Desert',
//     'Вулкан - Volcano',
//     'Озеро - Lake',
//     'Лід - Ice',
//     'Печера - Cave',
//     'Водоспад - Waterfall',
//     'Луг - Meadow',
//     'Равлина - Ravine',
//     'Замок - Castle',
//     'Хата - Cottage',
//     'Парк - Park',
//     'Сад - Garden',
//     'Галявина - Glade',
//     'Берег - Shore',
//     'Країна - Country',
//     'Континент - Continent',
//     'Планета - Planet',
//     'Зоря - Star',
//     'Галактика - Galaxy',
//     'Всесвіт - Universe',
//     'Комета - Comet',
//     'Астероїд - Asteroid',
//     'Сузір’я - Constellation',
//     'Туманність - Nebula',
//     'Північ - North',
//     'Південь - South',
//     'Схід - East',
//     'Захід - West',
//     'Центр - Center',
//     'Ліворуч - Left',
//     'Праворуч - Right',
//     'Вгору - Up',
//     'Вниз - Down'
//   ];
  
// const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
// const getRandomCoord = () => Math.floor(Math.random() * 100);

// export const FloatingWords = () => {
//   const [floatingWords, setFloatingWords] = useState([]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setFloatingWords((prev) => [
//         ...prev,
//         {
//           word: getRandomWord(),
//           top: getRandomCoord(),
//           left: getRandomCoord(),
//         },
//       ]);
//     }, 1000); // Adjust the interval to manage the frequency of words

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     anime({
//       targets: '.floating-word',
//       translateX: [
//         { value: 50, duration: 4000 },
//         { value: 0, duration: 4000 }
//       ],
//       translateY: [
//         { value: 50, duration: 4000 },
//         { value: 0, duration: 4000 }
//       ],
//       scale: [
//         { value: [1, 3], duration: 4000, easing: 'easeOutSine' },
//         { value: 1, duration: 4000, easing: 'easeInOutQuad' }
//       ],
//       opacity: [
//         { value: 0.2, duration: 4000, easing: 'easeOutSine' },
//         { value: 0.7, duration: 4000, easing: 'easeInOutQuad' },
//         { value: 0.2, duration: 4000, easing: 'easeOutSine' }
//       ],
//       loop: true
//     });
//   }, []);

//   return (
//     <div className="floating-words">
//       {floatingWords.map((wordObj, index) => (
//         <div
//           key={index}
//           className="floating-word"
//           style={{ top: `${wordObj.top}vh`, left: `${wordObj.left}vw` }}
//         >
//           {wordObj.word}
//         </div>
//       ))}
//     </div>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import './FloatingWords.css';

// // const words = ['Привіт', 'Світ', 'Україна', 'Реакт']; // Add more Ukrainian words as per your need
// const words = [
//     // 'Привіт - Hello',
//     'Світ - World',
//     'Україна - Ukraine',
//     'Книга - Book',
//     'Друг - Friend',
//     'Сонце - Sun',
//     'Місяць - Moon',
//     'Вода - Water',
//     'Любов - Love',
//     'Місто - City',
//     'Квітка - Flower',
//     'Машина - Car',
//     'Їжа - Food',
//     'Дерево - Tree',
//     'Хмара - Cloud',
//     'День - Day',
//     'Ніч - Night',
//     'Школа - School',
//     'Робота - Work',
//     'Здоров’я - Health',
//     'Час - Time',
//     'Колір - Color',
//     'Життя - Life',
//     'Музика - Music',
//     'Подорож - Journey',
//     'Домівка - Home',
//     'Чоловік - Man',
//     'Жінка - Woman',
//     'Дитина - Child',
//     'Мрія - Dream',
//     'Казка - Fairy tale',
//     'Океан - Ocean',
//     'Зірка - Star',
//     'Небо - Sky',
//     'Мистецтво - Art',
//     'Поезія - Poetry',
//     'Танець - Dance',
//     'Творчість - Creativity',
//     'Натхнення - Inspiration',
//     'Гармонія - Harmony',
//     'Мелодія - Melody',
//     'Романтика - Romance',
//     'Пейзаж - Landscape',
//     'Сутінки - Twilight',
//     'Світанок - Dawn',
//     'Захід - Sunset',
//     'Світло - Light',
//     'Темрява - Darkness',
//     'Космос - Space',
//     'Барви - Colors',
//     'Фантазія - Fantasy',
//     'Тиша - Silence',
//     'Шум - Noise',
//     'Радість - Joy',
//     'Смуток - Sadness',
//     'Сльоза - Tear',
//     'Усмішка - Smile',
//     'Веселощі - Merriment',
//     'Вітер - Wind',
//     'Сніг - Snow',
//     'Дощ - Rain',
//     'Гора - Mountain',
//     'Ріка - River',
//     'Ліс - Forest',
//     'Душа - Soul',
//     'Відчуття - Feeling',
//     'Тепло - Warmth',
//     'Холод - Cold',
//     'Острів - Island',
//     'Море - Sea',
//     'Пляж - Beach',
//     // 'Птах - Bird',
//     // 'Звір - Animal',
//     // 'Рослина - Plant',
//     // 'Гора - Mountain',
//     // 'Долина - Valley',
//     // 'Пустеля - Desert',
//     // 'Вулкан - Volcano',
//     // 'Озеро - Lake',
//     'Лід - Ice',
//     'Печера - Cave',
//     'Водоспад - Waterfall',
//     'Луг - Meadow',
//     'Равлина - Ravine',
//     'Замок - Castle',
//     'Хата - Cottage',
//     'Парк - Park',
//     'Сад - Garden',
//     'Галявина - Glade',
//     'Берег - Shore',
//     'Країна - Country',
//     'Континент - Continent',
//     'Планета - Planet',
//     'Зоря - Star',
//     'Галактика - Galaxy',
//     'Всесвіт - Universe',
//     'Комета - Comet',
//     'Астероїд - Asteroid',
//     'Сузір’я - Constellation',
//     'Туманність - Nebula',
//     // 'Північ - North',
//     // 'Південь - South',
//     // 'Схід - East',
//     // 'Захід - West',
//     // 'Центр - Center',
//     // 'Ліворуч - Left',
//     // 'Праворуч - Right',
//     // 'Вгору - Up',
//     // 'Вниз - Down'
//   ];
  

// const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
// const getRandomCoord = () => Math.floor(Math.random() * 100);

// export const FloatingWords = () => {
//   const [floatingWords, setFloatingWords] = useState([]);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setFloatingWords((prev) => [
//         ...prev,
//         {
//           word: getRandomWord(),
//           top: getRandomCoord(),
//           left: getRandomCoord(),
//         },
//       ]);
//     }, 2000); // Adjust the interval to manage the frequency of words

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="floating-words">
//       {floatingWords.map((wordObj, index) => (
//         <div
//           key={index}
//           className="floating-word"
//           style={{ top: `${wordObj.top}vh`, left: `${wordObj.left}vw` }}
//         >
//           {wordObj.word}
//         </div>
//       ))}
//     </div>
//   );
// };
