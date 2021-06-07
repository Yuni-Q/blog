import React, { useEffect } from 'react';
import { FacebookIcon } from './facebook-icon';
import { TwitterIcon } from './twitter-icon';
import { shareToTwitter, shareToFacebook } from '../../utils/share';

import './index.scss';

export const SocialShare = ({ title, author }) => {
  useEffect(() => {
    if (!(window as any).addthis) {
      const addthisScript = document.createElement('script');
      addthisScript.setAttribute(
        'src',
        'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-60bcf43de82361a8',
      );
      if (document.body) document.body.appendChild(addthisScript);
    } else {
      (window as any).addthis.layers.refresh();
    }
  }, []);
  const text = `Recommend on "${title}" written by @${author}`;

  const onClickTwitterIcon = (e) => {
    e.preventDefault();

    return shareToTwitter(window.location.href, text);
  };

  const onClickFacebookIcon = (e) => {
    e.preventDefault();
    return shareToFacebook(window.location.href, text);
  };

  return (
    <div className="social-share" style={{ marginTop: 32 }}>
      <div className="addthis_inline_share_toolbox_7fpx"></div>
      {/* <!-- Go to www.addthis.com/dashboard to customize your tools --> */}
      {/* <FacebookIcon onClick={onClickFacebookIcon} />
      <TwitterIcon onClick={onClickTwitterIcon} /> */}
    </div>
  );
};
