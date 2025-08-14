import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Cars, type CartData } from "../../Interface/DataModel";
import { getUserCart } from "../Api";
import { StoreContext } from "../context/StoreContext";
import Products from "../header/Products";
import Service from "../header/Service";
import Menubar from "../menu_bar/Menubar";

function Cart() {

	const navigate = useNavigate();
	const [cart, setCart] = useState<CartData>();
	const { totals, getTotal, menu, showProducts, showService, carsList, car,setCar } = useContext(StoreContext)
	const [parsedItems, setParsedItems] = useState<{ carId: string; quantity: number }[]>([]);

	const getCart = async () => {
		const response = await getUserCart();
		setCart(response);
		getCartDetails(response);
		console.log(response)
	}

	const getCartDetails = (response: CartData) => {
		const items = Object.entries(response.items).map(([key, quantity]) => {
			const { carId } = JSON.parse(key);
			return { carId, quantity };
		});

		setParsedItems(items);

		// Filter cars that are in the cart
		setCar(
			carsList.filter((car: Cars) =>
				items.some(item => item.carId === car.model)
			)
		);
	};

	useEffect(() => {
		getCart()
		const total = parsedItems.reduce((sum, ci) => {
			const carItem = carsList.find((c: Cars) => c.model === ci.carId);
			return carItem ? sum + carItem.price * ci.quantity : sum;
		}, 0);
		getTotal(total);
	}, []);


	return (
		<>
			<div className="relative">
				{menu && (
					<Menubar />
				)
				}
				{/* When we hover on Product is render "Products" component */}
				{
					showProducts && (<Products />)
				}
				{/* When we hover on Service is render "Service" component */}
				{
					showService && (<Service />)
				}
				<div key={cart?.id} className="bg-gray-100 h-screen py-8">
					<div className="container mx-auto px-4">
						<h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
						<div className="flex flex-col md:flex-row gap-4">
							<div className="md:w-3/4">
								<div className="bg-white rounded-lg shadow-md p-6 mb-4">
									<table className="w-full flex-col justify-evenly">
										<thead className="border-b-2 border-spacing-5">
											<tr className="flex-col justify-evenly">
												<th className="text-left font-semibold">Product</th>
												<th className="text-left font-semibold">Price</th>
												<th className="text-left font-semibold">Quantity</th>
												<th className="text-left font-semibold">Total</th>
											</tr>
										</thead>
										<tbody>
											{
												car.map((item:Cars) => {
													const matchedCartItem = parsedItems.find(ci => ci.carId === item.model);
													return (
														<tr key={item.carId} className="flex-col  justify-evenly">
															<td className="py-4 flex-col justify-center items-center">
																<img className="h-16 w-24 -ml-3" src={item?.carLogo} alt={item?.model} />
																<span className="font-semibold ml-1">{item?.model}</span>
															</td>
															<td className="py-4">&#8377;{item?.price}</td>
															<td className="py-4">{matchedCartItem?.quantity ?? 0}</td>
															<td className="py-4">{(matchedCartItem?.quantity ?? 0) * item.price}</td>
														</tr>);
												}
												)

											}

											{/* <!-- More product rows --> */}
										</tbody>
									</table>
								</div>
							</div>
							<div className="md:w-1/4">
								<div className="bg-white rounded-lg shadow-md p-6">
									<h2 className="text-lg font-semibold mb-4">Summary</h2>
									<div className="flex justify-between mb-2">
										<span>Subtotal</span>
										<span>{totals.subTotal}</span>
									</div>
									<div className="flex justify-between mb-2">
										<span>Taxes</span>
										<span>{totals.tax}</span>
									</div>
									<div className="flex justify-between mb-2">
										<span>Shipping</span>
										<span>{totals.shipping}</span>
									</div>
									<hr className="my-2" />
									<div className="flex justify-between mb-2">
										<span className="font-semibold">Total</span>
										<span className="font-semibold">{totals.total}</span>
									</div>
									<button onClick={() => navigate(`/checkout`)} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Cart;
