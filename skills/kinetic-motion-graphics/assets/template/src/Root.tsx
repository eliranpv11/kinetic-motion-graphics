import React from 'react';
import {Composition} from 'remotion';
import {FPS, H, W} from './kit/theme';
import {Video, DURATION_SECONDS} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition id="Main" component={Video} durationInFrames={Math.ceil(DURATION_SECONDS * FPS)} fps={FPS} width={W} height={H} />
);
