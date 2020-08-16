import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const sendGAEvent = (category, action = '', label = '') => {
  trackCustomEvent({
    category,
    action,
    label,
  });
};

export default sendGAEvent;

export const GA_ACTION = {
  EXPOSE: '화면진입',
  CLICK: '클릭',
}

export const GAClickEvent = (category, action = '', label = '') => (e) => {
  sendGAEvent(category, action, label);
}
