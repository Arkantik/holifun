import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import "./Contact.css";

import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
	const form = useRef(null);

	const notify = (message) => {
		toast[message]("Success, your message was sent!", {
			position: "bottom-right",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: "dark",
		});
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const name = e.target.name.value.trim();
		const email = e.target.user_email.value.trim();
		const message = e.target.message.value.trim();

		if (!name || !email || !message) {
			toast.error("Please fill in all required fields", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				theme: "dark",
			});
			return;
		}

		emailjs
			.sendForm(
				"service_lwojhle",
				"template_1kgkty5",
				e.target,
				"AsJ3rbV5H9oTVu7ox"
			)
			.then(
				(result) => {
					console.info(result.text);
					notify("success");
					form.current.reset();
				},
				(error) => {
					console.error(error.text);
					notify("error", "Oops, something went wrong!");
				}
			);
	};

	return (
		<section className="flex h-full flex-col items-center justify-center bg-[url('../assets/images/background-1.png')] bg-cover bg-no-repeat px-4">
			<h1>Contact us</h1>
			<form ref={form} onSubmit={sendEmail}>
				<div>
					<input
						className="w-full items-start rounded px-5 py-1.5 outline-none"
						type="text"
						placeholder="username"
						id="text"
						name="name"
					/>
				</div>
				<div className="">
					<input
						className="w-full items-start rounded px-5 py-1.5 outline-none"
						type="email"
						placeholder="email@example.com"
						id="email"
						name="user_email"
					/>
				</div>
				<div>
					<textarea
						className="textarea w-full items-start rounded px-5 py-1.5 outline-none"
						placeholder="Type your text here"
						name="message"
					/>
				</div>
				<input className="submit" type="submit" value="Send" onClick={notify} />
			</form>
			<ToastContainer />
		</section>
	);
}
