import React from 'react';
import TweenOne from 'rc-tween-one';
import Icon from '@ant-design/icons';

const start = '#61DAFB'; //REACT
const colors = [
  // '#F74657', //ANTD
  // '#112B49', //APOLLO
  // '#E05D17', //MOBX
  // '#E0234E', //NEST
  // '#151515', //NEXT
  '#E10098', //GRAPHQL
  // '#0C354B', //PRISMA
  start,
];

const ColorChangeLogo = ({
  componentStyle,
  ...props
}) =>
  <TweenOne
    animation={
      [
        { type: `set`, color: start },
        ...colors.map(color => ({ color, ease: `linear`, duration: 2000 })),
      ]
    }
    repeat={-1}
    componentProps={{ style: componentStyle }}
  >
    <Logo {...props} />
  </TweenOne>
  ;
const SVG = () =>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    p-id="993"
    width="1em"
    height="1em"
    style={{ transform: 'scaleY(-1)' }}
    fill="currentColor"
    viewBox="0 0 1024 1024"
  >
    <path d="M160 750 l0 -50 -51 0 -50 0 3 -52 c4 -63 22 -70 26 -10 l3 42 284 0
c156 0 290 -3 299 -6 11 -4 16 -19 16 -45 0 -21 5 -39 10 -39 6 0 10 25 10 55
l0 55 -262 2 -263 3 0 30 0 30 297 3 297 2 3 -87 c4 -122 23 -110 23 15 l0 97
-322 3 -323 2 0 -50z"/>
    <path d="M198 508 c5 -48 4 -51 -17 -45 -17 4 -21 1 -21 -18 0 -18 4 -22 20
-18 19 5 20 0 20 -91 0 -54 4 -106 10 -116 11 -20 50 -33 74 -24 24 9 19 24
-9 24 -35 0 -45 27 -45 125 l0 87 40 -4 c35 -3 40 -1 40 17 0 18 -5 20 -41 17
l-42 -4 5 51 c5 47 4 51 -17 51 -21 0 -22 -4 -17 -52z"/>
    <path d="M350 452 c0 -15 23 -130 45 -229 6 -28 41 -31 49 -5 3 9 10 49 17 87
17 103 24 105 38 13 17 -113 19 -120 44 -116 18 3 24 17 44 113 26 131 28 155
9 155 -10 0 -19 -29 -32 -100 -9 -55 -20 -98 -23 -95 -2 3 -12 47 -21 98 -14
80 -19 92 -37 95 -18 3 -23 -3 -28 -30 -24 -133 -33 -171 -38 -158 -5 12 -37
174 -37 186 0 2 -7 4 -15 4 -8 0 -15 -8 -15 -18z"/>
    <path d="M62 108 l3 -53 323 -3 322 -2 0 25 c0 23 3 25 50 25 49 0 50 1 50 30
0 32 -14 40 -24 15 -8 -21 -76 -21 -76 0 0 8 -4 15 -10 15 -5 0 -10 -18 -10
-40 l0 -40 -300 0 -300 0 0 40 c0 29 -4 40 -16 40 -12 0 -14 -10 -12 -52z"/>
  </svg>;
const Logo = props => <Icon component={SVG} {...props} />;
export { Logo as default, ColorChangeLogo };
