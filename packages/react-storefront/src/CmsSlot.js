/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component, createRef } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { lazyLoadImages } from './utils/lazyLoadImages'

export const styles = theme => ({
  inline: {
    display: 'inline'
  },
  block: {
    display: 'block'
  },
  root: {
    '& .rsf-presized-img': {
      position: 'relative',

      '& img': {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0
      }
    },
    '& img[data-rsf-lazy]': {
      visibility: 'hidden'
    }
  }
})

/**
 * A container for HTML blob content from a CMS.  Content is dangerously inserted into the DOM.
 * Pass the html as a string as the child of this component. Additional props are spread to the
 * rendered span element.
 */
@withStyles(styles, { name: 'RSFCmsSlot' })
export default class CmsSlot extends Component {
  static proptypes = {
    /**
     * Use inline prop to use display:inline style
     */
    inline: PropTypes.boolean,

    /**
     * Set to true to lazy load images that have been preprocessed with `$.lazyLoadImages()`.
     */
    lazyLoadImages: PropTypes.boolean
  }

  static defaultProps = {
    lazyLoadImages: false
  }

  constructor({ lazyLoadImages }) {
    super()

    if (lazyLoadImages) {
      this.el = createRef()
    }
  }

  componentDidMount() {
    if (this.props.lazyLoadImages) {
      lazyLoadImages(this.el.current)
    }
  }

  componentDidUpdate() {
    if (this.props.lazyLoadImages) {
      lazyLoadImages(this.el.current)
    }
  }

  render() {
    const { children, className, classes, inline, lazyLoadImages, ...others } = this.props

    return children ? (
      <span
        {...others}
        ref={this.el}
        className={classnames(className, classes.root, {
          [classes.inline]: inline,
          [classes.block]: !inline
        })}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    ) : null
  }
}
