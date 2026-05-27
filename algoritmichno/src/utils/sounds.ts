// src/utils/sounds.ts

const sounds = {
  swap: new Audio('/src/assets/sounds/swap.mp3'),
  compare: new Audio('/src/assets/sounds/compare.mp3'),
  success: new Audio('/src/assets/sounds/success.mp3'),
};

// Предзагрузка звуков
Object.values(sounds).forEach(audio => {
  audio.load();
});

export const playSound = (type: 'swap' | 'compare' | 'success', volume = 0.7) => {
  try {
    const sound = sounds[type];
    if (sound) {
      sound.currentTime = 0;        // перезапускаем звук с начала
      sound.volume = volume;
      sound.play().catch(() => {}); // игнорируем ошибки автоблокировки
    }
  } catch (e) {
    console.log('Sound playback failed');
  }
};