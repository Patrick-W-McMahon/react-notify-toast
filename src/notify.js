import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import styles from './toast_style';

let notificationWrapperId = 'notification-wrapper';
let defaultTimeout = 5000; // ms
let animationDuration = 300; // ms

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

class Toast {
	constructor(text, type duration = 5000, timeout = 300 ) { // duration & timeout in ms
		this.id = `${new Date(milliseconds)*Math.random()}${Math.random()}`;
		this.text = text;
		this.type = type;
		this.duration = duration;
		this.isShowing = false;
		
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.getTransition = this.getTransition.bind(this);
	}
	
	show() {
		setTimeout(function() {
			this.isShowing = true;
		}, 100); // wait 100ms after the component is called to animate toast.
		
	}
	
	hide() {
		setTimeout(function() {
			this.isShowing = false;
		}, this.props.timeout);
	}
	
	getTransition() {
		return {
			transition: 'all ' + this.duration + 'ms ease',
			msTransition: 'all ' + this.duration + 'ms ease',
			WebkitTransition: 'all ' + this.duration + 'ms ease',
			OTransition: 'all ' + this.duration + 'ms ease',
			MozTransition: 'all ' + this.duration + 'ms ease'
		};
	}
}

/* React Notification Component */
class ToastContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toastsQueue: [], //toast array queue
			showMsg: false //true when a toast is being displayed
		};
	}
	
	componentDidMount() {
		this.getVisibleState(this);
	}
	
	addToast(toast) {
		this.setState({
			toastsQueue: [...this.state.toastsQueue, toast],
			showMsg: true
		});
	}

	render() {
		let {text, type, timeout } = this.props;
		let timeoutAnimation = getTransition(timeout);
		let { displayed, gravityClasses }  this.state;
		return (
			<div className={`toast-notification type-${type} ${gravityClasses}`} style={timeoutAnimation}>
				<span className={type}>{text}</span>
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

function makeText(text, type duration) {
	toast = new Toast(text, type, duration, undefined);
	toasts.push(toast);
	return toast.id;
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
export let Toast = {
	makeText,
	show
};
