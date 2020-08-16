import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import './index.scss'
import sendGAEvent, { GA_ACTION } from '../../utils/ga'

export const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={data => {
      const { author, social, introduction } = data.site.siteMetadata

      return (
        <div className="bio">
          <div className="author">
            <div className="author-description">
              <Image
                className="author-image"
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  borderRadius: `100%`,
                }}
              />
              <div className="author-name">
                <span className="author-name-prefix">Written by</span>
                <Link to={'/about'} className="author-name-content" onClick={() => {
                  sendGAEvent('button', GA_ACTION.CLICK, 'resume')

                }}>
                  <span>@{author}</span>
                </Link>
                <div className="author-introduction">{introduction}</div>
                <p className="author-socials">
                  {social.github && (
                    <a href={`https://github.com/${social.github}`} onClick={() => {
                      sendGAEvent('button', GA_ACTION.CLICK, 'github')
                    }}>GitHub</a>
                  )}
                  {social.medium && (
                    <a href={`https://medium.com/${social.medium}`} onClick={() => {
                      sendGAEvent('button', GA_ACTION.CLICK, 'medium')
                    }}>Medium</a>
                  )}
                  {social.twitter && (
                    <a href={`https://twitter.com/${social.twitter}`} onClick={() => {
                      sendGAEvent('button', GA_ACTION.CLICK, 'Twitter')
                    }}>
                      Twitter
                    </a>
                  )}
                  {social.facebook && (
                    <a href={`https://www.facebook.com/${social.facebook}`} onClick={() => {
                      sendGAEvent('button', GA_ACTION.CLICK, 'facebook')
                    }}>
                      Facebook
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  />
)

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 72, height: 72) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
          github
          medium
          facebook
        }
      }
    }
  }
`

export default Bio
