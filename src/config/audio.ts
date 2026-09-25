export type BackgroundTrackMeta = {
  title: string;
  artist: string;
  cover: string;
};

export const backgroundMusicTracks: Record<string, BackgroundTrackMeta> = {
  'Consume.mp3': {
    title: 'Consume',
    artist: 'Chase Atlantic',
    cover: '/audio/covers/chaseatlantic.jpg',
  },
  'BrooklynBaby.mp3': {
    title: 'Brooklyn Baby',
    artist: 'Lana Del Rey',
    cover: '/audio/covers/ultraviolence.jpg',
  },
  'DancingInMyRoom.mp3': {
    title: 'Dancing in My Room',
    artist: '347Aidan',
    cover: '/audio/covers/dancinginmyroom.jpg',
  },
  'DEVIL-IS-A-LIE.mp3': {
    title: 'Devil Is A Lie',
    artist: 'Tommy Richman',
    cover: '/audio/covers/devilisalie.jpg',
  },
  'Espresso.mp3': {
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    cover: '/audio/covers/shortn\'sweet.jpg',
  },
  'SeNorita.mp3': {
    title: 'Señorita',
    artist: 'Shawn Mendes & Camila Cabello',
    cover: '/audio/covers/senorita.jpg',
  },
  'Swim.mp3': {
    title: 'Swim',
    artist: 'Chase Atlantic',
    cover: '/audio/covers/chaseatlantic.jpg',
  },
  'BelongToTheCity.m4a': {
    title: 'Belong to the City',
    artist: 'PARTYNEXTDOOR',
    cover: '/audio/covers/BelongToTheCity.jpg',
  },
  'Havana.m4a': {
    title: 'Havana',
    artist: 'Camila Cabello',
    cover: '/audio/covers/Havana.jpg',
  },
  'TrueColors.m4a': {
    title: 'True Colors',
    artist: 'The Weeknd',
    cover: '/audio/covers/TrueColors.jpg',
  },
};

export const defaultTrackKey = 'Consume.mp3';
export const backgroundMusicSrc = `/audio/${defaultTrackKey}`;
