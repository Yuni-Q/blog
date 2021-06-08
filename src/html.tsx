import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  htmlAttributes: object;
  headComponents: Array<any>;
  bodyAttributes: object;
  preBodyComponents: Array<any>;
  body: string;
  postBodyComponents: Array<any>;
}

export default class HTML extends React.Component<Props> {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=2"
          />
          {this.props.headComponents}
          <script
            id="ads"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <script>
            (adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;
          </script>
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
