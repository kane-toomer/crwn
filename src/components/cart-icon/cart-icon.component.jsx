import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import "./cart-icon.styles.scss";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen } = useContext(CartContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<div className="cart-icon-container" onClick={toggleIsCartOpen}>
			<FontAwesomeIcon
				icon={faBagShopping}
				className="fa-lg"
				style={{ paddingLeft: 10, marginRight: 5 }}
			/>
			<span className="item-count">(10)</span>
		</div>
	);
};

export default CartIcon;
