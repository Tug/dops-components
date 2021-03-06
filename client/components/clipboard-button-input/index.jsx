/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import ClipboardButton from 'components/form/clipboard-button';
import TextInput from 'components/text-input';

require( './style.scss' );

export default React.createClass( {
	displayName: 'ClipboardButtonInput',

	propTypes: {
		value: PropTypes.string,
		disabled: PropTypes.bool,
		className: PropTypes.string,
		copied: PropTypes.string,
		copy: PropTypes.string,
		prompt: PropTypes.string
	},

	getInitialState() {
		return {
			isCopied: false,
			disabled: false
		};
	},

	getDefaultProps() {
		return {
			value: ''
		};
	},

	componentWillUnmount() {
		clearTimeout( this.confirmationTimeout );
		delete this.confirmationTimeout;
	},

	showConfirmation() {
		this.setState( {
			isCopied: true
		} );

		this.confirmationTimeout = setTimeout( () => {
			this.setState( {
				isCopied: false
			} );
		}, 4000 );
	},

	render() {
		return (
			<span className={ classnames( 'dops-clipboard-button-input', this.props.className ) }>
				<TextInput
					{ ...omit( this.props, 'className' ) }
					type="text"
					selectOnFocus
					readOnly />
				<ClipboardButton
					text={ this.props.value }
					onCopy={ this.showConfirmation }
					disabled={ this.props.disabled }
					prompt={ this.props.prompt }
					compact>
					{ this.state.isCopied
						? this.props.copied
						: this.props.copy }
				</ClipboardButton>
			</span>
		);
	}
} );