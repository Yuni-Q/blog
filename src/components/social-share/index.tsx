import React, { useEffect } from 'react';
import { FacebookIcon } from './facebook-icon';
import { TwitterIcon } from './twitter-icon';
import { shareToTwitter, shareToFacebook } from '../../utils/share';

import './index.scss';

export const SocialShare = ({ title, author }) => {
  useEffect(() => {
    setTimeout(() => {
      const addthisScript = document.createElement('script');
      addthisScript.setAttribute(
        'src',
        'http:////s7.addthis.com/js/300/addthis_widget.js#pubid=ra-60bcf43de82361a8',
      );
      if (document.body) document.body.appendChild(addthisScript);
    });
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
      <script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-60bcf43de82361a8"
      ></script>
      {/* <FacebookIcon onClick={onClickFacebookIcon} />
      <TwitterIcon onClick={onClickTwitterIcon} /> */}
    </div>
  );
};
