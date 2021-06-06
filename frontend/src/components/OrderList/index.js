import {Button, Card, Col, Row} from 'react-bootstrap';
import React from 'react';

const OrderList = () => {
	return (<Row>
		<Col lg={12} md={12} className="m-4">
			<Card style={{width: '18rem'}}>
				<Card.Img variant="top" src="holder.js/100px180"/>
				<Card.Body>
					<Card.Title>Card Title</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the bulk of
						the card's content.
					</Card.Text>
					<Button variant="primary">Go somewhere</Button>
				</Card.Body>
			</Card>
		</Col>
		<Col lg={12} md={12} className="m-4">
			<Card style={{width: '18rem'}}>
				<Card.Img variant="top" src="holder.js/100px180"/>
				<Card.Body>
					<Card.Title>Card Title</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the bulk of
						the card's content.
					</Card.Text>
					<Button variant="primary">Go somewhere</Button>
				</Card.Body>
			</Card>
		</Col>
		<Col lg={12} md={12} className="m-4">
			<Card style={{width: '18rem'}}>
				<Card.Img variant="top" src="holder.js/100px180"/>
				<Card.Body>
					<Card.Title>Card Title</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the bulk of
						the card's content.
					</Card.Text>
					<Button variant="primary">Go somewhere</Button>
				</Card.Body>
			</Card>
		</Col>
	</Row>);
};

export default OrderList;
