import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { connect } from 'react-redux';

import { playCard, takeHit, closeModal } from '../actions/userAction';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: [],
			submitNotValid: true,
		};
		this.onCheckClick = this.onCheckClick.bind(this);
		this.onPlayCard = this.onPlayCard.bind(this);
		this.onTakeHit = this.onTakeHit.bind(this);
		this.modalButton = this.modalButton.bind(this);
		this.renderHand = this.renderHand.bind(this);
	}
	onCheckClick() {
		this.setState({ userInput: [], submitNotValid: true });
		console.log('Click Check', this.state.userInput);
		// this.props.submitGuess(this.state.userInput);
	}
	onPlayCard(evt) {
		//eslint-disable-next-line
		this.props.onPlayCard('player1', evt.target.name);
	}
	onTakeHit(evt) {
		//eslint-disable-next-line
		this.props.onTakeHit('player1', evt);
	}
	modalButton(evt) {
		//eslint-disable-next-line
		this.props.modalButton(evt);
	}
	renderTable(card, i) {
		return (
			<React.Fragment>
				<p>{card}</p>
			</React.Fragment>
		);
	}
	renderHand(card, i) {
		return (
			<React.Fragment>
				<button type="button" name={i} onClick={this.onPlayCard} disabled={this.props.modalShown}>
					{card}
				</button>
			</React.Fragment>
		);
	}

	render() {
		let modalStyle;
		if (this.props.modalShown) {
			modalStyle = { display: 'block' };
		} else {
			modalStyle = { display: 'none' };
		}
		return (
			<div>
				<h1>TEST ICOSAGON</h1>
				<p>WINS: {this.props.wins}</p>
				<p>LOSSES: {this.props.losses}</p>
				<hr />
				<p>TOTAL: {this.props.total}</p>
				{this.props.table.map(this.renderTable)}
				<button onClick={this.onTakeHit} disabled={this.props.modalShown}>Hit</button>
				{this.props.hand.map(this.renderHand)}
				<dialog style={modalStyle} id="modal">
					<p>{this.props.modalText}</p>
					<button onClick={this.modalButton}>New Round</button>
				</dialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	table: state.player1.table,
	hand: state.player1.hand,
	total: state.player1.total,
	wins: state.player1.wins,
	losses: state.player1.losses,
	modalShown: state.modal.shown,
	modalText: state.modal.text,
});

const mapActionsToProps = {
	onPlayCard: playCard,
	onTakeHit: takeHit,
	modalButton: closeModal,
};

App.propTypes = {
	table: PropTypes.arrayOf(PropTypes.number),
	hand: PropTypes.arrayOf(PropTypes.number),
	total: PropTypes.number,
	wins: PropTypes.number,
	losses: PropTypes.number,
	modalShown: PropTypes.bool,
	modalText: PropTypes.string,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
