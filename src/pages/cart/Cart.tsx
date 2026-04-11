import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteItemApi, getUserCart, IncreaseItemApi, removeCart } from "../../Api";
import { type CartData } from "../../Interface/DataModel";
import { StoreContext } from "../../store/StoreContext";
import { toast } from "react-toastify";
import { Minus, Plus, Trash2 } from "lucide-react";

function Cart() {

	const navigate = useNavigate();
	const [cart, setCart] = useState<CartData>({ items: {} });
	const [loading, setLoading] = useState(false);
	const { totals, getTotal, menu, showProducts, setMenu, load, setPageLoad, token } = useContext(StoreContext)
	const [deletePop, setDeletePop] = useState(false);
	const [tempCarId, setTempCarId] = useState("");
	let errorMsg;

	async function increaseCart(carId: any) {
		try {
			const response: any = await IncreaseItemApi(carId, token.current);
			if (response.items) {
				getCart();
			}
		} catch (error:any) {
			errorMsg =  String(error?.response?.message)
			toast.error(errorMsg);
		}
	}

	async function decreaseCart(carId: any) {
		try {
			const response: any = await removeCart(carId, token.current);
			if (response.items) {
				getCart();
			}
		} catch (error:any) {
			errorMsg =  String(error?.response?.message)
			toast.error(errorMsg);
		}
	}

	async function deleteItem(carId: any) {
		try {
		setDeletePop(true);
		setTempCarId(carId);
		return;
		} catch (error:any) {
			errorMsg =  String(error?.response?.message)
			toast.error(errorMsg);
		}
	}

	async function deleteItemConfirm() {
		try {
		setDeletePop(false)
		const respone: any = await deleteItemApi(tempCarId, token.current);
		if (respone == 200) {
			toast.warning('Product remove from the cart')
			getCart();
		}
		return;
		} catch (error:any) {
			errorMsg =  String(error?.response?.message)
			toast.error(errorMsg);
		}
	}

	const getCart = async () => {
		try {
			const response = await getUserCart(token.current);
			await getTotal(response.items);
			setPageLoad(false);
			setCart(response.items);
			if (Object.keys(response.items).length > 0) {
				setLoading(true);
			} else {
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			navigate('not-found');
		}
	}
	useEffect(() => {
		setPageLoad(true)
		setMenu(false)
		getCart();
	}, []);


	return (
		<>
			{deletePop && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
					<div className="bg-white dark:text-black w-[24rem] h-[8rem] px-10 py-5 rounded-2xl border shadow-lg">
						<p className="text-xl">Are you sure you want to delete?</p>
						<div className="mt-4 flex justify-end gap-4">
							<button
								className="bg-gray-400 hover:bg-gray-500 text-white rounded-md px-4 py-1"
								onClick={() => {
									setDeletePop(false);
								}}
							>
								Close
							</button>
							<button
								className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-1"
								onClick={() => {
									deleteItemConfirm();
									setDeletePop(false);
								}}
							>
								Sure
							</button>
						</div>
					</div>
				</div>
			)}
			{
				cart &&
				<div className={`relative`}>
					<div className={`${showProducts | load | menu && 'blur-sm'} md:max-h-[950px] md:py-8 my-5 min-h-[400px] `}>
						<div className="container mx-auto px-4">
							<h1 className={`text-2xl font-semibold mb-4 
							${loading ? 'text-left' : 'text-center text-3xl'}`}>Shopping Cart</h1>
							{
								loading ?

									<div className="flex flex-col md:flex-row gap-4 ">
										<div className="md:w-3/4">
											<div className="bg-white/10 rounded-lg shadow-2xl p-6 mb-4 overflow-y-auto max-h-[500px]">
												<table className="w-full flex-col justify-evenly dark:text-white/80 overflow-scroll">
													<thead className="border-b-2 border-y-black/50 dark:border-y-white/60">
														<tr className="flex-col md:justify-evenly  ">
															<th className="text-left font-semibold px-2 ">Product</th>
															<th className="text-left font-semibold px-2">Price</th>
															<th className="text-left font-semibold px-2">Quantity</th>
															<th className="text-left font-semibold px-2">Total</th>

														</tr>
													</thead>
													<tbody>
														{
															Object.entries(cart).map(([id, item]) => (
																<tr key={id} className={`flex-col items-center  justify-evenly`}>
																	<td className="py-4 flex-col justify-center items-center ">
																		<img className="h-16 w-24 -ml-3" src={item.imageUrl} alt={item?.model} />
																		<span className="font-semibold ml-1">{item?.model}</span>
																	</td>
																	<td className="py-4"><span className="text-black/80 text-sm font-bold">$</span>{item?.price}</td>

																	<td className="flex flex-col md:flex-row md:translate-y-11 translate-y-6 md:w-1/2 items-center">

																		{/* Increase Quantity */}
																		{item.quantity > 0 && (
																			<button
																				className="border hover:bg-black/20 rounded-md mx-2 dark:border-white/60 my-2 md:my-0"
																				onClick={() => increaseCart(id)}
																			>
																				<Plus className="hover:text-blue-600" />
																			</button>
																		)}

																		{/* Decrease Quantity */}
																		<span className="px-2">{item.quantity}</span>

																		{item.quantity > 1 && (
																			<button
																				className="border hover:bg-black/20 rounded-md mx-2 dark:border-white/60"
																				onClick={() => decreaseCart(id)}
																			>
																				<Minus className="hover:text-blue-600" />
																			</button>
																		)}
																	</td>


																	{/* Price */}
																	<td className="md:py-4">
																		<span className="text-black/80 text-sm font-bold">$</span>{item.price * item.quantity}</td>

																	{/* Delete button */}
																	<td>
																		<button
																			className="hover:bg-black/20 rounded-md md:p-0.5 -ml-1"
																			onClick={() => deleteItem(id)}
																		>
																			<Trash2 className="hover:text-red-600" />
																		</button>
																	</td>
																</tr>
															))
														}


													</tbody>
												</table>
											</div>
										</div>
										<div className="md:w-1/4">
											<div className="bg-white/10 rounded-lg shadow-2xl p-6 dark:text-white/80">
												<h2 className="text-lg font-semibold mb-4 border-b-2 border-y-black/50 dark:border-y-white/50">Summary</h2>
												<div className="flex justify-between mb-2 ">
													<span>Subtotal</span>
													<span><span className="text-black/80 text-sm font-bold">$</span>{totals.subTotal}</span>
												</div>
												<div className="flex justify-between mb-2">
													<span>Taxes</span>
													<span><span className="text-black/80 text-sm font-bold">$</span>{totals.tax}</span>
												</div>
												<div className="flex justify-between mb-2">
													<span>Shipping</span>
													<span><span className="text-black/80 text-sm font-bold">$</span>{totals.shipping}</span>
												</div>
												<hr className="my-2" />
												<div className="flex justify-between mb-2">
													<span className="font-semibold">Total</span>
													<span className="font-semibold"><span className="text-black/80 text-sm font-bold">$</span>{totals.total}</span>
												</div>
												<button onClick={() => navigate(`/checkout`)} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
											</div>
										</div>
									</div>
									:
									<div className="flex flex-col justify-center items-center">
										<h1 className=" text-2xl font-semibold text-red-500">Cart empty</h1>
										<Link className="underline text-blue-500" to={'/explore'}>Explore</Link>
									</div>
							}

						</div>
					</div>
				</div>
			}
		</>
	)
}
export default Cart;
