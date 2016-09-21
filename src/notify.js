import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

let notificationWrapperId = 'notification-wrapper';
let defaultTimeout = 5000; // ms
let animationDuration = 300; // ms

/* Colors */
const BG_COLOR = {
	error:'#E85742',
	success:'#55CA92',
	warning:'#F5E273'
};
const FONT_COLOR = {
	error:'white',
	success:'white',
	warning:'#333333'
};
const colorWhite = 'white';
const colorError = '#E85742';
const colorSuccess = '#55CA92';
const colorWarning = '#F5E273';
const textColorWarning = '#333333';

/* toast message types */
const TOAST_TYPE = {
	error:'error',
	success:'success',
	warning:'warning',
	info:'info'
};

/* gravity types */
const GRAVITY_TOP = "";
const GRAVITY_BOTTOM = "";
const GRAVITY_LEFT = "";
const GRAVITY_RIGHT = "";
const GRAVITY_CENTER_X = "";
const GRAVITY_CENTER_Y = "";

/* React Notification Component */
class Toast extends React.Component {
	static propTypes = {
		text: PropTypes.string,
		timeout: PropTypes.number,
		type: PropTypes.string,
		style: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool
		])
	};

	state = {
		styleParent: null
	};

	getStyles() {
		let styles = {};

		const containerStyle = {
			position: 'fixed',
			width: '50%',
			margin: '0 auto',
			right: '0px',
			top: '-100px',
			left: '0px',
			textAlign: 'center',
			zIndex: '999',
			pointerEvents: 'none',
			transition: 'all ' + animationDuration + 'ms ease',
			transform: 'translateY(0px)',
			// Vendor Prefixes
			msTransition: 'all ' + animationDuration + 'ms ease',
			msTransform: 'translateY(0px)',
			WebkitTransition: 'all ' + animationDuration + 'ms ease',
			WebkitTransform: 'translateY(0px)',
			OTransition: 'all ' + animationDuration + 'ms ease',
			OTransform: 'translateY(0px)',
			MozTransition: 'all ' + animationDuration + 'ms ease',
			MozTransform: 'translateY(0px)'
		};

		const contentStyle = {
			cursor: 'pointer',
			display: 'inline',
			width: 'auto',
			borderRadius: '0 0 4px 4px',
			backgroundColor: 'white',
			padding: '10px 30px',
			pointerEvents: 'all'
		};

		/* If type is set, merge toast action styles with base */
		switch (this.props.type) {
			case TOAST_TYPE.success:
				const successStyle = {
					backgroundColor: colorSuccess,
					color: colorWhite
				};
				styles.content = assign({}, contentStyle, successStyle);
				break;

			case TOAST_TYPE.error:
				const errorStyle = {
					backgroundColor: colorError,
					color: colorWhite
				};
				styles.content = assign({}, contentStyle, errorStyle);
				break;

			case TOAST_TYPE.warning:
				const warningStyle = {
					backgroundColor: colorWarning,
					color: textColorWarning
				};
				styles.content = assign({}, contentStyle, warningStyle);
				break;
			case TOAST_TYPE.info:
			default:
				styles.content = assign({}, contentStyle);
				break;
		}
		styles.container = containerStyle;
		return styles;
	}

	getVisibleState(context) {
		let base = this.getStyles().container;

		// Show
		const stylesShow = {
			transform: 'translateY(108px)',
			msTransform: 'translateY(108px)',
			WebkitTransform: 'translateY(108px)',
			OTransform: 'translateY(108px)',
			MozTransform: 'translateY(108px)'
		};

		setTimeout(function() {
			context.updateStyle(base, stylesShow);
		}, 100); // wait 100ms after the component is called to animate toast.

		if (this.props.timeout === -1) {
			return;
		}

		// Hide after timeout
		const stylesHide = {
			transform: 'translateY(-108px)',
			msTransform: 'translateY(-108px)',
			WebkitTransform: 'translateY(-108px)',
			OTransform: 'translateY(-108px)',
			MozTransform: 'translateY(-108px)'
		};

		setTimeout(function() {
			context.updateStyle(base, stylesHide);
		}, this.props.timeout);
	}

	updateStyle(base, update) {
		this.setState({styleParent: assign({}, base, update)});
	}

	getBaseStyle() {
		this.setState({styleParent: this.getStyles().container});
	}

	componentDidMount() {
		this.getBaseStyle();
		this.getVisibleState(this);
	}

	render() {
		let {text, type} = this.props;
		let styles = this.getStyles();
		let {styleParent} = this.state;
		return (
			<div className="toast-notification" style={styleParent}>
				<span className={type} style={styles.content}>{text}</span>
			</div>
		);
	}
}

/* Private Functions */

/* Render React component */
function renderToast(text, type, timeout) {
	ReactDOM.render(
		<Toast text={text} timeout={timeout} type={type}/>,
		document.getElementById(notificationWrapperId)
	);
}

/* Unmount React component */
function hideToast() {
	ReactDOM.unmountComponentAtNode(document.getElementById(notificationWrapperId));
}

/* Public functions */

/* set gravity of Toast Message */
function setGravity({...gravity},x = 0,y = 0) {
	
}

/* Show Animated Toast Message */
function show(text, type, timeout) {
	if (!document.getElementById(notificationWrapperId).hasChildNodes()) {
		let renderTimeout = timeout;

		// Use default timeout if not set.
		if (!renderTimeout) {
			renderTimeout = defaultTimeout;
		}

		// Render Component with Props.
		renderToast(text, type, renderTimeout);

		if (timeout === -1) {
			return;
		}

		// Unmount react component after the animation finished.
		setTimeout(function() {
			hideToast();
		}, renderTimeout + animationDuration);
	}
}


/* Export notification container */
export default class extends React.Component {
	render() {
		return (
			<div id={notificationWrapperId}></div>
		);
	}
}

/* Export notification functions */
export let notify = {
	show
};
