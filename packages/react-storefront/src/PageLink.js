/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { Component } from 'react'
import Link from './Link'
import PropTypes from 'prop-types'
import { isAlive } from 'mobx-state-tree'
import merge from 'lodash/merge'

/**
 * A link to a page that automatically set AppModelBase.loading{props.Page}
 * This component wraps react-storefront/Link and supports all of its props.
 */
export default class PageLink extends Component {
  static propTypes = {
    /**
     * An instance of a mobx-state-tree Model to link to
     */
    model: PropTypes.object.isRequired,

    /**
     * The page to display when clicked.
     */
    page: PropTypes.string.isRequired,

    /**
     * An object to apply to the state tree when the link is clicked.
     */
    state: PropTypes.object
  }

  render() {
    let { model, page, ...others } = this.props
    return <Link to={model.url} {...others} state={this.createState} />
  }

  createState = () => {
    let { page, model, state } = this.props

    if (isAlive(model)) {
      if (typeof model.createLinkState === 'function') {
        model = model.createLinkState()
      } else if (typeof model.toJSON === 'function') {
        model = model.toJSON()
      }

      if (typeof state === 'function') {
        state = state()
      }

      const result = merge(
        {
          page,
          // setting loading to true here speeds up page transitions because it eliminates the reconciliation cycle that
          // would otherwise follow when the router decides it needs to fetch data from the srver
          loading: true,
          [`loading${page}`]: {
            id: model.id + '-loading',
            ...model
          }
        },
        state
      )

      return result
    }
  }
}
